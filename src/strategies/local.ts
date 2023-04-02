import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { User } from "../sequelize/models/users";
import { verifyPassword } from "../utils/hashing";

passport.serializeUser((user: any, done) => done(null, user._id)); // Serializing User
passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findOne({ where: { _id: _id } });
    if (!user) return done(new Error("User not found!"), undefined);
    return done(null, user);
  } catch (err) {
    return done(err, undefined);
  }
}); // Deserializing User

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      if (!email || !password) {
        done(new Error("Please fill all the details!"), undefined);
      }
      try {
        const theUser: any = await User.findOne({ where: { email: email } });
        if (!theUser) return done(new Error("User does not exits!"), undefined);
        let isValid = verifyPassword(password, theUser.password);
        if (!isValid) return done(new Error("Invalid Credentials!"), undefined);
        done(null, theUser);
      } catch (error) {
        if (error instanceof Error) {
          return done(error, undefined);
        }
      }
    }
  )
);
