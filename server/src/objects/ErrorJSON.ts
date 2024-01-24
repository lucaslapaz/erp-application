interface ErrorJSONProps
{
    message: string;
    code: number;
    errorName: string;
}

export default class ErrorJSON extends Error implements ErrorJSONProps
{
    message: string = '';
    code:number = 0;
    errorName: string = '';

    constructor(_message: string, _code: number, _errorName: string){
        super();
        this.message = _message;
        this.code = _code;
        this.errorName = _errorName;
    }
}