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

        const subject =
          "Welcome to Open-Nest - Your GitHub Registration Details";

        const messageText = `Hey ${profile.displayName || profile.username},

Thanks for signing up via GitHub! 🎉

Here are your login details:

Email: ${email}
Password: ${generatedPassword}

We recommend you change this password immediately after logging in to ensure your account's security.

Login here: ${process.env.CLIENT_URL}/login

Cheers,
The [App Name] Team`;

        const messageHTML = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome to <span style="color:#4F46E5;">[App Name]</span> 🎉</h2>
    <p>Hey <strong>${profile.displayName || profile.username}</strong>,</p>
    <p>Thanks for signing up via GitHub! We're excited to have you on board.</p>
    <p><strong>Your login details:</strong></p>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Password:</strong> ${generatedPassword}</li>
    </ul>
    <p style="color: #DC2626;"><strong>Important:</strong> Please change your password after logging in to keep your account secure.</p>
    <p>
      <a href="${process.env.CLIENT_URL}/login" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #4F46E5;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">Login Now</a>
    </p>
    <p>If you didn't expect this email, you can safely ignore it.</p>
    <p>Cheers,<br/>The Open-Nest Team</p>
  </div>
`;

        await sendMail(email, subject, messageText, messageHTML);
      }

      return done(null, user);
    }
  )
);
