import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  try {
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(`There was an error hashing the password. Error: ${error}`);
  }
}

export async function compareHashed(passwordInput: string, hashed: string) {
  const hashedPassword = bcrypt.compareSync(passwordInput, hashed);
  return hashedPassword;
}
