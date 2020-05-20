import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LoginViewModel, GetTokenViewModel } from '../entities/index';
import 'rxjs';
import { LocalStorage } from './LocalStorage';
import { ShaerdStrings } from './ShaerdStrings';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    public static isAuthenticated(): boolean {

        var token = LocalStorage.GetString(ShaerdStrings.keys_token);
        if (token && token.length > 0) {
            return true;
        }
        return false;
    }
    public static ClearToken() {
        LocalStorage.removeItem(ShaerdStrings.keys_token);
        LocalStorage.removeItem(ShaerdStrings.keys_rtoken);
        LocalStorage.removeItem(ShaerdStrings.keys_tokenExp);
    }
    public static Token(): string {
        if (AuthenticationService.isAuthenticated()) {
            var value = LocalStorage.GetString(ShaerdStrings.keys_token);
            if (value != null) {
                return value;
            }
        }

        return "";
    }
    private static async RefreshToken(http: Http): Promise<boolean> {
        var refreshToken = LocalStorage.GetString(ShaerdStrings.keys_rtoken);
        var model = new GetTokenViewModel();
        model.InitByToken(refreshToken);
        return await AuthenticationService.GetToken(model, http);
    }

    public async ValidToken() {
        var tokenExpString = LocalStorage.GetString(ShaerdStrings.keys_tokenExp);
        var tokenExpDate = new Date(tokenExpString);
        var currentDate = new Date();
        if (!tokenExpDate || currentDate > tokenExpDate) {
            var refrashResult = await AuthenticationService.RefreshToken(this.http);
            return true;
        }
        return false;
    }
    public async LoginWithParameters(username: string, password: string): Promise<boolean> {
        var model = new LoginViewModel();
        model.UserName = username;
        model.Password = password;
        return await this.Login(model);
    }
    public async Login(model: LoginViewModel): Promise<boolean> {

        var _data = new GetTokenViewModel();
        _data.InitByPassword(model);

        var resilt = await AuthenticationService.GetToken(_data, this.http);
        return resilt;

    }

    public async LoginExternal(provider: string, externalAccessToken: string): Promise<boolean> {

        var _string = new ShaerdStrings();
        var url = _string.auth_external_login;
        var data = { "Provider": provider, "ExternalAccessToken": externalAccessToken };
        var options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
        var login: boolean = await this.http.post(url, data, options)
            .toPromise()
            .then(res => {
                var data = res.json();
                if (data && data.access_token) {
                    LocalStorage.SetString(ShaerdStrings.keys_token, data.access_token);
                    LocalStorage.SetString(ShaerdStrings.keys_rtoken, data.refresh_token);
                    var exp = new Date(data['.expires']);
                    LocalStorage.SetString(ShaerdStrings.keys_tokenExp, exp.toString());
                    return true;
                }
                return false
            })
            .catch(res => { console.log(res); return false; })

        return login;

    }

    private static async GetToken(model: GetTokenViewModel, http: Http): Promise<boolean> {
        var _string = new ShaerdStrings();
        var url = _string.auth_token;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        var data = model.GetString();

        var result = await http.post(url, data, options).toPromise()
            .then(res => {
                if (res.status == 200) {
                    var data = res.json();
                    if (data && data.access_token) {
                        LocalStorage.SetString(ShaerdStrings.keys_token, data.access_token);
                        LocalStorage.SetString(ShaerdStrings.keys_rtoken, data.refresh_token);
                        var exp = new Date(data['.expires']) || new Date().setMinutes(new Date().getMinutes() + 25);
                        LocalStorage.SetString(ShaerdStrings.keys_tokenExp, exp.toString());
                        return true;
                    }
                }
            }, (err: Response) => {
                if (err.status == 400) {
                    var data = err.json();
                    if (data.error_description) {
                        if (data.error_description === "The user name or password is incorrect.") {
                            var errorMsg = data.error_description;
                            throw new Error(errorMsg);
                        }
                    }
                }
                else if (err.status == 0) {
                    throw new Error("server_error");
                }
            }) || false;

        return result;
    }
    private handleError(error: Response) {
        if (error.status == 401) {
            console.log('Auth not valid - reset token data');
            AuthenticationService.ClearToken();
        }
        throw new Error(error.json().message);
    }
}
