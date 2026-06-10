// Import from libraries
import { useContext, useState, useEffect} from "react";
import {LuSun, LuMoon} from "react-icons/lu";
import {Link} from "react-router-dom";

// Internal Imports
import changeTheme from "../util/changeTheme";
import userContext from "../context/userContext";


const HeaderComponent = () => {
    // We check for the context APIs

    const {isUserLoggedIn} = useContext(userContext);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
        theme
        );
    }, [theme]);

    const toggleTheme = () => {
        changeTheme(theme, setTheme);
    }

    return (
            
            <div className="navbar bg-accent shadow-sm text-base-200">
                <div className="navbar-start">
                    <Link to="/" className="text-xl">
                        Reviora
                    </Link>
                </div>
                <div className="navbar-end">
                    
                    {/*Button to change the theme*/}
                    <button className="mr-4 cursor-pointer" onClick = {toggleTheme}>
                        {
                            theme === "light"?
                            <LuMoon size={25} className="hover:text-info-content"/>:
                            <LuSun size={25} className="hover:text-warning"/>
                        }
                      
                    </button>
                    
                    {/*Button to navigate*/}
                    {
                        isUserLoggedIn?
                        (
                            <>
                                <Link to= "/notes" className="btn btn-ghost text-xl">Notes</Link>
                                <Link to= "/revision" className="btn btn-ghost text-xl">Revision</Link>
                            </>
                        )
                        :
                        (   <>
                                <Link to="/signup" className="btn btn-ghost text-xl">SignUp</Link>
                                <Link to="/login" className="btn btn-ghost text-xl">Login</Link>
                            </>
                        )
                    }
                    
                </div>
            </div>
        );

}
export default HeaderComponent;