import jwt from "jsonwebtoken";
import * as financeService from "../services/financeService.js"
import connection from "../database.js";

async function postFinanceEventes (req, res){
    try {
      const authorization = req.headers.authorization || "";
      const token = authorization.split('Bearer ')[1];
  
      if (!token) {
        return res.sendStatus(401);
      }
  
      let user;
  
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        return res.sendStatus(401);
      }
  
      const { value, type } = req.body;
  
      if (!value || !type) {
        return res.sendStatus(400);
      }
  
      const sucess = await financeService.insertFinance({user, value, type})
      if (!sucess) {
        return res.sendStatus(400);
      }
     
  
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

async function getFinanceEvents (req, res){
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split('Bearer ')[1];
    
        if (!token) {
          return res.sendStatus(401);
        }
    
        let user;
    
        try {
          user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
          return res.sendStatus(401);
        }
    
        const financialEvents = await financeService.getFinance(user);
    
        res.send(financialEvents);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

async function getFinanceSum(req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split('Bearer ')[1];
      
        if (!token) {
          return res.sendStatus(401);
        }
      
        let user;
      
        try {
          user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.sendStatus(401);
        }
     
        const sum = await financeService.getFinanceSum(user)
        
        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

  export{
    postFinanceEventes,
    getFinanceEvents,
    getFinanceSum
  }

 
