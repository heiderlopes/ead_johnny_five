// Destructuring
const { Board, Proximity, Button, Led } = require("johnny-five");

//Variables
let board, button, led;
let presentUser = true;
const MAX_USER_DISTANCE = 7.0;

// Create board instance
board = new Board();

board.on("ready", function() {

  // Create a standard `led` component instance
  led = new Led(13);

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new Button(2);

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button
  });
  // Button Event API
  // "down" the button is pressed
  button.on("down", function() {
    console.log("Usuário presente");
    presentUser = true;
    led.off();
  });


  //Proximity Sensor
  const proximity = new Proximity({
    controller: "HCSR04",
    pin: 7
  });

  proximity.on("change", () => {
    const {centimeters} = proximity;
    //console.log("  cm  : ", centimeters);
    if(centimeters > MAX_USER_DISTANCE) {
      if(presentUser) {
        console.log("Usuário ausente");
        presentUser = false;
        led.on();
      }
    }
  });
});