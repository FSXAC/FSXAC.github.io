window.onload = function() {
  var canvas = document.getElementById("landing-fx");
  var canvas_context = canvas.getContext("2d");

  // set window dimension
  var WIDTH = window.innerWidth;
  var HEIGHT = 500;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  // make snow flakes
  var MAX_FLAKES = 20;
  var flakes = [];

  // loop
  for (var i = 0; i <= MAX_FLAKES; i++) {
    flakes.push({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      radius: Math.random() * 100 + 5,
      density: Math.random() * 2
    })
  }

  // draw flakes function
  function drawFlakes() {
    canvas_context.clearRect(0, 0, WIDTH, HEIGHT);
    canvas_context.fillStyle = "#EEF";
    canvas_context.beginPath();

    for (var i = 0; i <= MAX_FLAKES; i++) {
      var flake = flakes[i];
      canvas_context.moveTo(flake.x, flake.y);
      canvas_context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
    }

    canvas_context.fill();
    moveFlakes();
  }

  // flake animation
  var angle = 0;
  function moveFlakes() {
    angle += 0.01;
    for (var i = 0; i <= MAX_FLAKES; i++) {
      // get instance
      var flake = flakes[i];

      // move instance
      flake.x += Math.sin(angle) * 2;
      flake.y += Math.pow(flake.density, 2) + 1;

      // reset pos when at bottom
      if (flake.y > HEIGHT) {
        flakes[i] = {
          x: Math.random() * WIDTH,
          y: 0,
          radius: flake.radius,
          density: flake.density
        };
      }
    }
  }

  setInterval(drawFlakes, 25);
}
