import { useState, useEffect } from "react";

const useRevision = ({setIsLoading, setIsError}) => {
    const [reqMaterial, setReqMaterial] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    const getMaterial = async() => {
        try{
            const res = await fetch(process.env.REVISION_API, {
                credentials: "include"
            })

            if(!res.ok){
                throw new Error("Error getting the notes data");
            }

            const json = await res.json();

            setReqMaterial(json.reqMaterial);


            let bool = true;
            for(const i of json.reqMaterial){
                if(i.length > 0){
                    bool = false;
                    break;
                }
            }

            setIsEmpty(bool);
            setIsLoading(false);
        }
        catch(err){
            console.log(err.message);
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getMaterial();
    }, [])

    return {
        reqMaterial,
        isEmpty
    }
    
}

export default useRevision;