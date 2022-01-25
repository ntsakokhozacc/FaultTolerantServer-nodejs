
const getUsers = "SELECT * FROM users ORDER BY id ASC";
const getUserById = "SELECT * FROM users WHERE id =$1"
const checkEmailExists = "SELECT * FROM users WHERE email= $1"
const addUser = "INSERT INTO users (name,email,password,dob) VALUES ($1,$2,$3,$4)";
const removeUser ="DELETE FROM users WHERE id=$1";
const updateUser ="UPDATE users SET name=$1 WHERE ID = $2"
const userLogin = "SELECT * FROM users WHERE password=$1 AND email=$2";

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    removeUser,
    updateUser,
    userLogin
};