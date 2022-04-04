const express = require("express");
const dataControllers= require("../controllers/dataController")
const router = express.Router();
router.get('/',dataControllers.getData)
router.post('/create',dataControllers.createData)
router.patch('/update/:id',dataControllers.updateData)
router.delete('/delete/:id',dataControllers.deleteData)
router.post('/mail/send',dataControllers.sendMail)
module.exports= router;