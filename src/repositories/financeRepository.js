import connection from "../database.js";

async function insertFinance({user, value, type}){
    await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [user.id, value, type]
      );
}

async function getFinance(user){
    const transactions = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [user.id]
      );
        return transactions.rows;
}


export{
    insertFinance,
    getFinance
}