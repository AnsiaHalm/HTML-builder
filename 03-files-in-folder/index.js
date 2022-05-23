const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, 'secret-folder');

fs.readdir(way, {
  encoding: 'utf-8',
  withFileTypes: true
}, (error, arr) => {
  if (error) console.error(error);
  else {
    arr.forEach(file => {
      if (file.isFile()) {
        let wayFile = path.join(way, `${file.name}`);
        fs.stat(wayFile, (error, stats) => {
          if (error) console.error(error);
          else {
            console.log(file.name.split('.').slice(0,1).join('') + ' - ' + path.extname(file.name).slice(1) + ' - ' + stats.size / 1024 + 'kb');
          }
        });
      }});
  }
});