const login = async (emailId , password, setIsAuthenticated, navigate, setIsLoginSuccessful) => {

  try{

    if(!emailId || !password){
        setIsLoginSuccessful(false);
        throw new Error("Email and password cannot be empty!");
    }

    console.log(process.env.LOGIN_API);
    const res = await fetch(process.env.LOGIN_API,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailId,
                password
            })
        }
    );

    if(!res.ok){
        throw new Error("Invalid credentials!");
    }

    if(setIsLoginSuccessful){
        setIsLoginSuccessful(true);
    }
    
    setIsAuthenticated(true);
    navigate("/");

  }  

  catch(err){
        console.log(err.message);
        if(setIsLoginSuccessful){
            setIsLoginSuccessful(false);
        }
  }

}


export default login;