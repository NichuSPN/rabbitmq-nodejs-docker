const amqp = require("amqplib");
async function connect() {
 try {
   const connection = await amqp.connect("amqp://myuser:mypassword@rabbitmq3:5672");
   const channel = await connection.createChannel();
   await channel.assertQueue("number");
   channel.consume("number", message => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received number: ${input.number}`);
      console.log(`Received xyz: ${input.xyz}`);
     channel.ack(message);
   });
   console.log(`Waiting for messages...`);
 } catch (ex) {
   console.error(ex);
 }
}
connect();