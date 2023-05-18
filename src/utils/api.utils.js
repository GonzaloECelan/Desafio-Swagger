const htpp_status = {
    OK:200,
    CREATED:201,
    BAD_REQUEST:400,
    NOT_FOUND: 404,
    SERVER_ERROR:500
}

const successResponse = (payload) =>{

    const response =  {
        success: true,
        payload
    }
    return response
}

const errorResponse = (description, error = null)=>{
const response = {
    success:false,
    description,
    details: error
}
return response
}

 class HttpError {
    constructor(description, status = 500, details = null) {
      this.description = description;
      this.status = status;
      this.details = details;
    }
  }

module.exports =  {
    htpp_status,
    successResponse,
    errorResponse,
    HttpError
}


