import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import bar from './kafka/barConsumer.js';
import line from './kafka/lineConsumer.js';
import { connectDB } from './utils/features.js';
import 'dotenv/config'

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  }
});

connectDB(process.env.MONGO_URL);

app.set("io", io);

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
  credentials: true,
}));

io.on("connection", (socket) => {
  console.log("Connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.id);

  });
});

bar().catch(console.error);
// line().catch(console.error);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export { io };