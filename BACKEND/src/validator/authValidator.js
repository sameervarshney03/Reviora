const authValidator = (data) => {
    const {firstName, lastName, emailId, password} = data;

    // requied field validation
    if(!firstName || !lastName || !emailId || !password){
        throw new Error("All field required!");
    }

    if(!firstName.trim() || !lastName.trim() || !emailId.trim() || !password.trim()){
        throw new Error("Fields cannot be empty!");
    }

    if(password.length < 8){
        throw new Error("Password should be atleast 8 character!");
    }

    if(firstName.length > 50 || lastName.length > 50){
        throw new Error("Exceeded Maximum length!");
    }

    if(firstName.length < 2 || lastName.length < 2){
        throw new Error("Lack Minimum Length!");
    }
};

module.exports = authValidator