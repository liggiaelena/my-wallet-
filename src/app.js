import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userControllers from './controllers/userControllers.js';
import * as financeControllers from './controllers/financeControllers.js';
import connection from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userControllers.postSingUp);

app.post("/sign-in",userControllers.postSingIn);

app.post("/financial-events", financeControllers.postFinanceEventes);

app.get("/financial-events", financeControllers.getFinanceEvents);

app.get("/financial-events/sum", financeControllers.getFinanceSum);

export default app;
