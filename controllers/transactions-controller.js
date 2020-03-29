const Transaction = require('../models/Transaction');

// @desc   Get all transactions
// @route  GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    // 200 = 'OK'
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    // 500 = 'Internal Server Error'
    return res.status(500).json({
      success: false,
      error: 'Server error...'
    });
  }
};

// @desc   Add all transactions
// @route  POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    // 201 = 'Created'
    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    // check for mongoose ValidationError from Transaction.js required array
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);

      // 400 = 'Bad Request'
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      // 500 = 'Internal Server Error'
      return res.status(500).json({
        success: false,
        error: 'Server error...'
      });
    }
  }
};

// @desc   Delete transaction
// @route  DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransactions = async (req, res, next) => {
  try {
    // req.params accesses the id added to the route uri
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      // 404 = 'Not Found'
      return res.status(404).json({
        success: false,
        error: 'No transaction found.'
      });
    }

    await transaction.remove();
    // 200 = 'OK'
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    // 500 = 'Internal Server Error'
    return res.status(500).json({
      success: false,
      error: 'Server error...'
    });
  }
};
