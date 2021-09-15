import { loginService, registerService } from "../services/terminalUser.service";

export const handleRegister=async(req:any,res:any)=>{
	try{
		var user=await registerService(req.body.username, req.body.password);
		res.status(200).send('registered successfully');
	}
	catch(err){
		console.log(err);
		res.status(500).send('username already exists. please choose another.');
	}
}

export const handleLogin = async(req:any, res:any)=>{
	try{
		var user=await loginService(req.body.username, req.body.password);
		res.status(200).send('logged in successfully.')
	}
	catch(err){
		res.status(500).send(err);
	}
}