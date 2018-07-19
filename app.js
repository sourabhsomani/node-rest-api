var express=require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser')

var db =mongoose.connect("mongodb://localhost/bookAPI");//Connecting to the mongodb
var Book =require('./models/bookModel')//Adding book model

var app=express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter=express.Router();
bookRouter.route('/Books')
    .post(function(req,res){
        var book=new Book(req.body);
        book.save();
        res.status(201).send(book);
    })
    .get(function(req,res){
        
        var query=req.query;//For getting the data using query string

        Book.find(query,function(err,books){
            if(err){
                res.status(500).send(err);
            }
            res.json(books)//res.render when you want to render html
        })
    });

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

app.use('/api',bookRouter);

app.get('/',function(req,res){
    res.send("welcome to my api");
});

app.listen(port,function(){
    console.log("Running on PORT: "+port)
});