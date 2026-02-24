# Google One Tap Integration Guide (With Exact Code)

Is document me One Tap ke liye likha gaya actual code tarteeb se diya hai: backend + frontend, aur har block ke neeche simple explanation bhi hai.

## 1. Install / Packages

Naya npm package install nahi hua.

- Backend existing stack use hua
- Frontend existing stack use hui
- Google script runtime pe load hoti hai: `https://accounts.google.com/gsi/client`

## 2. Backend Code

### 2.1 `backend/src/controllers/auth.controller.js` - import add

```js
import { ENV } from "../config/env.js";
```

Ye line environment variables (especially `GOOGLE_CLIENT_ID`) read karne ke liye add ki gayi.

### 2.2 `backend/src/controllers/auth.controller.js` - `googleClientIdController`

```js
const googleClientIdController = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            clientId: ENV.GOOGLE_CLIENT_ID
        });
    } catch (err) {
        next(err);
    }
}
```

Ye frontend ko client id deta hai taake One Tap initialize ho sake.

### 2.3 `backend/src/controllers/auth.controller.js` - `googleOneTapLoginController`

```js
const googleOneTapLoginController = async (req, res, next) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required"
            });
        }

        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        const payload = await response.json();

        if (!response.ok || payload.error_description || payload.aud !== ENV.GOOGLE_CLIENT_ID) {
            return res.status(401).json({
                success: false,
                message: "Invalid Google credential"
            });
        }

        if (!payload.email || payload.email_verified !== "true") {
            return res.status(401).json({
                success: false,
                message: "Google account email is not verified"
            });
        }

        let user = await User.findOne({
            provider: "google",
            providerId: payload.sub
        });

        if (!user) {
            user = await User.findOne({ email: payload.email.toLowerCase() });

            if (!user) {
                user = await User.create({
                    name: payload.name || payload.email.split("@")[0],
                    email: payload.email.toLowerCase(),
                    provider: "google",
                    providerId: payload.sub,
                    avatar: payload.picture || null,
                    password: null,
                    role: "user"
                });

                await sendEmail({
                    name: user.name,
                    email: user.email,
                    subject: "Welcome to NANYA CNC",
                });
            } else {
                user.provider = "google";
                user.providerId = payload.sub;

                if (!user.avatar && payload.picture) {
                    user.avatar = payload.picture;
                }

                await user.save();

                await sendEmail({
                    name: user.name,
                    email: user.email,
                    subject: "Welcome back to NANYA CNC",
                });
            }
        }

        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Google login successful",
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
}
```

Ye core One Tap backend flow hai:
- token verify karta hai
- user create/link/login karta hai
- access token return karta hai
- refresh cookie set karta hai

### 2.4 `backend/src/controllers/auth.controller.js` - export update

```js
export {
    checkAuthController,
    registerController,
    loginController,
    logoutController,
    adminLoginController,
    adminChangePasswordController,
    googleClientIdController,
    googleOneTapLoginController
};
```

Naye 2 controllers export kiye gaye taake routes me use ho saken.

### 2.5 `backend/src/routes/auth.routes.js` - import + routes add

```js
import {
    adminLoginController,
    checkAuthController,
    loginController,
    logoutController,
    registerController,
    adminChangePasswordController,
    googleClientIdController,
    googleOneTapLoginController
} from "../controllers/auth.controller.js";
```

```js
authRoutes.get("/google/client-id", googleClientIdController);
authRoutes.post("/google/one-tap", googleOneTapLoginController);
```

Yahan One Tap ke 2 endpoints wire kiye gaye.

## 3. Frontend Code

### 3.1 `frontend/src/store/authStore.ts` - interface methods add

```ts
interface AuthState {
    user: User | null;
    isCheckingAuth: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;

    checkAuth: () => Promise<void>;
    setUser: (user: User) => void;
    loginWithGoogle: () => void;
    getGoogleClientId: () => Promise<string | null>;
    loginWithGoogleOneTap: (credential: string) => Promise<boolean>;
    register: (userData: User) => Promise<boolean>;
    login: (userData: User) => Promise<boolean>;
    adminLogin: (data: AdminState) => Promise<boolean>;
    logout: () => Promise<void>;
    changeAdminPassword: (data: { oldPassword: string; newPassword: string }) => Promise<boolean>;
}
```

Naye methods state contract me add huye.

### 3.2 `frontend/src/store/authStore.ts` - `getGoogleClientId`

```ts
getGoogleClientId: async (): Promise<string | null> => {
    try {
        const response = await api.get("/auth/google/client-id");
        const { success, clientId } = response.data;

        if (success && clientId) {
            return clientId;
        }

        return null;
    } catch {
        return null;
    }
},
```

