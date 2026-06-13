// Imports from libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Interal imports
import userContext from "../context/userContext";
import signup from "../util/signup";

const SignupComponent = () => {
    
    // Use of hooks
    const [firstName , setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
 
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState("");
    
    const {setIsAuthenticated} = useContext(userContext);
    const navigate = useNavigate()

    // Handler to handler the signup button
    const signUpHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        signup({firstName, lastName, emailId, password, rePassword, setIsAuthenticated, navigate, setIsMessage, setMessage, setIsLoading});
    }

    return (
        <form onSubmit={signUpHandler} className="flex justify-center items-center min-h-screen">
            <fieldset className="fieldset bg-accent border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">SignUp</legend>

                <label className="label text-accent-content">Firstname</label>
                <input type="text" className="input" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

                <label className="label text-accent-content">LastName</label>
                <input type="text" className="input" placeholder="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

                <label className="label text-accent-content">Email</label>
                <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>

                <label className="label text-accent-content">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <label className="label text-accent-content">Re-enter Password</label>
                <input type="password" className="input" placeholder="Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>

                {
                    isMessage?
                    <p className="text-center text-error px-4">
                        {message}
                    </p>:
                    <>
                    </>
                }
                    <button type="submit" className="btn btn-ghost mt-4" disabled = {isLoading}>
                        {
                            isLoading?
                            "Signing in..":
                            "Sign Up"
                        }   
                    </button>
            </fieldset>
        </form>
    )

}

export default SignupComponent;