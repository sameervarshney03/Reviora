// Import from libraries
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HeaderComponent from "./src/components/HeaderComponent";

// This is the main component
const App = () => {

    return (
        <div>
            <HeaderComponent />
            <Outlet />
        </div>
    )
}



const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [

        ],
        errorElement: <Error />
    }
])


// Root render
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);