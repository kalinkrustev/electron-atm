/**
 * Listening to Network Events (sending/receiving data from host)
 */

const electron = require('electron')
const Network = require('./network');
const ipc = electron.ipcRenderer

let network = new Network();

ipc.on('network-connect', (event, message) => {
  network.connect('127.0.0.1', 11032);

  // Listening to socket
  network.client.on('data', data => {
    network.trace.trace(data, '<< ' + data.length + ' bytes received:');
    ipc.send('network-data-received', data);

    /*
    parsed = this.parser.parseHostMessage(data);
    console.log(this.trace.object(parsed));
    */
  });
})

