const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const http = require("http");

const { Server } =
require("socket.io");

// Routes
const authRoutes =
require("./routes/authRoutes");

const productRoutes =
require("./routes/productRoutes");

const orderRoutes =
require("./routes/orderRoutes");

dotenv.config();

const app = express();

// Create HTTP Server
const server =
http.createServer(app);

// Socket.io Setup
const io = new Server(server, {

  cors: {
    origin:
      "http://localhost:5173",
  },

});

// Socket Connection
io.on("connection", (socket) => {

  console.log(
    "User Connected"
  );

  socket.on(
    "disconnect",

    () => {

      console.log(
        "User Disconnected"
      );
    }
  );
});

// Middleware
app.use(cors());

app.use(express.json());

// Static Uploads
app.use(
  "/uploads",
  express.static("uploads")
);

// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

// MongoDB Connection
mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((err) => {

  console.log(err);

});

// Port
const PORT =
process.env.PORT || 5000;

// Start Server
server.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});

// Export Socket.io
module.exports = { io };