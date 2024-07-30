const { kafka } = require("./client");

async function bar() {
  const consumer = kafka.consumer({ groupId: "bar" });
  await consumer.connect();

  await consumer.subscribe({ topics: ["dice-roll"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

bar();