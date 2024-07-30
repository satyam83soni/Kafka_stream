const {Kafka} =  require("kafkajs")
exports.kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
