const notesDelete = async ({API, setIsError, setErrorMessage, navigate}) => {
    try{
        const res = await fetch(API,{
            method: "delete",
            credentials: "include"
        })

        if(!res.ok){
            throw new Error("Error deleting the message!");
        }

        navigate("/notes")

    }
    catch(err){
        setIsError(true);
        setErrorMessage("Error deleting the message!");
    }



}

export default notesDelete;