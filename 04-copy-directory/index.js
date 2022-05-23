const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, 'files');
const wayTo = path.join(__dirname,'files-copy');

fs.mkdir(wayTo,{ recursive: true },(error) => {
  if (error) console.error(error);
});

function copyDirectory() { 
  fs.readdir(way, (error, arr)=> {
    if (error) console.error(error);
    else {
      for ( let file of arr ){
        fs.copyFile(way + '/' + file, wayTo + '/' + file, error =>{
          if (error) console.error(error);
        });
      }
    }
  });
}

function deleteFolder() {
  fs.readdir(wayTo, (error, arr) => {
    if (error) console.error(error);
    else {
      for ( let i = 0; i < arr.length; i++ ) {
        fs.unlink(wayTo + '/' + arr[i], error =>{
          if (error) console.error(error);
        });
      }
    }
  });
}

async function run() {
  // eslint-disable-next-line no-unused-vars
  const promise = await deleteFolder();
  return copyDirectory();
}
run();
