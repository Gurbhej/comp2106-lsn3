/**
 * Created by GURBHEJ GILL on 1/25/2017.
 */


// link to the connect package
let connect = require('connect');
let url = require('url');
let accounting = require('accounting');

//create a new connect object
let app = connect();


//hello "page"
let hello = function(req, res, next) {
  res.end('Hellooo');
};

//goodbye "page"
let goodbye = function(req, res, next) {
    res.end('Goodbyeeeeee');
};

//index "page"
let index = function(req, res, next) {
    res.end('This is the home page');
};

//tax calculator page
let tax =function(req, res, next) {

    //get the full querystring ?amount=1000
    let qs = url.parse(req.url, true).query;

    //get the amount value from the querysting
    let amount = qs.amount;

    //calculate hst and total
    let hst = amount * .13;
    let total = parseFloat(hst) + parseFloat(amount);

    //display all
    res.end('<h1>Tax calculator</h1> <br> ' +
            'Amount: ' + accounting.formatMoney(amount) + '<br />' +
            'HST: ' + accounting.formatMoney(hst) + '<br />' +
            'Total: ' + accounting.formatMoney(total));
};


// let err404 = function(req, res, next) {
//     res.writeHead(404);
//     res.end('404 Not Found');
// }


//JSON API
let api = function(req, res, next) {
    let person = JSON.stringify({
        "name": "Ralph",
        "age" : 34,
        "citizen" : "India",
    });

    //set response type as json than text or html
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(person);
};


//map the url's to the correct virtual pages
app.use('/hello', hello);
app.use('/goodbye', goodbye);
app.use('/tax', tax);
app.use('/api', api);
app.use('/', index);
// app.use('');

//start the connect http server
let port = process.env.PORT || 3000;
app.listen(port);
console.log('Connect server running on port 3000');
