
const getUsers = "SELECT * from users ORDER BY id ASC";
const getUserById = "select * from users where id =$1"
const checkEmailExists = "select * from users where email= $1"

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists
};