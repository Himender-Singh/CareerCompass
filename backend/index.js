import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import taskRoute from "./routes/task.route.js";
import chatRoute from "./routes/chat.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Connect to the database
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ["http://localhost:5173", process.env.URL],
    credentials: true
};
app.use(cors(corsOptions));
console.log(__dirname);

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/chat", chatRoute);

app.use(express.static(path.join(__dirname , "/Frontend/dist")));
app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"));
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
