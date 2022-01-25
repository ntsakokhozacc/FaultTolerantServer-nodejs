const pool = require('../../db');
const queries = require('./queries')
//const getUser = "SELECT * from users ORDER BY id ASC";
const Pool = require('pg').Pool;


const getUsers = (req, res) => {
    pool.query(queries.getUsers,(error, results) => {
        if(this.error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        console.log("hello");
        res.status(200).json(results.rows)
    });
    console.log("debuggging");
};

const getUserById=(req,res) =>{
    const id =parseInt(req.params.id);
    pool.query(queries.getUserById,[id],(error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    } );
};


const addUser = (req,res) => {
    const {name,email,age,dob} = req.body;

    //check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        
        if (results.rows.length){
            res.send("email already exists");
        }
    });

    //add new user to db
    pool.query(queries.addUser, 
        [name, email, age, dob],
        (error,results)=>{
        if(error) throw error;
        res.status(201).send("User created successfully");
    });
};

const removeUser = (req, res) =>{
    const id =parseInt(req.params.id);

    pool.query(queries.getUserById,[id],(error, results)=>{
        const noUserfound = !results.rows.length;
        if(noUserfound){
            res.send("User does not exist in the database.");
        }

        pool.query(queries.removeUser,[id],(error, results)=>{
            if(error) throw error;
            res.status(200).send("user removed successfully");
    });
});

}



module.exports ={
    getUsers,
    getUserById,
    addUser,
    removeUser,
};