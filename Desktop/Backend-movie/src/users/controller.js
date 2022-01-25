const bcrypt = require('bcryptjs');
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
        res.status(200).json(results.rows)
    });
};

const getUserById=(req,res) =>{
    const id =parseInt(req.params.id);


    pool.query(queries.getUserById,[id],(error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    } );
};


const addUser = async (req,res) => {
    const {name,email,password,dob} = req.body;

    //check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        
        if (results.rows.length){
            res.send("email already exists");
        }
    });

    //add new user to db
    const salt=await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    console.log(passwordHash);

    pool.query(queries.addUser, 
        [name, email, passwordHash, dob],
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

const updateUser = (req,res) =>{
    const id = parseInt(req.params.id);
    const {name } = req.body;

    pool.query(queries.getUserById,[id],(error, results)=>{
        const noUserfound = !results.rows.length;
        if(noUserfound){
            res.send("User does not exist in the database.");
        }

        pool.query(queries.updateUser,[name,id],(error,results) =>{
            if (error) throw error;
            res.status(200).send("User updated successfully")
        })
    });
    
}

const userLogin =(req,res) =>{
    const {email} = req.body;
    const {password} = req.body;
   
    
    
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (!results.rows.length){
            res.status(404).send("email does not exist in the database");
        }

        pool.query(queries.getPasswordByEmail,[email],(error,results)=>{
            const queryPassword= bcrypt.compareSync(password, results.rows[0].password);
            if(!queryPassword){
                res.send("Invalid password");
            }
            res.status(200).json(results.rows);
            console.log(queryPassword)
            //console.log(results)
        });
        

        
    });
    
}


module.exports ={
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,
    userLogin,
};