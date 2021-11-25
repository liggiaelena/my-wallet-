import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../database.js";
import * as financeRepository from "../repositories/financeRepository.js"

async function insertFinance({user, value, type}){
    if (!["INCOME", "OUTCOME"].includes(type)) {
        return 0;
      }
    
      if (value < 0) {
        return 0;
      }
    
      await financeRepository.insertFinance({user, value, type,});

      return true;
  }

async function getFinance(user){
    const transactions = await financeRepository.getFinance(user)
    return transactions;
}

async function getFinanceSum(user){
    const events = await financeRepository.getFinance(user)
  
      const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
  return sum
}

  export{
    insertFinance,
    getFinance,
    getFinanceSum,
  }