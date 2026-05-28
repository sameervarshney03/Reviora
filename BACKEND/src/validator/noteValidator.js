const noteValidator = (data) => {
    const {title, description} = data;

    if(title.length >   100){
        throw new Error("Title loo long!");
    }

    if(description.length > 2000){
        throw new Error("Description too long!");
    }
}
