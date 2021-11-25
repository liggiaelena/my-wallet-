import connection from "../database.js";

async function findUserByEmail(email){
    const user = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      );
      return user.rows[0];
} 

async function insertNewUser({name, email, hashedPassword}){
    await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
      );
}

export{
    findUserByEmail,
    insertNewUser,
}