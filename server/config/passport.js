const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const db = require('../db/models');
const { JWT_SECRET } = require('./variables');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new Strategy(options, (payload, done) => {
    db.User.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        done(err, null);
      });
  })
);
