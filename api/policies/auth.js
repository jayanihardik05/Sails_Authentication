const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log(req.options.action)
  
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decord = jwt.verify(token, 'SECRET_KEY');
    req.userData = decord;
    var data = {
      Titile: "API_Request",
      API: req.options.action,
      ID: req.userData.id,
      Email: req.userData.email,
      Date: new Date()
    }
    logtable.create(data).exec((err, result) => { })
    next(null, req.userData);
  } catch (error) {
    return res.status(200).json({
      message: "Auth Filed"
    });
  }
};

