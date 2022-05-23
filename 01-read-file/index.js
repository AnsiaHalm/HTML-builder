const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, 'text.txt');
const stream = new fs.createReadStream(way, 'utf-8');

stream.on('readable', (error) => {
  if (error) console.error(error);
  else {
    let data = stream.read();
    data !== null ? console.log(data) : null;
  }
});