// const { kafka } = require("./client");


// async function line() {
//   const consumer = kafka.consumer({ groupId: "dice" });
//   await consumer.connect();

//   await consumer.subscribe({ topics: ["dice-roll"] });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
//       console.log(
//         ` [${topic}]: PART:${partition}:`,
//         message.value.toString()
//       );
//     },
//   });
// }

// line();
const { kafka } = require("./client");

async function line() {
  const consumer = kafka.consumer({ groupId: "dice" });

  try {
    await consumer.connect();
    console.log("Consumer connected");

    await consumer.subscribe({ topic: "dice-roll", fromBeginning: true });
    console.log("Subscribed to topic");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(
          `Received message: [${topic}]: PART:${partition}: ${message.value.toString()}`
        );
      },
    });
  } catch (err) {
    console.error("Error in consumer:", err);
  }
}

line();
