# Node.js API Help Notes
## Step 1 
Install node.js in your system. 
## Step 2
Initialize node using
```sh
npm init
```
## Step 3
Download express package using following command. 
```sh
npm install --save express
```
## Step 4
Create app.js file and write following javascript code.
```javascript
var express=reuire('express');

var app=express();
var port = process.env.PORT || 3000;

app.get('/',function(req,res){
    res.send("welcome to my api");
});

app.listen(port,function(){
    console.log("Running on PORT: "+port)
});
```
## Step 5 

Write the following code in this 

 
