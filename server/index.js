import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const app = express()
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  }
});

app.set("io", io);

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
  credentials: true,
}));

io.on("connection", (socket) => {
  console.log("Connected: " + socket.id);

  socket.to("hskdhfkjshj").emit("user-connected", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.user.name);
    userSocketIDs.delete(user._id.toString());
  });
});



const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
