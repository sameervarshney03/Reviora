const profileValidator = (data) => {
    const {firstName, lastName} = data;

    if(firstName.length > 50 || lastName.length > 50){
        throw new Error("Maximum length exceeded!");
    }

    if(firstName.length < 2 || lastName.length < 2){
        throw new Error("Lacks minimum length!");
    }

    if(!firstName.trim() || !lastName.trim()){
        throw new Error("Invalid Name!");
    }
}