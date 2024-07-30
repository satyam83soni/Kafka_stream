// const { kafka } = require("./client.js");



// async function init() {
//   const producer = kafka.producer();

//   console.log("Connecting Producer");
//   await producer.connect();
//   console.log("Producer Connected Successfully");
//     var sequence = 1;
    
//     setInterval(async ()=>{
//         sequence ++;
//         const a = Math.floor(Math.random() * 6) + 1;
//         await producer.send({
//             topic: "dice-roll",
//       messages: [
//         {
//           partition:1,
//           key: "dice-output",
//           value: JSON.stringify({sequence, output : a }),
//         },
//       ]
//         });
//     } , 1000);
    
    
    
//     await producer.disconnect();;
// }
// init()

const { kafka } = require("./client.js");

async function init() {
  const producer = kafka.producer();

  try {
    console.log("Connecting Producer...");
    await producer.connect();
    console.log("Producer Connected Successfully");

    let sequence = 1;

    setInterval(async () => {
      try {
        sequence++;
        const a = Math.floor(Math.random() * 6) + 1;
        await producer.send({
          topic: "dice-roll",
          messages: [
            {
              partition: 1,
              key: "dice-output",
              value: JSON.stringify({ sequence, output: a }),
            },
          ],
        });
        console.log(`Message sent successfully: ${JSON.stringify({ sequence, output: a })}`);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }, 10000);
  } catch (err) {
    console.error("Error connecting producer:", err);
  }
}

init();
