
export class GetTokenViewModel {
    constructor() {
        this.client_id = "ngApp";
    }

    public InitByPassword(data: LoginViewModel) {
        this.username = data.UserName;
        this.password = data.Password;
        this.grant_type = "password";
    }

    public InitByToken(token: string) {
        this.refresh_token = token;
        this.grant_type = "refresh_token";
    }

    public GetString() {
        return 'grant_type=' + this.grant_type + '&username=' + this.username + '&password=' + this.password + '&refresh_token=' + this.refresh_token + '&client_id=' + this.client_id;
    }

    private grant_type: string="";
    private username: string="";
    private password: string="";
    private refresh_token: string="";
    private client_id: string="";
}

export class LoginViewModel {
    public UserName: string="";
    public Password: string="";
    constructor() { }
}



export enum TokenTypes {
    password,
    refresh_token
}
