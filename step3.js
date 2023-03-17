const fs = require('fs');
const axios = require('axios')
const process = require('process')


function handleOutput(text, out) {
    if (out) {
      fs.writeFile(out, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${out}: ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }
  


function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.kill(1);
        }
        handleOutput(data, out);
    })
}

async function webCat(path, out) {
    try {
        let resp = await axios.get(path)
        handleOutput(resp.data, out)
    } catch (err) {
        console.error(`Error reading URL ${path}: ${err}`)
    }
    
}

let out;
let path;

if (process.argv[2] == '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out)
} else {
    cat(path, out)
}


