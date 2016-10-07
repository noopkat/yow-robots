# Yow! Connected 2016 JavaScript Robotics Workshop

## Introduction

Welcome to the YOW! Connected JavaScript Robotics Workshop! We're going to have so much fun today :tada:

Today we're using some cool JavaScript libraries to invent some electronic masterpieces. Or just plain silly contraptions. It's your choice :relieved:

The tools and libraries are:

+ [Johnny-Five](http://johnny-five.io/) - to interact with the Arduino remotely. This is where the magic happens.
+ [Firmata Party](https://github.com/noopkat/firmata-party) - to upload the Firmata Protocol to our Arduino board. This is what Johnny-Five uses to talk to the Arduino.

We're running within the [Nodebots](http://nodebots.io/) ecosystem of JavaScript robotics. We're a lovely bunch of folks, happy to help and admire your inventions any time :heart_eyes:

## Getting started

### Installing

1. Ensure you have [NodeJS](https://nodejs.org/en/) installed.
2. Follow either the Simple Setup, or the Manual Setup instructions if you'd prefer.

#### Simple Setup

If you have this repository cloned, you can run the following command within this repository in your command line application. ***Make sure to have your Arduino plugged in first!***

```bash
npm install && npm run setup
```

#### Manual Setup

If you'd like to set everything up yourself, you can run the following on the command line. ***Please plug in your Arduino first!***

```bash
mkdir yay-robots
cd yay-robots
npm install -g firmata-party
npm install johnny-five
firmata-party uno —-debug

```

### Hello World (using an 'output')

The "hello world" of the hardware scene is blinking an LED! Firstly, we need to connect an LED correctly to the Arduino board. We're going to use digital pin 13 for this. 

**Handy hint** - the long wire of the LED goes in the digital pin 13, and the shorter wire plugs into the ground (GND) pin. See the diagram below:

![led hello world breadboard example](https://github.com/rwaldron/johnny-five/raw/master/docs/breadboard/led-13.png)



Copy the following code into your favourite code editor, and save as `blink.js`

```javascript
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // Create an Led on pin 13 
  var led = new five.Led(13);
  // Blink it!
  led.blink();
});
```

In your command line application of choice (I dig iTerm on OSX), run your file with NodeJS:

```bash
node blink.js
```

If all goes well, you should see your LED blinking! :tada:

### Using the REPL

You can start up a REPL (interactive terminal) by injecting your LED object in this way:

```javascript
this.repl.inject({
	led: led
});
```

Place this code in your blink program like so:

```javascript
const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {
  // Create an Led on pin 13 
  const led = new five.Led(13);
  
  // This will grant access to the led instance
  // from within the REPL that's created when
  // running this program.
  this.repl.inject({
    led: led
  });
  
});
```
  
Now try running your script in Node again:

```bash
node blink.js
```

Once it starts up, try typing `led.off()` in the command line. What happens? try also turning the LED on.

### Bonus round!

Try to get your LED to [*pulse*](http://johnny-five.io/api/led/#api), rather than blink. What changes are needed to make this happen?

## Using sensors ('inputs')

Most sensors need to be plugged into an analog pin on the Arduino. Let's use a photoresistor, or light sensor to see how to get some data. You'll also need a 10k Ohm resistor.

![photoresistor](http://johnny-five.io/img/breadboard/photoresistor.png)

The diagram above shows the photoresistor plugged into analog pin A2.

The code below will set up the sensor, and listen for a data events coming in at a frequency of 250 milliseconds:

```javascript
const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  const photoresistor = new five.Sensor({
    pin: "A2",
    freq: 250
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log(this.value);
  });
});

```

Save this file as `light-sensor.js` and run it on the command line with Node:

```bash
node light-sensor.js
```

You should see lots of values come streaming in. These values should be between 0 and 1024. Try blocking light from the sensor with your hand, and then taking your hand away again. The values should rapidly change to reflect the amount of light hitting the sensor.


## Super bonus round! Bringing it together

Can you find a way to connect your input (photoresistor) data to your output (LED)? Hint: can you influence either the brightness or the blink frequency of the LED, based on the live sensor data coming in from the photoresistor?



## Learning the Johnny-Five API

For the rest of the day, we're going to be freestyling! You're open to explore your kit fully and start getting to know the Johnny-Five API. The best way to go about this is to pick another input and an output, get to know them, and then try 'connecting' them in some way programmatically.

Check out both the [API](http://johnny-five.io/api/) and [Examples](http://johnny-five.io/examples/) sections of the Johnny-Five website to learn how to use all of the pieces in your Arduino kit. If you like, you can make a new file for each component, or mash everything together into a single file. It's up to you.

I'm here to help you when you get stuck, and we're all here to share things we learn along the way and admire what everyone comes up with :heart:

If you have a few minutes to spare, it would be much appreciated if you could fill out the following survey to provide us with feedback on what you thought of the workshop: https://goo.gl/forms/dsIlKXBLrr9FPa602
