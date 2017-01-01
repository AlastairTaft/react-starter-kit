import fs from 'fs'

export default function copyFile(source, target, opt_callback) {
  var rd = fs.createReadStream(source);
  var wr = fs.createWriteStream(target);
  rd.on("error", err => {throw err})
  wr.on("error", err => {throw err});
  wr.on("close", function(ex) {
    if (opt_callback) opt_callback(ex)
  });
  rd.pipe(wr);
}