const Input = require('../model/inputModel');

exports.getAllInputs = async (req, res) => {
  try {
    const stats = await Input.aggregate([
      {
        $sort: { priority: -1 }
      }
    ]);
    res.json({
      status: 'success',
      data: stats
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.newInput = async (req, res) => {
  try {
    const input = req.body.input;
    const priority = req.body.priority;
    const checked = req.body.checked;

    const newInput = new Input({ input, priority, checked }); // since I used the same names for the keys and the values...

    await newInput.save();
    res.json({
      status: 'success',
      data: newInput
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

exports.getInput = async (req, res) => {
  try {
    const input = await Input.findById(req.params.id);
  
    res.json({
      status: 'success',
      data: input
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.updateInput = async (req, res) => {
  try {
    const input = await Input.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    // I want to run the same validation rules when I update an item
    res.json({
      status: 'success',
      data: input
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteInput = async (req, res) => {
  try {
    const input = await Input.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};
