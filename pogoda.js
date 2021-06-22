require('dotenv').config();

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
let qerry = argv._[0]

const http = require('http');

const myAPIKey = process.env.myAPIKey;

const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${qerry}`;

http.get(url, (res) => {
    const statusCode = res.statusCode;
    if (statusCode !== 200) {
        console.error(`Status Code: ${statusCode}`);
        return;    
    }    
    res.setEncoding('utf8');
    let rawData = '';    
    res.on('data', (chunk) => rawData += chunk);    
    res.on('end', () => {
        let parsedData = JSON.parse(rawData); 
        console.log('город: ' + parsedData.location.region)  
        console.log('температура: ' + parsedData.current.temperature + ' градусов') 
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});