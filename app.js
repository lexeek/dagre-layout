/**
 * Created with JetBrains WebStorm.
 * User: tikhonov
 * Date: 9/10/13
 * Time: 9:18 PM
 * To change this template use File | Settings | File Templates.
 */


var application_root = __dirname,
    path = require('path'),
    express = require('express');


var app = express();



app.configure(function () {
//    app.set('views', __dirname + '/views');
    app.use(express.logger());
    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    //parses request body and populates request.body
    app.use(express.bodyParser());
    app.use(express.session({secret: "laksdfjalsdkjflsakjdf"}));
        app.use(app.router);
    //Where to serve static content
    app.use(express.static(path.join(application_root, './src')));
//    //Show all errors in development
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});


app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/jsplumbchar', function(req,res) {
    res.sendfile('./src/jsPlumbChar.html');
})

var port = 8080;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});


