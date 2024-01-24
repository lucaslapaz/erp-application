export default class ErrorCustom extends Error{
    constructor(message){
        super(message);
        this.name = "ErrorCustom";
    }
}