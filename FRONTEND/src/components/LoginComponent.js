// Imports from libraries
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Internal imports
import login from "../util/login";
import userContext from "../context/userContext";

const LoginComponent = () => {

    // use of the hooks..
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(true);
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setIsAuthenticated} = useContext(userContext);
    const navigate = useNavigate();


    const loginHandler = () => {
        login(emailId, password, setIsAuthenticated, navigate, setIsLoginSuccessful);
    }

    return (

        <div className="flex justify-center items-center min-h-screen">
        <fieldset className="fieldset bg-accent border-base-300 rounded-box w-xs border p-4">

            <label className="label text-accent-content">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className="label text-accent-content">Password</label>
            <input type="password" className="input" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)} />

            {
                isLoginSuccessful?
                (
                    <></>
                ):
                (
                    <p className="text-center text-error">
                        Invalid credentials!
                    </p>
                )
            }

            <button className="btn btn-ghost mt-4" onClick={loginHandler}>Login</button>
        </fieldset>
        </div>
    )
}

export default LoginComponent;