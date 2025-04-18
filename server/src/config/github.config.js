import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { AsyncHandler } from "../utils/wrapAsync.js";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    AsyncHandler(async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        user = new User({
          login: profile.username,
          email: profile.emails[0]?.value,
          name: profile.displayName,
          avatar_url: profile.photos[0]?.value,
          bio: profile._json.bio,
          location: profile._json.location,
          provider: "github",
          githubId: profile.id,
        });
        await user.save();
      }

      // TODO: also return accessToken

      return done(null, user);
    })
  )
);
