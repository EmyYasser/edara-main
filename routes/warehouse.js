const router = require("express").Router();
const requireAdminAuth = require('../middleware/authorize');
const conn = require("../db/dbConnection");
const util = require("util"); // helper
const { body, validationResult } = require("express-validator");

// Create a new warehouse
// router.post('/admin/warehouses', requireAdminAuth, async (req, res) => {
//   const { name, address } = req.body;

//   const warehouse = new Warehouse({ name, address });

//   await warehouse.save();

//   res.send(warehouse);
// });

////************ */
router.post(
  "/createwarehouses",
  body("name").isString().withMessage("enter Name"),
  body("location").isString().withMessage("enter location")
    ,
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const user = await query("select * from wareh where name = ?", [ req.body.name,]);
      if (user.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "Token already exists !",
            },
          ],
        });
      }
      // 3- save Request 
      const warehouseInput ={
        name:req.body.name
        ,location:req.body.location

      }
      // 4 insert object into DB
      await query("insert into wareh set ?", warehouseInput)
      res.status(200).json(warehouseInput)
      res.json(location);
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
);
////************ */

// Get all warehouses
router.get('/admin/warehouses', requireAdminAuth, async (req, res) => {
  const warehouses = await Warehouse.find();

  res.send(warehouses);
});
// ****Get all warehouses
router.get('/wareh', function (req, res) {   
  conn.query("SELECT * FROM wareh" , (err , result,fileds) =>{
      console.log(err , result,fileds),
      res.json(result)
  }) 
})
// Get a single warehouse
router.get('/admin/warehouses/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const warehouse = await Warehouse.findById(id);

  if (!warehouse) {
    return res.status(404).send('Warehouse not found');
  }

  res.send(warehouse);
});

// Update a warehouse
router.patch('/admin/warehouses/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  const warehouse = await Warehouse.findByIdAndUpdate(
    id,
    { name, address },
    { new: true }
  );

  if (!warehouse) {
    return res.status(404).send('Warehouse not found');
  }

  res.send(warehouse);
});

// Delete a warehouse
router.delete('/admin/warehouses/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const warehouse = await Warehouse.findByIdAndDelete(id);

  if (!warehouse) {
    return res.status(404).send('Warehouse not found');
  }

  res.send(warehouse);
}); 
module.exports = router;