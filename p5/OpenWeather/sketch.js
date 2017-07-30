// DOM javascript and Jquery
var address;
var location;
var temp_tgt = 0;
var temp = -20;

$(document).ready(function(){
    $("#submit_button").click(function(){
        var text = $(this).parent().prev().val();
        var location = text.split(/, +|,/);

        if (location.length > 1) {
            loadJSON(address[0]+location[0]+','+location[1]+address[1], fetchedData);
        } else {
            loadJSON(address[0]+location[0]+address[1], fetchedData);
        }
    });
})

function fetchedData(data) {
    if (data) {
        temp_tgt = data.main.temp;
        $('#result').text(temp_tgt);
        $("#city").text(data.name+", "+data.sys.country);
    }
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function preload() {
    address=["http://api.openweathermap.org/data/2.5/weather?q=", "&APPID=818296955545804f4cb4067a0e01b870&units=metric"];
}


var bar;
var p1_x;
var p1_y;
var p2_y;
function setup() {
    canvas = createCanvas(100, 300);
    canvas.parent("sketch-holder");
    background(0);
    noStroke();
    textAlign(CENTER);
    textSize(20);

    p1_x = (width-50)/2;
    p1_y = (height-200)/2;
    p2_y = p1_y+200;
}

function draw() {
    background(0);
    fill(255);
    rect(p1_x, p1_y, 50, 200);
    ellipse(width/2, height/2+100, 60, 60);
    text(temp.toFixed(2)+" C", 50, 30);

    temp = lerp(temp, temp_tgt, 0.1);

    bar = map(temp, 40, -20, p1_y+5, p2_y-35);
    fill(
        map(temp-20, 20, 0, 255, 0),
        map(abs(temp-20), 0, 25, 255, 0),
        map(temp-20, 20, -40, 0, 255)
    );
    rect(p1_x+5, bar, 40, p2_y-bar);
    ellipse(width/2, height/2+100, 50, 50);
}
