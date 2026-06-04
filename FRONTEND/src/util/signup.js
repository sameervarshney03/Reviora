import login from "./login";

const signup = async (firstName, lastName, emailId, password, rePassword, setIsAuthenticated, navigate, setIsMessage, setMessage) => {

    try{
        if(!firstName || !lastName || !emailId || !password || !rePassword ){
            console.log("Some of the fields missing");
            setIsMessage(true);
            setMessage("Any of the field cannot be empty!");
            return;
        }


        if(password !== rePassword){
            console.log("Password and Repassword values does not match");
            setIsMessage(true);
            setMessage("password and rePassword value does not match");
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

        login(emailId, password, setIsAuthenticated, navigate);

    }

    catch(err){
        setIsMessage(true);
        setMessage(err.message);
    }
}

export default signup;