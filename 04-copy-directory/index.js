const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, 'files');
const wayTo = path.join(__dirname,'files-copy');

fs.mkdir(wayTo,{ recursive: true },(error) => {
  if (error) console.error(error);
});

fs.readdir(wayTo, (error, arr) => {
  for ( let i = 0; i < arr.length; i++ ) {
    fs.unlink(wayTo + '/' + arr[i], error =>{
      if (error) console.error(error);
    });
  }
});

fs.readdir(way, (error, arr)=> {
  for ( let file of arr ){
    fs.copyFile(way + '/' + file, wayTo + '/' + file, error =>{
      if (error) console.error(error);
    });
  }
});

// function readFolder() {
//   fs.readdir(way,{
//     encoding: 'utf-8',
//     withFileTypes: true
//   }, (error,arr) => {
//     if (error) console.error(error);
//     else {
//       arr.forEach(file => {
//         if(file.isDirectory()) readFolder();
//         else {
//           let pathFromFile = path.join(way,`${file.name}`);
//           let pathToFile = path.join(wayTo,`${file.name}`);
//           fs.unlink(pa)
//           fs.copyFile(pathFromFile,pathToFile,(error) => {
//             if(error) console.error(error);
//           });
//         }
//       }
//       );
//     }
//   });
//   fs.readdir(wayTo,{
//     encoding: 'utf-8',
//     withFileTypes: true
//   }, (error,arr) => {
//     if (error) console.error(error);
//     else {
//       arr.forEach(file => {
//         if(file.isDirectory()) readFolder();
//         else{
          
//         }
//       }
//       );
//     }
//   });
// }
// readFolder();
