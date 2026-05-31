import ReactDom from "react-dom/client";




const App = () => {


    return (
        <h1 className="text-blue-900 text-center">
            This is just the configuration
        </h1>
    )
}




const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />)