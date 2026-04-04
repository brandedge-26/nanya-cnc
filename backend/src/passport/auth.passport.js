import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ENV } from "../config/env.js";
import { User } from "../models/User.js";
import { sendEmail } from "../config/nodemailer.js";



// GOOGLE STRATEGY
passport.use(

    new GoogleStrategy({
        clientID: ENV.GOOGLE_CLIENT_ID,
        clientSecret: ENV.GOOGLE_CLIENT_SECRET,
        callbackURL: ENV.GOOGLE_CALLBACK_URL
    },

        async (accessToken, refreshToken, profile, done) => {
            try {

                // user email
                const email = profile.emails[0].value;


                // 1. CHECK USER BY PROVIDER & PROVIDER_ID
                const oauthUser = await User.findOne({
                    provider: "google",
                    providerId: profile.id
                });


                if (oauthUser) {
                    return done(null, { _id: oauthUser._id });
                }


                // 2. CHECK USER BY EMAIL
                let user = await User.findOne({
                    email: email
                });


                // 3. CREATE USER IF NOT EXISTS
                if (!user) {

                    const newUser = await User.create({
                        name: profile.displayName,
                        email: email,
                        provider: "google",
                        providerId: profile.id,
                        avatar: profile.photos?.[0]?.value || null,
                        password: null // OAuth users don't have passwords
                    });


                    // send welcome email to user
                    const emailOptions = {
                        name: newUser.name,
                        email: newUser.email,
                        subject: "Welcome to NANYA CNC",
                    }

                    await sendEmail(emailOptions);

                    return done(null, { _id: newUser._id });
                }


                // 4. IF USER EXISTS BUT NO OAUTH LINK, UPDATE WITH OAUTH INFO
                if (user && !user.providerId) {

                    user.provider = "google";
                    user.providerId = profile.id;

                    if (!user.avatar && profile.photos?.[0]?.value) {
                        user.avatar = profile.photos[0].value;
                    }

                    await user.save();
                }

                // send welcome back email to existing user
                await sendEmail({
                    name: user.name,
                    email: user.email,
                    subject: "Welcome back to NANYA CNC",
                });

                return done(null, { _id: user._id });

            } catch (err) {
                return done(err, null);
            }
        }

    ));