
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  socketio = require('socket.io');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {

	socket.on('new:namespace', function(data) {

		io.of(data.namespace).on('connection', function(namespacesocket) {

			namespacesocket.emit('broadcast:player', {playerIndex : io.of(data.namespace).clients().length - 1});

			namespacesocket.on('event:touch', function(data) {
				console.log('DID TOUCH');
				namespacesocket.broadcast.emit('broadcast:touch', data);
			});
		});
	});
});




