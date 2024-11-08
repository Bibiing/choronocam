import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

dotenv.config();

// Passport configuration with Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // User does not exist; create a new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName, // Assuming you want to save the name
            email: profile.emails[0].value, // Getting the user's email
            isVerified: true,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize and Deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Routes for authentication
const setupAuthRoutes = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }) // Add 'email' scope to access user's email
  );

  // Google callback route
  app.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, user) => {
      if (err) {
        return next(err);
      }
      // User is now created or found, log them in
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Redirect to home page after successful login or signup
        return res.redirect("http://localhost:5173/");
      });
    })(req, res, next);
  });

  // Logout route
  app.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.next(err);
      }
      res.redirect("/");
    });
  });
};

export default setupAuthRoutes;
