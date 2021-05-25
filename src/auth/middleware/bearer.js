// 'use strict';

// const users = require('../models/users.js');

// module.exports = async (req, res, next) => {

//   try {

//     if (!req.headers.authorization) { next('Invalid Login') ;}

//     const token = req.headers.authorization.split(' ').pop();
//     const validUser = await users.authenticateWithToken(token);

//     req.user = validUser;
//     req.token = validUser.token;
//     next();

//   } catch (e) {
//     res.status(403).send('Invalid Login');
//   }
// };

'use strict';

const User = require('../models/users.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('authorization header is not provided');
    return;
  }
 
  try {
    const token = req.headers.authorization.split(' ').pop();
    const user = await User.authenticateBearer(token);
    req.user = user;
    req.token = user.token;
    next();
  } catch (error) {
    res.status(403).send('Invalid Token');
  }
};