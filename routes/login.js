	var ejs = require("ejs");
	var mongoose = require('mongoose');
	var nodemailer = require('nodemailer');
  var mysql = require('mysql');
  var PythonShell = require('python-shell');
  var dbconn =  mysql.createConnection({
    host     : 'stock.cw00442k8hty.us-east-2.rds.amazonaws.com',
    user     : 'master',
    password : 'master123',
    database : 'innodb',
    port   : 3306
    });
  dbconn.connect(function(err){
    if(err){
      console.log('Database connection error');
    }else{
      console.log(' MySQL Database connection successful');
    }
  });
	

	mongoose.connect('mongodb://localhost/stock-market')
	.then(() => {
	    console.log(" MongoDB Successfully connected to the database");    
	}).catch(err => {
	    console.log('Could not connect to the database. Exiting now...');
	});
	mongoose.Promise = global.Promise;


	var user = mongoose.Schema({
		firstName: String,
		lastName: String,
		email: String,
		password: String,
		phoneNumber: String
	});
	var registerModel = mongoose.model("registerModel", user);

	exports.login = function(req, res){
		     res.render('login',{});
		 
  };

  exports.logout = function(req,res)
	{
		req.session.destroy();
		res.redirect('/');
	};

  exports.userhome = function(req, res){
  	var email=req.param('email');
  	var password=req.param('password');
  	console.log(email);
  	var firstName = null;
  	var sendObj={
  		status:null
  	}
    console.log(email);
  	registerModel.find({ email: email }, function (err,records) {
  		if(err){
  			console.log("error in login");
  			sendObj.status=202;
  			res.send(sendObj);
  			//throw err;

  		}
  		else{
  			if(password == records[0].password){
	  			console.log("ok");
	  			console.log(records);
	  			console.log(records[0].firstName);
	  			firstName=records[0].firstName;
	  			req.session.firstName=firstName;
	  			req.session.lastName=records[0].lastName;	
	  			req.session.email=records[0].email;
	  			sendObj.status=200;
	  			res.send(sendObj);
	  			res.render('userhome',{firstName:req.session.firstName,"lastName":req.session.lastName,"email":req.session.email});
  			}
  			else{
				console.log("Passwords not matching");
				sendObj.status=201;
				res.send(sendObj);
  			}
  		}

  	});

	
		 
  };

  exports.registerUser = function(req,res){
  	var firstName=req.param('firstName');
    req.session.firstName=firstName;
  	var lastName=req.param('lastName');
    req.session.lastName=lastName;
  	var email=req.param('email');
  	var password=req.param('password');
  	var phoneNumber=req.param('phoneNumber');
  	var sendObj={
  		status:null
  	}
  	console.log('email:'+email);
  	registerModel.find({ email: email }, function (err,records) {
  		console.log("R:"+records);
  		if(err){
  			console.log("error in login");
  			throw err;

  		}
  		else if(records.length>0){
			console.log("records="+records);
			console.log('User already exists');
			sendObj.status=201;
			res.send(sendObj);
		}
  		else{
  		  console.log(records);	
  		  var sign = new registerModel();
        sign.password = password;
        sign.email = email;
        sign.firstName = firstName;
        sign.lastName = lastName;
    	  sign.phoneNumber=phoneNumber;
        sign.save(function(err) {
          if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
          }
          nodemailer.createTestAccount((err, account) => {
    var transporter = nodemailer.createTransport({
	 service: 'gmail',
	 secure:false,
	 auth: {
	        user: 'stockmarketanalysis11111@gmail.com',
	        pass: 'stockmarket'
	    }
	});
    var mailOptions = {
        from: '"Stock Market Analysis Team" <stockmarketanalysis@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello from Stock Market Analysis Team', // Subject line
        text: 'Thank you for registering with us!', // plain text body
        html: '<b>Thank you for registering with us!</b>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});	
          sendObj.status=200;
		      res.send(sendObj);
          res.render('userhome',{"firstName":req.session.firstName,"lastName":req.session.lastName});
          console.log('User inserted');
        });	
  		}
  	});

  };


  exports.registerUserGet = function(req,res){
  	res.render('userhome',{"firstName":req.session.firstName,"lastName":req.session.lastName});
  };

  exports.userhomeGet = function(req,res){
  	res.render('userhome',{"firstName":req.session.firstName,"lastName":req.session.lastName});
  };
  exports.signup = function(req,res){
	res.render('signup',{});
  };

  exports.sectoranalysis = function(req,res){
  res.render('sectoranalysis',{"firstName":req.session.firstName,"lastName":req.session.lastName});
  };

  exports.yearanalysis = function(req,res){
  res.render('yearanalysis',{"firstName":req.session.firstName,"lastName":req.session.lastName});
  };

  exports.userprofile = function(req,res)
	{
		registerModel.find({ email: req.session.email }, function (err,records) {
  		if(err){
  			console.log("error in user");
  			throw err;

  		}
  		else{	
  				var firstName=records[0].firstName;
  				var lastName=records[0].lastName;
  				var email=records[0].email;
  				var phoneNumber=records[0].phoneNumber;
	  			res.render('userprofile',{firstName:req.session.firstName,lastName:req.session.lastName,email:email,phoneNumber:phoneNumber});
  			}
  			
  		});
	};

  exports.companyanalysis = function(req,res){
        res.render('companyanalysis',{"firstName":req.session.firstName,"lastName":req.session.lastName});
        
  };

  exports.company = function(req,res){
    var sendObj={
      status:null,
      companies:null
    }
    var sql = "select * from company;";
    dbconn.query(sql, function (err, records) {
      if (err) {
        throw err;
      }
      else{
        console.log(records);
        sendObj.status=200;
        sendObj.companies=records;
        //res.render('companyanalysis',{"firstName":req.session.firstName,"lastName":req.session.lastName,"companies":records});
        res.send(sendObj);
        }
      
    });
  };


  exports.technicalanalysis = function(req,res){
    var company=req.param('Company');
    console.log('company:'+company);
    var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: '/Users/prabhutej/Downloads/stock-market/public/python',
      args: [company]
    };
      console.log('inside technical analysis');
      PythonShell.run('prediction.py', options, function (err, results) {
      console.log('before script1');  
      if (err){
        console.log('ERR:'+err);
       //throw err;

     }
      console.log('Python script1 executed');
        PythonShell.run('monte-carlo.py', options, function (err, results) {
        if (err) throw err;
        console.log('Python script2 executed');

         PythonShell.run('risk.py', options, function (err, results) {
          if (err) throw err;
          console.log('Python script3 executed');
          console.log("res:"+results);
          res.send("done");
         });

      });

      });
      
     };


 exports.prediction = function(req,res){
        res.render('technicalanalysis',{"firstName":req.session.firstName,"lastName":req.session.lastName});
        
  };
  	
