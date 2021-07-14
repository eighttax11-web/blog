export interface Response {
    status:  string;
    code:    number;
    message: string;
    errors?:  Errors;
}

export interface Errors {
    name: string[];
    surname: string[];
    email: string[];
    password: string[];
}
