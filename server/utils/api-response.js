class ApiResponse{
    constructor(statusCode,data,message = "Success")
    {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;

    }
}

export {ApiResponse};
/* here we are using a dto(data transfer object pattern)In terms of your project's "mental map," think of this class as a Blueprint for a Box. Every time your backend wants to ship something to the frontend, it must use this blueprint to build the shipping box. This ensures the frontend doesn't have to guess how to "open" the package.

Does this distinction between "building in steps" vs. "standardizing the shape" make sense for your tracker?  */