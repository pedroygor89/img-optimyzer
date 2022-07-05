const path = require('path')
const csvWriter = require('csv-write-stream')
const fs = require('fs')

module.exports = (dataImage) => {
	const csvPath = path.join(global.contentRoot, 'relatorio', 'report.csv');
	if (!fs.existsSync(csvPath))
    writer = csvWriter({ headers: ["url", "imageAntes", "imageDepois"]});
  else
    writer = csvWriter({sendHeaders: false});

  writer.pipe(fs.createWriteStream(csvPath, {flags: 'a'}));
  writer.write(dataImage);
  writer.end();
}