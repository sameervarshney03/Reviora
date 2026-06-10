
// Utility function to handle the login

const login = async ({emailId , password, setIsAuthenticated, navigate, setIsLoginSuccessful, setErrorMessage, setIsLoading}) => {

  try{

    if(!emailId || !password){
        if(setIsLoginSuccessful){
            setIsLoginSuccessful(false);
        }
        if(setErrorMessage){
            setErrorMessage("EmailId or password cannot be empty!");
        }
        if(setIsLoading){
            setIsLoading(false);
        }
        return;
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
        if(setIsLoginSuccessful){
            setIsLoginSuccessful(false);
        }
        if(setErrorMessage){
            setErrorMessage("Invalid Credentials!");
        }
        if(setIsLoading){
            setIsLoading(false);
        }

        return;
    }

    if(setIsLoginSuccessful){
        setIsLoginSuccessful(true);
    }
    
    setIsAuthenticated(true);
    if(setIsLoading){
        setIsLoading(false);
    }
    
    navigate("/");

  }  

  catch(err){
        console.log(err.message);
        if(setIsLoginSuccessful){
            setIsLoginSuccessful(false);
        }
        if(setErrorMessage){
            setErrorMessage("Unable to connect to the network!");
        }
        if(setIsLoading){
            setIsLoading(false);
        }
  }

}


export default login;