const res = require('express/lib/response');
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

module.exports ={
    getUsers,
};