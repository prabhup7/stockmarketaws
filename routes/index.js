
/*
 * GET home page.
 */

	var ejs = require("ejs");
	var mysql = require('mysql');
exports.index = function(req, res){
		    //res.json(result);
		     res.render('index',{});
		  };



						


