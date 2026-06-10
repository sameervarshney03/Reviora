// Imports from libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Internal imports
import login from "../util/login";
import userContext from "../context/userContext";

const LoginComponent = () => {

    // Use of the hooks..
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setIsAuthenticated} = useContext(userContext);
    const navigate = useNavigate();

    // Handler for clicking the login button
    const loginHandler = (e) => {
        e.preventDefault()
        setIsLoading(true);
        login({emailId, password, setIsAuthenticated, navigate, setIsLoginSuccessful, setErrorMessage, setIsLoading});
    }

    return (

        <form className="flex justify-center items-center min-h-screen" onSubmit={loginHandler}>
        <fieldset className="fieldset bg-accent border-base-300 rounded-box w-xs border p-4">

            <label className="label text-accent-content">Email</label>
            <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmail(e.target.value)} />

            <label className="label text-accent-content">Password</label>
            <input type="password" className="input" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)} />

            {
                isLoginSuccessful?
                (
                    <></>
                ):
                (
                    <p className="text-center text-error">
                        {errorMessage}
                    </p>
                )
            }

            
                <button type = "submit" className="btn btn-ghost mt-4" disabled = {isLoading}>
                {
                    isLoading?
                    "logging in..."
                    :"login"
                }   
                </button>
        </fieldset>
        </form>
    )
}

export default LoginComponent;