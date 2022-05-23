const fs = require('fs');
const path = require('path');
const readline = require('readline');

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout});

const way = path.join(__dirname, 'text.txt');
const stream = fs.WriteStream(way);

function writeFile() {
  interface.question('Введите текст: ', (answer) => {
    if (answer === 'exit') {
      console.log('Goodbye');
      interface.close();
    }
    else {
      stream.write(answer + '\n', (error) => {
        if (error) console.error(error);
        else {
          writeFile();
        }
      });
    }
  });
}
writeFile();

interface.on('SIGINT',()=>{
  console.log('\nGoodbye');
  interface.close();
});
