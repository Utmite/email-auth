import cors from "cors";
import "dotenv/config";
import express from "express";
import register from "./routes/auth/auth.system.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", register);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Estamos al aire :) en: " + process.env.SERVER_PORT)
});