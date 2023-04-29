const conn = require("../db/dbConnection");
const util = require("util"); // helper

const adminn = async (req, res, next) => {
  const query = util.promisify(conn.query).bind(conn);
  const { token } = req.headers;
  const admin = await query("select * from users where token = ?", [token]);
  if (admin[0] && admin[0].role == "1") {
    next();
  } else {
    res.status(403).json({
      msg: "you are not authorized to access this route !",
    });
  }
};

const adminAuth = (req , res , next) =>{
  const {status}= req.headers
  if(status == 1) next()
  else
  {
   res.statusCode = 404
   res.send({message:"You not Auth"})
  }
  const {type}= req.headers
  if(type == 1) res.json("Admin")
  else if(type == 0) res.json("Supervisor")
  else
  {
   res.statusCode = 404
   res.send({message:"You not Auth"})
  }

}
module.exports = adminAuth ;
