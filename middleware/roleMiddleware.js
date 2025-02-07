const restrictTo = (...roles) => {
  return (req, res, next) => {
      console.log('User role: ', req.user.role);
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
            status: 'fail', 
            message: 'You do not have permission to perform this action' 
        });
      }
      next();
    };
  };
  
  export {restrictTo};