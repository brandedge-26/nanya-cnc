# Google One Tap Integration Guide

Yeh file explain karti hai ke project me Google One Tap login kaise implement hua, kya change kiya gaya, aur har function ka role kya hai.

## 1. Kya implement hua?

- Existing Google OAuth (Passport redirect flow) ko **break kiye bina** new One Tap flow add kiya gaya.
- One Tap popup ab sirf tab show hota hai jab user unauthenticated ho.
- Agar user already login hai to One Tap cancel ho jata hai.

## 2. Kya packages install kiye gaye?

**Koi naya npm package install nahi kiya gaya.**

Implementation existing stack se hua:
- Backend: Node.js + Express + existing auth system
- Frontend: Next.js + Zustand
- Google One Tap JS SDK script runtime par load hoti hai:
  - `https://accounts.google.com/gsi/client`

## 3. Backend changes

### File: `backend/src/controllers/auth.controller.js`

Do naye controllers add kiye:

1. `googleClientIdController`
- Kaam: frontend ko Google Client ID dena.
- Response:
  - `{ success: true, clientId: ENV.GOOGLE_CLIENT_ID }`

2. `googleOneTapLoginController`
- Kaam: frontend se aayi One Tap `credential` ko verify karna aur login/create user karna.
- Flow:
  1. `credential` body se read hoti hai.
  2. Google token verify endpoint call hota hai:
     - `https://oauth2.googleapis.com/tokeninfo?id_token=...`
  3. Validation:
     - token valid ho
     - `aud === ENV.GOOGLE_CLIENT_ID`
     - `email_verified === "true"`
  4. User lookup:
     - pehle `provider=google + providerId`
     - phir email by fallback
  5. User create/update:
     - new user create ya existing user ko Google se link
  6. Existing auth jaisa token issue:
     - access token return
     - refresh token cookie set
  7. Response me user object + token return.

### File: `backend/src/routes/auth.routes.js`

Do naye routes add huye:

- `GET /api/auth/google/client-id`
- `POST /api/auth/google/one-tap`

Baaki existing Passport routes (`/google`, `/google/callback`) same rehne diye gaye.

## 4. Frontend changes

### File: `frontend/src/store/authStore.ts`

State interface me do naye methods add kiye:

1. `getGoogleClientId()`
- Backend se client id fetch karta hai.
- Endpoint: `/auth/google/client-id`
- Return: `string | null`

2. `loginWithGoogleOneTap(credential)`
- One Tap credential backend ko send karta hai.
- Endpoint: `/auth/google/one-tap`
- Success par:
  - `accessToken` localStorage me save
  - zustand store me `user` aur `isAuthenticated` set

### File: `frontend/src/components/auth/GoogleOneTap.tsx` (new)

Yeh main One Tap orchestrator component hai.

Iske responsibilities:

1. Auth state check:
- Agar `isCheckingAuth` true hai to wait.
- Agar `isAuthenticated` true hai to `google.accounts.id.cancel()`.

2. Script load:
- Google One Tap script dynamic inject karta hai (head me).

3. Initialize:
- `google.accounts.id.initialize({ client_id, callback, ... })`

4. Prompt:
- `google.accounts.id.prompt(...)`
- Dismiss/skip par session me mark karta hai taake baar baar force prompt na ho.

5. Credential callback:
- Credential milte hi `loginWithGoogleOneTap` call karta hai.
- Success par toast + prompt cancel.

### File: `frontend/src/providers/Providers.tsx`

- `<GoogleOneTap />` ko provider tree me add kiya gaya, taake app level par run kare.

## 5. Environment requirements

Aapne bataya tha `.env` me already values hain. One Tap ke liye important:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL` (existing Passport flow ke liye)

Also:
- `CLIENT_URL` correct hona chahiye.
- Backend/Frontend URLs mismatch na ho.

## 6. End-to-end runtime flow

1. User website open karta hai.
2. Auth check complete hota hai.
3. Agar user login nahi:
   - frontend One Tap client id fetch karta hai
   - Google One Tap prompt show hota hai
4. User Google account choose karta hai.
5. Frontend credential backend ko bhejta hai.
6. Backend credential verify karta hai.
7. Backend access token + user return karta hai.
8. Frontend token save karta hai aur user store update karta hai.
9. User logged-in state me aa jata hai.

## 7. Important notes

- Existing “Continue with Google” button ab bhi Passport redirect flow use karta hai.
- One Tap aur Passport dono coexist karte hain.
- Koi extra third-party package add nahi hua.

## 8. Testing checklist

1. Logged out state me homepage open karo -> One Tap popup aana chahiye.
2. One Tap se login karo -> user session set hona chahiye.
3. Page refresh karo -> login state persist rehni chahiye.
4. Logged in state me One Tap popup dubara nahi aana chahiye.
5. Manual Google button (`Continue with Google`) bhi work karna chahiye.

## 9. Troubleshooting

### One Tap popup nahi aa raha
- Browser me third-party sign-in restricted ho sakta hai.
- Wrong `GOOGLE_CLIENT_ID`.
- Google Cloud console me authorized origins mismatch.

### Backend invalid credential de raha
- Check `aud` vs `GOOGLE_CLIENT_ID`.
- Ensure frontend aur backend same Google project use kar rahe hain.

### User create/login mismatch
- Email pe duplicate/local-vs-google link conditions inspect karein.

