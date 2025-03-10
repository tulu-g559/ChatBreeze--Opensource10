import { router } from "./routes";
import { SocketService } from "./services/socket";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/", router);

const server = app.listen(port, () => {
  console.log(`Server is listening on port:${port}`);
});

const newServer = new SocketService();
newServer.io.attach(server);
newServer.sendMessage();
