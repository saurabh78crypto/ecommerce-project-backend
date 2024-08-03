import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const signToken = id => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const userExist = await User.findOne({ email: email });
    if(userExist) {
        return res.status(409).json({
            message: 'User alreay registered!'
        });
    }
    
    const newUser = await User.create({ 
        email, 
        password, 
        role 
    });

    const token = signToken(newUser._id);

    return res.status(201).json({ 
        status: 'success', 
        token, 
        data: { user: newUser } 
    });
  } catch (err) {
    return res.status(400).json({ 
        status: 'fail', 
        message: err.message 
    });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ 
              status: 'fail', 
              message: 'Please provide email and password!' 
          });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
          return res.status(401).json({ 
              status: 'fail', 
              message: 'Incorrect email or password' 
          });
        }
    
        const token = signToken(user._id);
    
        return res.status(200).json({ 
          status: 'success', 
          token, 
          message: `Hello ${user.email}!`,
          data: { user } 
        });
    } catch (error) {
        return res.status(400).json({ 
            status: 'fail', 
            message: err.message 
    });
    }
  
};

export default {signup, login}
