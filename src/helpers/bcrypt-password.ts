import * as bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = (password?: string) => {
  const data = bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error occurred while hashing password:", err);
      return;
    }
    console.log("Hashed password:", hash);
    return hash;
  });
  return data;
};

const decodePassword = (plainPassword?: string, hashedPassword?: string) => {
  const checkPassword = bcrypt.compare(
    plainPassword,
    hashedPassword,
    (err, result) => {
      if (err) {
        console.error("Error occurred while comparing passwords:", err);
        return;
      }
      if (result) {
        return "Mật khẩu chính xác";
      } else {
        return "Mật khẩu không đúng!";
      }
    }
  );
  return checkPassword;
};

export { hashPassword, decodePassword };
