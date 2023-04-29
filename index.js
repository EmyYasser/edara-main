const express = require('express') // call all module express
const app = express() 


/// **Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true})); // to access url form encoded
app.use(express.static('uplaod'));
const cors =require("cors");
app.use(cors()); // allow HTTP request localhost

// ///// ***Required Modules
const auther = require("./routes/Auth");
const movies = require("./routes/movies");
const product = require("./routes/product");
const request = require("./routes/requset");
const show_history = require("./routes/show_history");
const supervisor = require("./routes/supervisor");
const Warehouse = require("./routes/warehouse");
const WarehouseProduct = require("./routes/warehouse");


//* const Warehouse = require("./db/warehouse");
// * const supervisor = require("./db/supervisor");
//////////// Run App
const PORT = process.env.PORT || "4000"
app.listen(PORT, () => {
  console.log("Backend server is running!");
 
});
///////*** APIs Routes
app.use("/auth",auther);
app.use("/movies",movies);
app.use("/prod",product);
app.use("/request",request);
app.use("/show_history",show_history);
app.use("/supervisor",supervisor);
app.use("/warehouse",Warehouse);
app.use("/warehouseprod",WarehouseProduct);
// const auth = require("./middleware/admin")