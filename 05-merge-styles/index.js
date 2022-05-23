const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'styles');
const wayTo = path.join(__dirname, 'project-dist', 'bundle.css');

fs.unlink(wayTo, error =>{
  if (error) null;
});

fs.readdir(way, {encoding: 'utf-8'}, (error, arr) => {
  if (error) console.error(error);
  else {
    for ( let i = 0; i < arr.length; i++ ) {
      if ( path.extname(arr[i]) === '.css' ){
        fs.readFile(way + '/' + arr[i], (error, data) => {
          if (error) console.error(error);
          else {
            fs.appendFile(wayTo, data,(error) => {
              if (error) console.error(error);
            });
          }
        });
      }
    }
  }});