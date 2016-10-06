var Avrgirl = require('avrgirl-arduino');
var path = require('path');
var firmata = path.resolve('node_modules', 'avrgirl-arduino', 'junk', 'hex', 'uno', 'StandardFirmata.cpp.hex');

var avrgirl = new Avrgirl({
  board: 'uno',
  debug: 'true'
});

console.info("uploading Standard Firmata to the Arduino board...");
avrgirl.flash(firmata, function (error) {
  if (error) {
    console.error("something totes went wrong: ", error);
  } else {
    var five = require("johnny-five");
    var board = new five.Board();

    console.info("running diagnostics to make sure everything installed okay...");
    board.on("ready", function() {
      console.info("everything looks good! You're ready to go :D");
      process.exit();
    });
  }
});
