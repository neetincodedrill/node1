const http = require('http');
const fs = require('fs')

const server = http.createServer((req,res) => {
    //post method to write data and saved it locally in text file
    if(req.method === 'POST'){
        console.log('POST method')
        let body = '';
        req.on('data',(data) => {
            body += data;
            console.log('Data: '+ body)
        })
        req.on('end',() => {
            res.writeHead(200,{ 'Content-Type':'application/json'})  
            fs.appendFile('newFile.txt', "\n" + body, function() {
            res.end();
            });      
        })
    }else{
        //get method to read the saved data from local file
        console.log('GET method')
        res.writeHead(200, { 'Content-Type':'application/json'})
        fs.readFile('newFile.txt','utf8',(err,data) => {
            if(data){
                console.log(data)
            }else{
                console.log(err)
            }
        })
        res.end()      
    }
})


const port = 8000;
const host = 'localhost'
server.listen(port,host)
console.log(`Server is running at loaclhost:${port}`)