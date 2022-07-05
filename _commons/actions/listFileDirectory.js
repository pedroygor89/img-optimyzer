const directory = './files/';
const path = require('path');
const fs = require('fs');

fs.readdirSync(directory).forEach(file => {
  if (fs.lstatSync(path.resolve(directory, file)).isDirectory()) {
    console.log('Directory: ' + file);
  } else {
    console.log('File: ' + file);
  }
});