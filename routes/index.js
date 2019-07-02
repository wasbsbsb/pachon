var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/nightmare', function(req, res, next){
  let Nightmare =require('nightmare')
  const nightmare = Nightmare({ show: true })
  let {goto, ruleArray,GetNum,IsReturnArray,IsPhone,delay}=req.body;
  ruleArray=JSON.parse(ruleArray)
  if(IsReturnArray==='true'){
    let height=5000;
    if(IsPhone==='true'){nightmare.viewport(320,568)}
    nightmare
        .goto(goto)
        .wait(3000)
        .wait(height=>{
          let evs=setInterval(function () {
            window.scrollTo(0,document.documentElement.scrollTop+1)
          }.bind(this),10)
          return document.documentElement.scrollTop>height;
        },delay)
        .wait(2000)
        .evaluate(ruleArray => {
          let array=[]
          ruleArray.forEach(function (items) {
            let app=document.querySelectorAll(items.rule)
            let arr=[]
            Array.from(app).forEach(function (item) {
              if(items.type=='src'){
                // arr.push(item.src)
                arr.push(item.getAttribute("mb-src"))
              }
              else {
                arr.push(item.innerText)
              }
            })
            array.push(arr)
          })
          let num=array[0].length
          let data = [];
          for (var s = 0; s < num; s++) {
            let obj={};
            ruleArray.forEach(function (item,index) {
              obj[item.name]=array[index][s]
            }.bind(this))
            data.push(obj)
          }
          return   data;
        },ruleArray)
        .end()
        .then(function (result) {
          res.json(result);
        })
        .catch(error => {
          console.error('Search failed:', error)
        })
  }
  else
  {
    if(IsPhone==='true') {nightmare.viewport(320,568)}
    nightmare
        .goto(goto)
        .wait(height=>{
          let evs=setInterval(function () {
            window.scrollTo(0,document.documentElement.scrollTop+1)
          }.bind(this),10)
          return document.documentElement.scrollTop>height;
        },delay)
        .wait(2000)
        .evaluate(ruleArray => {
          let array=[]
          ruleArray.forEach(function (items) {
            let app=document.querySelectorAll(items.rule)
            let arr=[]
            Array.from(app).forEach(function (item) {
              if(items.type=='src'){
                arr.push(item.src)
              }
              else {
                arr.push(item.innerText)
              }
            })
            array.push(arr)
          })
          return   array;
        },ruleArray)
        .end()
        .then(function (result) {
          res.json(result);
        })
        .catch(error => {
          console.error('Search failed:', error)
        })
  }

});


module.exports = router;
