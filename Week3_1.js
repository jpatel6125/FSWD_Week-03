console.log("Hello");
const os = require('os');
const fs = require('fs');
const path = require('path')

let data1 = JSON.stringify(os.type())
let data2 = JSON.stringify(os.totalmem())
let data3 = JSON.stringify(os.freemem())
let data4 = JSON.stringify(os.cpus());

const systemInfo = `OS type: ${data1}
Total Memory: ${data2}
Free Memory: ${data3}
CPU Details: ${data4}`

fs.writeFile(path.join(__dirname, 'file.txt'), systemInfo, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("System information has been logged into file.txt")
    }
});