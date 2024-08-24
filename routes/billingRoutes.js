const express = require('express');
const router = express.Router();
const { createBill, getAllBills } = require('../controllers/billingController'); // تأكد من المسار

router.post('/billing', createBill);
router.get('/billing', getAllBills);

module.exports = router;
