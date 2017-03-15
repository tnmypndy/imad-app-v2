var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


var articles = {
 'article-one' : {
    title:'ARTICLE ONE',
    heading: 'Article one',
    date: ' feb 7, 2017',
    content: `<p>
               This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page. 
           </p>  
            <p>
               This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page. 
           </p> 
            <p>
               This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page. 
           </p> 
            <p>
               This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page. 
           </p> `
},
 'article-two' : {
     title:'ARTICLE TWO',
    heading: 'Article two',
    date: ' feb 10, 2017',
    content: `<p>
               This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page. 
           </p>  
           `},
 'article-three' : { 
     title:'ARTICLE THREE',
    heading: 'Article three',
    date: ' feb 15, 2017',
    content: `<p>
               This is the content for my third web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page.This is the content for my second web page. 
           </p>  
           `} 
};
function createTemplate (data)
{
 var title = data.title;
 var date = data.date;
 var heading = data.heading;
 var content = data.content;
 
var htmlTemplate = `
<html>
 <head>
     <title>
         ${title}
     </title>
      <link href="/ui/style.css" rel="stylesheet" />
 </head>    
 <body>
     <div class="container">
      <hr/>
        <h2>
            ${heading}
        </h2>
        <div>
            ${date}
        </div>
        <div>
          ${content}
        </div> 
     </div>
 </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function(req, res) {
counter=counter+1;
res.send(counter.toString());
});

app.get('/:articleName',function (req, res)
 {//articleName=article-one
 //articles[articleName]=={}   content object for article one
 var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});
function hash (input, salt)
{
    //how do  we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    //return hashed.toString('hex');
    return ['pbkdf2', "10000", salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function (req, res){
var hashedString = hash(req.params.input, 'this-is-some-random-string');
res.send(hashedString);
});

app.post('/create-user', function (req, res){
    //username, password 
    //{"username": "tanmay", "password": "password"}
    //JSON
    //
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(passowrd, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('User successfully created: ' + username );
        }
    });
});
app.get('/articletwo',function (req, res)
{
 res.sendFile(path.join(__dirname, 'ui', 'article-2.html'));   
});
app.get('/articlethree',function (req, res)
{
 res.sendFile(path.join(__dirname, 'ui', 'article-3.html'));   
});

app.get('/articlethree',function (req, res)
{
 res.send('Article three served here will be served here');   
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
