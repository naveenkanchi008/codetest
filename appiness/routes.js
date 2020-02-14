const usersCollection = "users"
const userRolesCollection = "userroles"

module.exports = function(app,db){
	app.get("/welcome",function(req,res){
		res.send({message: "Hello World!"})
	})

	// user registration
	app.post("/userRegistration",function(req,res){
		if(req.body.userName){
			// getting count of users to check whether user is first user or not
			db.count(usersCollection, {}, function(userCountErr, userCount){
				if(userCountErr){
					res.status(500).send({error: "something went wrong, while getting users count err: "+userCountErr})
				}else{
					// assigning user role based on count
					let userRole = ''
					if(userCount === 0){
						userRole = "admin"
					}else{
						userRole = req.body.userRole || "NA"
					}
					// checking user is already exists or not
					db.find(usersCollection, {userName: req.body.userName}, function(userErr, userData){
						if(userErr){
							res.status(500).send({error: "something went wrong, while getting users data err: "+userErr})
						}else if(userData.length > 0){
							res.status(400).send({error: "userName already in use"})
						}else{
							let createUser = {
								userName: req.body.userName
							}
							// create user
							db.insert(usersCollection, {userName: req.body.userName}, function(createUserErr, createuserResp){
								if(createUserErr){
									res.status(500).send({error: "something went wrong, while creating users err: "+createUserErr})
								}else{
									// create user role
									db.insert(userRolesCollection, {userName: req.body.userName, userRole: userRole}, function(createRoleErr, createRoleResp){
										if(createRoleErr){
											res.status(500).send({error: "something went wrong, while creating users role err: "+createRoleErr})
										}else{
											res.status(200).send({
												msg: "user created successfully",
												date: {
													userName: req.body.userName,
													userRole: userRole
												}
											})
										}
									})
								}
							})
						}
					})
				}
			})
		}else{
			res.status(400).send({error: "something went wrong, required parameters are missing"})
		}
	})

	//to get all users data
	app.get("/allusers",function(req,res){
		db.find(usersCollection, {}, function(err, data){
			if(err){
				res.status(500).send({error: "something went wrong, while getting users err: "+err})
			}else{
				res.status(200).send(data)
			}
		})
	})

	// to get all userRoles data
	app.get("/alluserroles",function(req,res){
		db.find(userRolesCollection, {}, function(err, data){
			if(err){
				res.status(500).send({error: "something went wrong, while getting users err: "+err})
			}else{
				res.status(200).send(data)
			}
		})
	})
}