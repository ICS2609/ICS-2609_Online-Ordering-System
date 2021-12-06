const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const app = express();

const con = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "foodorder",
    timezone: 'Z'
});

app.set('view engine', 'ejs')
.use(express.static('admin'));

router

.get('/', (req, res)=>{
    let sql = 'SELECT * FROM orders ORDER BY order_id DESC';
    con.query(sql, (err, result)=>{
        if(!err){
            res.render(process.cwd() + '/admin/pages/orders', {data: result});
        }
        else{
            res.status(404).send('404 PAGE NOT FOUND');
        }
    })
})

.get('/delOrders', (req, res)=>{
    let sql = 'SELECT * FROM orders';
    con.query(sql, (err, result)=>{
        if(!err){
            res.render(process.cwd()  + '/admin/pages/delOrders', {data: result});
        }
        else{
            res.status(404).send('404 PAGE NOT FOUND');
        }
    })
})

.post("/delProducts/del-data",(req,res)=>{
    let id = req.body.foodID,
    orderid = req.body.oID,
    fname = req.body.fName,
    lname = req.body.lName,
    date = req.body.date;
    let sql = "DELETE FROM foodorder.products WHERE food_id=" + id + 
    ", order_id=" + orderid +
    ", customer_FName=" + fname +
    ", customer_LName=" + lname +
    ", order_date="+ date;
    con.query(sql, (err,result) => {
        if(!err){
            res.redirect('/p');
        }
        else{
            res.status(404).send('Query error PLease go back and try again...');
        }
    })
});
module.exports = router;