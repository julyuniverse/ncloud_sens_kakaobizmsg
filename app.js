const express = require('express');
const app = express();
const port = 3000;
const router = require('./router/router'); // 라우터 경로 설정

app.get('/', function (req, res, next) {
    res.send('Hello World!');
});

app.use('/sens/kakaoBizMsg', router); // router 설정

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});