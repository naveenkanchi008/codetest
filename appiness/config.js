var config = {
	cluster : false,
	https : false,
	serverPort : 5005,
	mongoAuth: false,			// if your mongo has authentication please give values as true
	mongoDbHost: "localhost",	// MongoDB host
	mongoDbPort: "27017",		// MongoDB port
	mongoDbName: "testdb",		// Database name
	mongodbUser: "testdb",		// MongoDB userName
	mongodbPwd : "test#123"		// MongoDB password
}

module.exports = config