export default class ValidationError {
    constructor(message){
        this.message = message;
        this.name = 'ValidationError';
        this.stack = (new Error).stack;
    }
}