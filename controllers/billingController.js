const Bill = require('../models/Billing'); // تأكد من المسار


exports.createBill = async (req, res) => {
  try {
    const { patientId, amount, date, status } = req.body;
    const bill = new Bill({ patientId, amount, date, status });
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    console.error('Error creating bill:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    console.error('Error fetching bills:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