Frontend pe client id fetch karne ka helper.

### 3.3 `frontend/src/store/authStore.ts` - `loginWithGoogleOneTap`

```ts
loginWithGoogleOneTap: async (credential: string): Promise<boolean> => {
    try {
        const response = await api.post("/auth/google/one-tap", { credential });
        const { success, accessToken, user } = response.data;

        if (!success || !accessToken || !user) {
            return false;
        }

        localStorage.setItem("accessToken", accessToken);
        set({ user, isAuthenticated: true });
        return true;
    } catch {
        return false;
    }
},
```

Ye One Tap credential backend ko bhej kar local login state set karta hai.

### 3.4 `frontend/src/components/auth/GoogleOneTap.tsx` (new file)

```tsx
"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const ONE_TAP_SCRIPT_ID = "google-one-tap-script";
const ONE_TAP_DISMISSED_KEY = "google_one_tap_dismissed";

type CredentialResponse = {
    credential?: string;
};

type PromptMomentNotification = {
    isDismissedMoment?: () => boolean;
    isSkippedMoment?: () => boolean;
};

type GoogleAccounts = {
    id: {
        initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            itp_support?: boolean;
        }) => void;
        prompt: (callback?: (notification: PromptMomentNotification) => void) => void;
        cancel: () => void;
    };
};

declare global {
    interface Window {
        google?: {
            accounts: GoogleAccounts;
        };
    }
}

const GoogleOneTap = () => {
    const initializedRef = useRef(false);
    const {
        isAuthenticated,
        isCheckingAuth,
        getGoogleClientId,
        loginWithGoogleOneTap
    } = useAuthStore();

    useEffect(() => {
        let isMounted = true;

        if (isCheckingAuth) {
            return;
        }

        if (isAuthenticated) {
            window.google?.accounts.id.cancel();
            return;
        }

        if (sessionStorage.getItem(ONE_TAP_DISMISSED_KEY) === "1") {
            return;
        }

        const promptOneTap = async () => {
            if (initializedRef.current) {
                return;
            }

            const clientId = await getGoogleClientId();
            if (!clientId || !isMounted) {
                return;
            }

            const handleCredential = async (response: CredentialResponse) => {
                if (!response.credential) {
                    return;
                }

                const success = await loginWithGoogleOneTap(response.credential);
                if (success) {
                    toast.success("Login successful");
                    window.google?.accounts.id.cancel();
                }
            };

            const init = () => {
                if (!window.google?.accounts?.id) {
                    return;
                }

                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleCredential,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    itp_support: true
                });

                window.google.accounts.id.prompt((notification: PromptMomentNotification) => {
                    const dismissed = notification.isDismissedMoment?.() ?? false;
                    const skipped = notification.isSkippedMoment?.() ?? false;

                    if (dismissed || skipped) {
                        sessionStorage.setItem(ONE_TAP_DISMISSED_KEY, "1");
                    }
                });

                initializedRef.current = true;
            };

            const existingScript = document.getElementById(ONE_TAP_SCRIPT_ID) as HTMLScriptElement | null;
            if (existingScript) {
                if (window.google?.accounts?.id) {
                    init();
                } else {
                    existingScript.addEventListener("load", init, { once: true });
                }
                return;
            }

            const script = document.createElement("script");
            script.id = ONE_TAP_SCRIPT_ID;
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.addEventListener("load", init, { once: true });
            document.head.appendChild(script);
        };

        void promptOneTap();

        return () => {
            isMounted = false;
        };
    }, [getGoogleClientId, isAuthenticated, isCheckingAuth, loginWithGoogleOneTap]);

    return null;
};

export default GoogleOneTap;
```

Ye pura One Tap UI/runtime engine hai:
- script load
- init
- prompt
- credential receive
- backend login call

### 3.5 `frontend/src/providers/Providers.tsx` - component mount

```tsx
import GoogleOneTap from "@/components/auth/GoogleOneTap";
```

```tsx
<GoogleOneTap />
```

Ye ensure karta hai One Tap app level par run ho.

## 4. Required Env / Config

Backend `.env` me minimum:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `CLIENT_URL`

Google Cloud Console me OAuth client ka origin allow hona chahiye:

- `http://localhost:3000`
- `http://127.0.0.1:3000` (agar use karte ho)

## 5. End-to-End Flow

1. App start
2. Auth check
3. User logged-out ho to One Tap initialize
4. User choose account
5. Credential backend par verify
6. Access token + user return
7. Frontend store update
8. User logged-in

## 6. Notes

- Existing Passport Google login (`/api/auth/google`) ab bhi work karta hai.
- One Tap additional flow hai, replacement nahi.
- FedCM related console logs browser behavior se aa sakte hain, code crash issue nahi.
