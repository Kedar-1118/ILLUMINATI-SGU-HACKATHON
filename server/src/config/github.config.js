import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { AsyncHandler } from "../utils/wrapAsync.js";
import { sendMail } from "../utils/sendMail.js";

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
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        const email = profile.emails[0]?.value;
        const githubUsername = profile.username;

        const generatedPassword = `GH_${email.split("@")[0]}_${githubUsername}`;

        user = new User({
          login: profile.username,
          email,
          name: profile.displayName,
          avatar_url: profile.photos[0]?.value,
          bio: profile._json.bio,
          location: profile._json.location,
          provider: "github",
          githubId: profile.id,
          password: generatedPassword, 
        });

        await user.save();

        user.accessToken = accessToken;

        const subject = "Your GitHub Registration Details - [App Name]";
        const message =
          `Hey ${profile.displayName || profile.username},\n\n` +
          `Thanks for signing up via GitHub! 🎉\n\nHere are your login details:\n\n` +
          `Email: ${email}\nPassword: ${generatedPassword}\n\n` +
          `🔐 We recommend you change this password immediately after logging in to ensure account security.\n\nCheers,\nTeam`;

        await sendMail(email, subject, message);
      }

      return done(null, user);
    }
  )
);
