const { kafka } = require("./client");

async function bar() {
  const consumer = kafka.consumer({ groupId: "bar" });
  
  try {
    await consumer.connect();
    console.log("Consumer connected successfully");

    await consumer.subscribe({ topics: ["dice-roll"], fromBeginning: true });
    console.log("Subscribed to topic 'dice-roll'");

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log("Received message:");
        console.log(`Topic: ${topic}, Partition: ${partition}`);
        console.log(`Message value: ${message.value.toString()}`);
        console.log("--------------------");
      },
    });

    console.log("Consumer is now running and listening for messages");
  } catch (error) {
    console.error("Error in consumer:", error);
  }
}

bar().catch(console.error);