# Node.js API Help Notes

---
Setting up the project
---
---

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
var express=require('express');

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
Now set start script in **package.json** file. How to, check following line.
```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"node app"
  }
```
## Step 6
Now you can run your project using following command.
```sh
npm start
```

> This is very tedious to start and stop the server, So we are going to use **gulp** for restarting the server after some changes.

## Step 7
Setting up gulp. here we are installing gulp two times
**Local installation**
```sh
npm install --save gulp
```
**Global Installation**
Actually I want to access gulp command from the command prompt so I have to install gulp globally.
```sh
npm install -g gulp
```
## Step 8

Whenever we run gulp it looks for **gulpfile.js** file. So I am going to create that file. And in this file we will write following code.
```javascript
var gulp=require('gulp');
```

## Step 9
Actually gulp is just a task runner. So we are not implementing gulp anymore right now. We have one plugin which can solve our problem for now. That is **gulp-nodemon**. So I am going to install **gulp-nodemon**.
```sh
npm install --save gulp-nodemon
```

## Step 10
Write following lines in gulpfile.js
```javascript
var gulp=require('gulp'),
    nodemon=require('gulp-nodemon');

gulp.task('default',function(){
    nodemon({
        script:'app.js',//Which file you want to run
        ext:'js',//When you want to restart server. For other files when you are going to create website then you can use like eg:(ext:'js html css font')
        env:{
            PORT:'8000'
        },
        ignore:['./node_module/**']
    }).on('restart',function(){
        console.log("Server is restarted...")
    });
})
```

## Step 11
Now just type gulp in the terminal.

---
Getting Data
---
---
## Step 1
Add the following code for simple getting the data. With routing

```javascript
var bookRouter=express.Router();
bookRouter.route('/Books')
    .get(function(req,res){
        var responseJson={hello:'Hello this is my api'}
        res.json(responseJson)//res.render when you want to render html
    });
app.use('/api',bookRouter);
```
## Step 2
Working with MongoDB. You have to follow the following steps to setup the mongodb in your machine
- [Download Mongodb from here](https://www.mongodb.com/download-center#atlas).
- setting up mongodb using this [article](https://www.c-sharpcorner.com/article/building-web-applications-using-node-js-part-four/)

## Step 3
Now we need to download a library mongoose. This is used to connect mongodb.
```sh
npm install --save mongoose
```

## Step 4
Add following code
```javascript
mongoose=require('mongoose');

var db =mongoose.connect("mongodb://localhost/bookAPI");//Connecting to the mongodb
var Book =require('./models/bookModel')//Adding book model
```
## Step 5
Now we have to cerate the model. For that I am creating a folder **"/models"**. Now insise this I am creating a file **bookModel.js** Where I am writing following code.
```Javascript
var mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var bookModel=new Schema({
    title:{type:String},
    author:{type:String},
    genre:{type:String},
    read:{type:Boolean,default:false}
});
module.exports=mongoose.model('Book',bookModel);
```
## Step 6
Now You have to update following code.
```Javascript
bookRouter.route('/Books')
    .get(function(req,res){
        Book.find(function(err,books){
            if(err){
                console.log(err);
            }
            res.json(books)//res.render when you want to render html
        })
    });
```
## Step 7
Now we are going to insert some data into database.
```javascript
db.books.insert({ "title":"Javascript", "author":"Douglous Crookford", "genre":"Programming", "read":false })
db.books.insert({ "title":"Python", "author":"Mark Lutz", "genre":"programming", "read":false })
```
## Step 8
Now just refresh the page and you will get data.

## Step 9 
If you want to get data with the query string you can just change the following line of code
```javascript
var query=req.query;//For getting the data using query string
Book.find(query,function(err,books){
    if(err){
        res.status(500).send(err);
    }
    res.json(books)//res.render when you want to render html
})
```

## Step 10
Now just refresh the page and request with the query string.

## Step 11
Getting the single item
```javascript
//Getting Single Item
bookRouter.route('/Books/:bookId')
    .get(function(req,res){
        Book.findById(req.params.bookId,function(err,book){
            if(err){
                res.status(500).send(err);
            }
            res.json(book)//res.render when you want to render html
        })
    });
```

---
Posting Data
---
---
## Step 1
First download **body-parser**
```sh
npm install --save body-parser
```
## Step 2
Include the reference of body-parser
```javascript
bodyParser=require('body-parser')
```

## Step 3
Adding 2 Middlewares
```javascript
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
```
## Step 4
Add post call
```javascript
bookRouter.route('/Books')
    .post(function(req,res){
        var book=new Book(req.body);
        console.log(book)
        res.send(book)
    })
```
## Step 5
For post call you can use postman. So I am using postman.

## Step 6
Now finally we are going to save the data. In the post call we have to call **save** function
```javascript
book.save();
res.status(201).send(book);
```

---
Enabling Cors
---
---
```javascript
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```
