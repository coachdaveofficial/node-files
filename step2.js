const fs = require('fs');
const axios = require('axios')
const process = require('process')


function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.kill(1);
            return false
        }
        console.log(data);
    })
}

async function webCat(path) {
    try {
        let resp = await axios.get(path)
        console.log(resp.data)
    } catch (err) {
        console.error(`Error reading URL ${path}: ${err}`)
    }
    
}

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path)
} else {
    cat(path)
}


