function sendMessage(studentNameValue, monthlyReportUrlValue, parentPhoneNumberValue) {
    // modules
    const axios = require('axios');
    const CryptoJS = require('crypto-js');

    // Parameters
    const studentName = studentNameValue;
    const monthlyReportUrl = monthlyReportUrlValue;
    const parentPhoneNumber = parentPhoneNumberValue;
    const timestamp = Date.now().toString();
    const serviceId = ""; // service id
    const secretKey = ""; // 인증키 Secret Key
    const accessKey = ""; // 인증키 Access Key ID
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/alimtalk/v2/services/${serviceId}/messages`;
    const url2 = `/alimtalk/v2/services/${serviceId}/messages`;

    // 한 번 더 crypto-js 모듈을 이용하여 암호화
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    // 메시지 전송
    axios({
        method: method,
        url: url,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-ncp-apigw-timestamp": timestamp,
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-signature-v2": signature,
        },
        data: {            
            templateCode: "mm1",
            plusFriendId: "@일프로연산",        
            messages: [
                {
                    countryCode: "82",
                    to: `${parentPhoneNumber}`,
                    content:
`안녕하세요. 고객님!

저희 일프로연산에서 정리한 ${studentName}님의 월간 보고서가 도착했어요!

▶ [NEW] 월간 보고서 보러 가기
${monthlyReportUrl} 

앞으로도 좋은 서비스 드리도록 항상 노력하겠습니다.

감사합니다.

[일프로연산 고객센터]
070-4618-1616`,
                    boutton: [
                        {
                            type: "WL",
                            name: "일프로연산",
                            linkMobile: "http://www.1promath.co.kr/",
                            linkPc: "http://www.1promath.co.kr/",
                        }
                    ]
                },
            ],
        },
    })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    return;
}

module.exports = sendMessage;