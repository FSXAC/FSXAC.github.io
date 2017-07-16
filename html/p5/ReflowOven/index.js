// var name = process.argv[2];
// console.log("Hello world, welcome to node, " + name);

var serialport = require('serialport');
var SerialPort = serialport;

// port settings
var _portName = process.argv[2];

// setup serial
var port = new SerialPort(_portName, {
    baudRate: 115200,
    parser: serialport.parsers.readline("\r\n")
});

// list serial ports
// serialport.list(function (err, ports) {
//     ports.forEach(function (port) {
//         console.log(port.comName);
//     });
// });

// serial events
port.on('open', showPortOpen)
port.on('data', sendSerialData);
port.on('close', showPortClose);
port.on('error', showError);

// callback functions
function showPortOpen() {
    console.log('Port open; baudrate: ' + port.options.baudRate);
}

function sendSerialData(data) {
    console.log(data);
}

function showPortClose() {
    console.log('Port closed')
}

function showError(error) {
    console.log('Serialport error: ' + error);
}
