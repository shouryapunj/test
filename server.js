import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './template';
//import topics1 from './topics1.json';
import request from 'request';

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {

// var x = req.url + "?pageSize=4";
//var y = "https://api.myjson.com/bins/15rw33";
//var y = req.query;
//console.log()
//var x = JSON.stringify(req.query);
var x = req.query;
console.log(x);
//var y = x.Name;
//var y = JSON.stringify(x);
//var z = x + y;
//console.log(x);
//console.log(x);
var uri = "https://cipherapi.ofbusiness.com/api/tender/tenders?pageSize=100&query=";
var y = "pageSize=10";
//console.log(req.query);


  if (req.query.query) {
    uri += req.query.query;
  }
  // else{
  // uri += y;
  // }


console.log('URL', uri);
request({
 //uri: "https://api.myjson.com/bins/15rw33" + x,
 uri: uri,
 method: "GET",
 timeout: 10000,
}, function(error,response,body){
 body = JSON.parse(body);
//console.log(body);

 const isMobile = true;
//console.log(body);
var content = [];
if (body.data) {
content = body.data.content;
}
 const initialState = { isMobile, topics: content }; 
 const appString = renderToString(<App {...initialState} />);
//console.log(body.data);
//console.log(body.data.content);
 res.send(template({
 body: appString,
 title: 'Pagination',
 initialState: JSON.stringify(initialState)
}));
console.log(res.data);
});
})


server.listen(8080);
console.log('listening');
//var x = window.location.hostname();
//console.log(x);