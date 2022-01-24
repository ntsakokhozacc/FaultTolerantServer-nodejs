const {Router} = require('express');
const controller = require('./controller')

const router = Router();

router.get('/',(req,res)=>{
    controller.getUsers
    // res.send('using api route');
});

module.exports= router;