const fs = require('fs');
const path = require('path');
const wayToComponents = path.join(__dirname,'components');
const wayFrom = path.join(__dirname, 'template.html');
const wayTo = path.join(__dirname, 'project-dist');
const wayToHTML = path.join(__dirname, 'project-dist', 'index.html');
const fromStyles = path.join(__dirname, 'styles');
const toStyles = path.join(__dirname, 'project-dist', 'style.css');
const fromAssets = path.join(__dirname, 'assets');
const toAssets = path.join(wayTo,  'assets');


fs.mkdir(wayTo,{ recursive: true },(error) => {
  if (error) console.error(error);
});

//styles
fs.unlink(toStyles, error =>{
  if (error) null;
});
fs.readdir(fromStyles, {encoding: 'utf-8'}, (error, arr) => {
  if (error) console.error(error);
  else {
    for ( let i = 0; i < arr.length; i++ ) {
      if ( path.extname(arr[i]) === '.css' ){
        fs.readFile(fromStyles + '/' + arr[i], (error, data) => {
          if (error) console.error(error);
          else {
            fs.appendFile(toStyles, data,(error) => {
              if (error) console.error(error);
            });
          }
        });
      }
    }
  }});



//assets
function deleteAssets (toAssets) {
  fs.readdir(toAssets,{encoding:'utf-8', withFileTypes: true}, (error, array) => {
    if (error) console.error(error);
    else {
      array.forEach(file => {
        if (file.isFile()) {
          fs.unlink(path.join(toAssets,file.name),(error) => {
            if (error) console.log(error);
          });
        }
        else {
          deleteAssets(path.join(toAssets,file.name));
        }
      });
      htmlBuilder();
    }
  });
}
deleteAssets(toAssets);

function assets (fromAssets, toAssets){
  fs.mkdir(toAssets, {recursive: true}, (error) => {
    if(error) console.error(error);
  });
  fs.readdir(fromAssets, {withFileTypes: true}, (error,arr) => {
    if(error) console.error(error);
    else {
      arr.forEach(file =>{
        if (file.isFile()) {
          fs.copyFile(path.join(fromAssets, file.name), path.join(toAssets, file.name),(error) => {
            if (error) console.log(error);
          });
        } else {
          assets(path.join(fromAssets, file.name), path.join(toAssets, file.name));
        }
      });
    }
  }); 
}
assets(fromAssets, toAssets);  

//html
let string = '';
function htmlBuilder() { 
  const templateStream = fs.createReadStream(wayFrom,'utf-8');
  templateStream.on('data', (data) => {
    string = data.toString();
    fs.readdir(wayToComponents,{encoding:'utf-8',withFileTypes: true}, (error,array) => {
      if(error) console.error(error);
      else {
        array.forEach(file => {
          const fileStream = fs.createReadStream(wayToComponents + '/' + file.name);
          fileStream.on('data', (fileData) => {
            const regexp = new RegExp(`{{${file.name.split('.').slice(0,1).join('')}}`,'gi');
            string = string.replace(regexp, fileData.toString());
            fs.writeFile(wayToHTML,string,(error) => {
              if(error) console.log(error);
            });
          });
        });
      }
    });
  });
}
