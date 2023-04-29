const router = require("express").Router();
const conn = require("../db/dbConnection");
const requireAdminAuth = require('../middleware/admin');
// Create a new supervisor
router.post('/admin/supervisors', requireAdminAuth, async (req, res) => {
  const { name, email, password } = req.body;

  const supervisor = new Supervisor({ name, email, password });

  await supervisor.save();

  res.send(supervisor);
});

// Get all supervisors
router.get('/admin/supervisors', requireAdminAuth, async (req, res) => {
  const supervisors = await Supervisor.find();

  res.send(supervisors);
});

// Get a single supervisor
router.get('/admin/supervisors/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const supervisor = await Supervisor.findById(id);

  if (!supervisor) {
    return res.status(404).send('Supervisor not found');
  }

  res.send(supervisor);
});

// Update a supervisor
router.patch('/admin/supervisors/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const supervisor = await Supervisor.findByIdAndUpdate(
    id,
    { name, email, password },
    { new: true }
  );

  if (!supervisor) {
    return res.status(404).send('Supervisor not found');
  }

  res.send(supervisor);
});

// Delete a supervisor
router.delete('/admin/supervisors/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const supervisor = await Supervisor.findByIdAndDelete(id);

  if (!supervisor) {
    return res.status(404).send('Supervisor not found');
  }

  res.send(supervisor);
});

module.exports = router;