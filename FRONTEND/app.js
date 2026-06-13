// Import from libraries
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// Internal imports
import HeaderComponent from "./src/components/HeaderComponent";
import userContext from "./src/context/userContext";
import AppShimmer from "./src/shimmer/AppShimmer";
import HeroComponent from "./src/components/HeroComponent";
import LoginComponent from "./src/components/LoginComponent";
import SignupComponent from "./src/components/SignupComponent";
import NotesComponent from "./src/components/NotesComponent";
import notesContext from "./src/context/notesContext";
import NotesInfoComponent from "./src/components/NotesInfoComponent";
import AddNotesComponent from "./src/components/AddNotesComponent";
import ProfileComponent from "./src/components/ProfileComponent";
import RevisionComponent from "./src/components/RevisionComponent";
import GapChangeComponent from "./src/components/GapChangeComponent";
import RevisionInfoComponent from "./src/components/RevisionInfoComponent";
import AddRevisionComponent from "./src/components/AddRevisionComponent";

// This is the main component
const App = () => {
    return (
            <div>
                <HeaderComponent />
                <Outlet />
            </div>  
    )
}

// This is the root component
const Root = () => {
    const [loadState, setLoadState] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [notes, setNotes] = useState([])

    useEffect(() => {
        verifyToken();
    }, []);


    const verifyToken = async () => {
        try{
            const msg = await fetch(process.env.VERIFY_API, {
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

    return( 
        <notesContext.Provider value = {{notes, setNotes}}>
            <userContext.Provider value= {{isUserLoggedIn:isAuthenticated, setIsAuthenticated}}>
                <RouterProvider router={appRouter} />
            </userContext.Provider>
        </notesContext.Provider>
    )
}

// These are the required routes
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HeroComponent />
            },
            {
                path: "/notes",
                element: <NotesComponent />
            },
            {
                path: "/notes/:notesId",
                element: <NotesInfoComponent />
            },
            {
                path: "/addnotes",
                element: <AddNotesComponent />
            },
            {
                path: "/profile",
                element: <ProfileComponent />
            },
            {
                path: "/revision",
                element: <RevisionComponent />
            },
            {
                path: "/revision/:revId",
                element: <RevisionInfoComponent />
            },
            {
                path: "/gapchange",
                element: <GapChangeComponent />
            },
            {
                path: "/addrevision",
                element: <AddRevisionComponent />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginComponent />
    },
    {
        path: "/signup",
        element: <SignupComponent />
    }
]);


// Root render
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Root />);