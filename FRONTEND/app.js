// Import from libraries
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// Internal imports
import HeaderComponent from "./src/components/HeaderComponent";
import userContext from "./src/context/userContext";
import AppShimmer from "./src/shimmer/AppShimmer";
import HeroComponent from "./src/components/HeroComponent";

// This is the main component
const App = () => {

    const [loadState, setLoadState] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        verifyToken();
    }, []);


    const verifyToken = async () => {
        try{
            const msg = await fetch("localhost", {
                credentials: "include"
            });

            if(!msg.ok){
                throw new Error("Unauthorized User!");
            }

            const json = await msg.json();
            const {success} = json;

            setIsAuthenticated(success);
            console.log("User is logged in!");
        }

        catch(err){
            console.log("Some error occured while verifying!");
            setIsAuthenticated(false);
            console.log("User is logged out!");
        }

        finally{
            setLoadState(false);
        }
    }
    

    if(loadState){
        return (
            <AppShimmer />
        )
    }


    return (

        <userContext.Provider value = {{isUserLoggedIn: isAuthenticated, setIsAuthenticated}}>
            <div>
                <HeaderComponent />
                <Outlet />
            </div>
        </userContext.Provider>
        
    )
}



const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HeroComponent />
            }
        ]
    }
])


// Root render
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);