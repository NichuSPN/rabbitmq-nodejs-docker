const amqp = require("amqplib");

const x = async (channel, msgBuffer) => {
  await channel.sendToQueue("number", msgBuffer);
}

async function connect() {
 const msgBuffer = Buffer.from(JSON.stringify({ number: 10 }));
 try {
  const connection = await amqp.connect("amqp://myuser:mypassword@rabbitmq3:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue("number");
  await channel.sendToQueue("number", msgBuffer);
  await channel.sendToQueue("number", Buffer.from(JSON.stringify({ 
    number: 10, 
    xyz: 20 
  })));
  console.log("Sending message to number queue");
  await channel.close();
  await connection.close();
} 
catch (ex) {
  console.error(ex);
}
}
connect();