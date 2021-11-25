import * as userService from "../services/userService.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../database.js";

async function postSingUp (req, res) {
    try {
      const { name, email, password } = req.body;

      const verify = userService.verifyBody({name, email, password})
      if (!verify) {
        return res.sendStatus(400);
      }
  
      const emailExist = await userService.alredyExistEmail(email);
      if (emailExist) {
        return res.sendStatus(409);
      }
      
      await userService.creatUser({name, email, password});
  
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

async function postSingIn (req, res) {
    try {
      const { email, password } = req.body;

      const verify = userService.verifyBodySingIn({email, password})
  
      if (!verify) {
        return res.sendStatus(400);
      }
  

    const user = await userService.alredyExistEmail(email);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.sendStatus(401);
      }

  
      const token = userService.creatToken(user)
  
      res.send({
        token
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async function insertFinance({user, value, type}){
    await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [user.id, value, type]
      );
  }

  export{
      postSingUp,
      postSingIn,
  }




