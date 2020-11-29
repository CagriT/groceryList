const express = require('express');
const inputController = require('../controller/inputController');

const router = express.Router();

router.get('/', inputController.getAllInputs);
router.post('/new', inputController.newInput);
router.patch('/edit/:id', inputController.updateInput);

router
  .route('/:id')
  .get(inputController.getInput)
  .delete(inputController.deleteInput);

module.exports = router;
