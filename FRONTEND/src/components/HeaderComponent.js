//Import from libraries
import { useContext, useState } from "react";
import userContext from "../context/userContext";
import {LuSun, LuMoon} from "react-icons/lu";


// Internal Imports
import changeTheme from "../hook/changeTheme";


const HeaderComponent = () => {
    // We check for the context APIs

    const {isUserLoggedIn} = useContext(userContext);
    const [theme, setTheme] = useState("dark");

    const alterTheme = () => {
        changeTheme(theme, setTheme);
    }

    return (
            // NavBar from daisyUI
            <div className="navbar bg-accent shadow-sm text-base-200">
                <div className="navbar-start">
                    <p className="text-xl">
                        Reviora
                    </p>
                </div>
                <div className="navbar-end">
                    
                    <button className="mr-4 cursor-pointer" onClick = {alterTheme}>
                        {
                            theme === "light"?
                            <LuSun size={25} className="hover:text-info-content"/>:
                            <LuMoon size={25} className="hover:text-warning"/>
                        }
                      
                    </button>
                    {/*Buttons from daisyUI*/}

                    {
                        isUserLoggedIn?
                        (
                            <>
                                <a className="btn btn-ghost text-xl">Notes</a>
                                <a className="btn btn-ghost text-xl">Revision</a>
                            </>
                        )
                        :
                        (   <>
                                <a className="btn btn-ghost text-xl">SignUp</a>
                                <a className="btn btn-ghost text-xl">Login</a>
                            </>
                        )
                    }
                    
                </div>
            </div>
        );

}
export default HeaderComponent;