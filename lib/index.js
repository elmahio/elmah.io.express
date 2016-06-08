var request = require("request");

var site = "https://elmah.io/api/v2/messages"

exports.auto = function(option) {
	function parseCookies (request) {
		var list = [],
			rc = request.headers.cookie;

		rc && rc.split(';').forEach(function( cookie,index ) {
			var parts = cookie.split('=');
			list[index] = {key:parts.shift().trim(),value:decodeURI(parts.join('='))};
		});

		return list;
	}
	function parseData(data) {
		var list = [],
			i = 0;
		for(var key in data){
			list[i] = {key:key,value:data[key]}
			i++;
		}
		return list
	}
	function parse(data) {
		var list = [],
			i = 0;
		for(var key in data){
			list[i] = {key:key,value:data[key]}
			i++;
		}
		return list
	}
	return function autosend(err,req,res,next) {
		var cookie = parseCookies(req);
		var form = parseData(req.body);
		var queryString = parseData(req.query);
		var serverVariables = parseData({port:req.socket.address().port.toString()});
		var severity = "Error";
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		var obj = {
			title: err.message || "Express Error",
			source: null,
			application: option.application || null,
			detail: ""+err.stack+"" || null,
			hostname: req.get('host') || null,
			cookies: cookie || null,
			data: null,
			form: form || null,
			queryString: queryString || null,
			serverVariables: serverVariables,
			statusCode: err.status || null,
			severity: severity || null,
			type: "Error",
			url: fullUrl || null,
			user: null,
			version: option.version || null
		};
		var conf = {
			url: site,
			qs: {logid:option.logId},
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: obj
		}
		sendError(conf);
		next();
	}

}

function sendError(conf) {
	request(conf, function (error, response, body) {
	});
}