import login from "./login";

// Utility function to handle the signup

const signup = async ({firstName, lastName, emailId, password, rePassword, setIsAuthenticated, navigate, setIsMessage, setMessage, setIsLoading}) => {

    try{
        if(!firstName || !lastName || !emailId || !password || !rePassword ){
            console.log("Some of the fields missing");
            setIsMessage(true);
            setMessage("Any of the field cannot be empty!");
            setIsLoading(false);
            return;
        }

        if(!firstName.trim() || !lastName.trim() || !emailId.trim() || !password.trim()){
            console.log("fields cannot be nothing!");
            setIsMessage(true);
            setMessage("Any of the field cannot be nothing!");
            setIsLoading(false);
            return
        }

        if(password !== rePassword){
            console.log("Password and Repassword values does not match");
            setIsMessage(true);
            setMessage("password and rePassword value does not match");
            setIsLoading(false);
            return;
        }

        console.log(process.env.SIGNUP_API);


        const res = await fetch(process.env.SIGNUP_API,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    emailId,
                    password,
                })
            }
        );

        if(!res.ok){
            const {message} = await res.json();
            throw new Error(message);
        }
        setIsLoading(false);
        login({emailId: emailId.trim().toLowerCase() , password, setIsAuthenticated, navigate});

    }

    catch(err){
        setIsMessage(true);
        setMessage(err.message);
        setIsLoading(false);
    }
}

export default signup;