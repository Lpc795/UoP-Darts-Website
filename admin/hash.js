import bcrypt from "bcrypt";

bcrypt.hash("password123", 10).then(hash => {
  console.log(hash);
});
