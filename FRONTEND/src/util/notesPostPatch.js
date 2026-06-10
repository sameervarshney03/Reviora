const notesPostPatch = async ({titleState, descriptionState, setIsError, setErrorMessage, navigate, API, mtod, setIsLoading}) => {

    try{
        const res = await fetch(API, {
            method: mtod,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleState,
                description: descriptionState
            })
        });

        if(!res.ok){
           const msg = await res.json();
           throw new Error(msg.message);
        }

        setIsError(false);
        navigate("/notes");
        if(setIsLoading){
            setIsLoading(false);
        }
    }
    catch(err){
        console.log(err.message);
        setIsError(true);
        setErrorMessage(err.message);
        if(setIsLoading){
            setIsLoading(false);
        }
    }
}

export default notesPostPatch;