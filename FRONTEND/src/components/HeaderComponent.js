// Import from libraries
import { useContext, useState, useEffect} from "react";
import {LuSun, LuMoon} from "react-icons/lu";
import {Link, useNavigate} from "react-router-dom";

// Internal Imports
import changeTheme from "../util/changeTheme";
import userContext from "../context/userContext";

// Image imports
import logoImg from "url:../../public/images/logo.png"

const HeaderComponent = () => {
    // We check for the context APIs

    const {isUserLoggedIn, setIsAuthenticated} = useContext(userContext);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
        theme
        );
    }, [theme]);

    const toggleTheme = () => {
        changeTheme(theme, setTheme);
    }

    const logout = async() => {
        try{
            await fetch(process.env.LOGOUT_API, {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                }
            })

            setIsAuthenticated(false);
            navigate("/");
        }
        catch(err){
            console.log(err.message)
        }
    }

    const handleLogout = () => {
        logout();
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
                                <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={logoImg} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    
                                    <li><Link to = "/profile">Profile</Link ></li>
                                    <li><Link to = "/notes">Notes</Link ></li>
                                    <li><Link to = "/revision">Revision</Link ></li>
                                    <li><a onClick={handleLogout}>Logout</a></li>
                                </ul>
                                </div>
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