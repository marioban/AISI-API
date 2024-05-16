const stompit = require('stompit');

const connectOptions = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders': {
    'host': '/',
    'login': 'admin',
    'passcode': 'admin',
    'heart-beat': '5000,5000'
  }
};

let client;

// Connect to ActiveMQ
stompit.connect(connectOptions, (error, clientConnection) => {
  if (error) {
    console.log('Connection error: ' + error.message);
    return;
  }
  client = clientConnection;
  console.log("Connected to ActiveMQ successfully.");
});

const sendMessage = (queueName, message) => {
  return new Promise((resolve, reject) => {
    if (!client) {
      reject(new Error("Client is not connected to ActiveMQ."));
      return;
    }

    const sendHeaders = {
      'destination': `/queue/${queueName}`,
      'content-type': 'text/plain'
    };

    const frame = client.send(sendHeaders);
    frame.write(JSON.stringify(message));
    frame.end();

    resolve("Message sent to ActiveMQ successfully.");
  });
};

module.exports = { sendMessage };
