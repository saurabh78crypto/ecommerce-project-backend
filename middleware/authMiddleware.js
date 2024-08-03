import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ 
        status: 'fail', 
        message: 'You are not logged in! Please log in to get access.' 
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({ 
        status: 'fail', 
        message: 'The user belonging to this token does no longer exist.' 
    });
  }

  req.user = currentUser;
  next();
};


export {protect};