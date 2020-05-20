export class LetsBuyResponse<T>{
    Singel: T;
    List: T[];
    Errors: ErrorItem[];
    isOk: boolean;
    isList: boolean;
    pages: number;
    currentPage: number;
}
export class ErrorItem {
    Key: string;
    Value: string;
}