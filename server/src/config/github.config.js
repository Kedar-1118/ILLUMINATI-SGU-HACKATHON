import passport from "passport";
import {Strategy as GitHubStrategy} from "passport-github2";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { AsyncHandler } from "../utils/wrapAsync.js";
import mongoose from "mongoose";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = new User({
            login: profile.username,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar_url: profile.photos[0].value,
            bio: profile._json.bio,
            location: profile._json.location,
            provider: "github",
            githubId: profile.id,
          });
          console.log("User created:", user);
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
