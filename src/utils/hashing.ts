import bcrypt from "bcrypt";

export function hashPassword(plainPassword: string) {
  let saltRounds = Number(process.env.SALT_ROUNDS);
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash;
  } catch (error) {
    console.error(error);
  }
}

export function verifyPassword(
  enteredPassword: string,
  hashedPassword: string
) {
  try {
    const result = bcrypt.compareSync(enteredPassword, hashedPassword);
    return result;
  } catch (error) {
    console.error(error);
  }
}
