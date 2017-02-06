var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


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

app.get('/:articleName',function (req, res)
 {//articleName=article-one
 //articles[articleName]=={}   content object for article one
 var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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
