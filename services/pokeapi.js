const https = require('https');

const options = {
    hostname: 'pokeapi.co',
    path: '/api/v2/pokemon/152',
    method: 'GET'
};

const req = https.request(options, (res) => {
    let data = '';
    res.on("data", (chunk) => {
        console.log("Requisitando dados... " + chunk + "\r\n\r\n\r\n\r\n\r\n");
        data += chunk;
    });
    res.on("end", () => {
        console.log(JSON.parse(data)['name']);
        console.log(JSON.parse(data)['height']);
        console.log(JSON.parse(data)["weight"]);
    })
});

req.on("error", (error) => {
    console.error(error);
});

req.end();
