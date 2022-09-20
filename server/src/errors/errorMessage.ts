interface MyError extends Error{
    status?: number
}
function errorMessage(message = "Something went wrong", status?: number){
    
 
    const err: MyError = new Error(message ? message :  "Something went wrong");
    err["status"] = status ? status : 404;
    
    throw err
}


export default errorMessage