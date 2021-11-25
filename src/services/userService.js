import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js"

function verifyBody({name, email, password}){
    if(!name || !email || !password){
        return null
    }
    return true
}

async function alredyExistEmail(email){
    const existingUserWithGivenEmail = await userRepository.findUserByEmail(email)

    if (existingUserWithGivenEmail) return existingUserWithGivenEmail

    return false
}

async function creatUser({name, email, password}){
  const hashedPassword = bcrypt.hashSync(password, 12);

    await userRepository.insertNewUser({name, email, hashedPassword});
}

function verifyBodySingIn({email, password}){
    if(!email || !password) return false
    return true
  }
  
  function creatToken(user){
    const token = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET);
      return token
  }

export{
    verifyBody,
    alredyExistEmail,
    creatUser,
    verifyBodySingIn,
    creatToken,
}
