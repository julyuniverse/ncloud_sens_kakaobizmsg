const express = require('express');
const router = express.Router();
const sendMessage = require('../src/ncloudSens/kakaoBizMsg');

// router에서 body-parser 설정 
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/', async (req, res, next) => {
    const studentName = req.body.studentName;
    const monthlyReportUrl = req.body.monthlyReportUrl;
    const parentPhoneNumber = req.body.parentPhoneNumber;

    sendMessage(studentName, monthlyReportUrl, parentPhoneNumber);
    console.log("send message!");
});

module.exports = router;