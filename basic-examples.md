# Basic Examples

## Example 1

```Javascript
var fs=require('fs')

console.log("Before Reading the file...")
data=fs.readFileSync("temp.txt")
console.log(data.toString())
console.log("after Reading the file...")
```
---

## Example 2

```javascript
var fs=require('fs')
console.log("Before Reading the file...")

data =fs.readFile("temp.txt",function(err,data){
    console.log(data.toString())
})
console.log("after Reading the file...")
```

---

## Example 3

```javascript
var fs=require('fs')
fs.watch("temp.txt",function(event,fileName){
     console.log(event)
})
console.log("Watching the file")
```

## Example 4
```Javascript
var http=require('http')

var server=http.createServer(function(req,res){
    res.end("<h1>Hello</h1>");
})

server.listen(process.env.PORT||3000)
```


>Thank You
