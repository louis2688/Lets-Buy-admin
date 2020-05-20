import { Injectable } from '@angular/core';


@Injectable()
export class ShaerdStrings {
    constructor() { }

    // Vars
    public static defultImagePerson = "http://www.mjbcorp.com/images/pic-of-mark.jpg";

    // Keys for local storage
    public static keys_token = "_t";
    public static keys_rtoken = "_rt";
    public static keys_tokenExp = "_texp";

    public static keys_userProfile = "_UP";

    public static keys_categories_items = "RES_CAT";
    public static keys_languages_items = "RES_LANGS";
    public static keys_loc_items = "RES_LOC";

    public static keys_lang_current = "_lang_current";
    public static keys_lang_dic = "_lang_dic_";

    public static keys_chat_items = "CHAT_I";

    public static keys_platform = "PLATFORM";


    // C# controllers names
    private controller = "Admin";
    private account_controller = "api/Account";


    // Urls for api calls

    public getTOU = this.UrlAction(this.controller, "GetTOU");
    public setTou = this.UrlAction(this.controller, "SetTOU");


    public getCategories = this.UrlAction(this.controller, "GetCategories");
    public addCategory = this.UrlAction(this.controller, "AddCategory");
    public deleteCategory = this.UrlAction(this.controller, "DeleteCategory");
    public updateCategory = this.UrlAction(this.controller, "UpdateCategory");
    public updateSubCategory = this.UrlAction(this.controller, "AddOrUpdateSubCategory");

    public getFaqs = this.UrlAction(this.controller, "GetFAQ");
    public AddFaq = this.UrlAction(this.controller, "AddFaq");
    public UpdateFaq = this.UrlAction(this.controller, "UpdateFaq");
    public RemoveFaq = this.UrlAction(this.controller, "RemoveFaq");

    public getSites = this.UrlAction(this.controller, "GetSites");
    public getApis = this.UrlAction(this.controller, "GetApis");
    public addSite = this.UrlAction(this.controller, "AddSite");
    public updateSite = this.UrlAction(this.controller, "UpdateSite");
    public deleteSite = this.UrlAction(this.controller, "DeleteSite");
    public setSiteCategories = this.UrlAction(this.controller, "SetCategoriesForSite");

    public getUsers = this.UrlAction(this.controller, "GetUsers");
    public blockUser = this.UrlAction(this.controller, "BlockUser");
    public toggleAdviser = this.UrlAction(this.controller, "ToggleAdviser");

    public getLinks = this.UrlAction(this.controller, "GetLinks");
    public getLeads = this.UrlAction(this.controller, "GetLeads");
    public getSells = this.UrlAction(this.controller, "GetSells");
    public togglePayment = this.UrlAction(this.controller, "togglePayment");
    public getProfit = this.UrlAction(this.controller, "GetProfit");
    public getHomeProfit = this.UrlAction(this.controller, "GetHomeProfit");
    public getTrends = this.UrlAction(this.controller, "GetTrends");





    // Auth
    public auth_register = this.UrlAction(this.account_controller, "Register", "auth");
    public auth_external_register = this.UrlAction(this.account_controller, "RegisterExternal", "auth");
    public auth_external_login = this.UrlAction(this.account_controller, "ObtainLocalAccessToken", "auth");
    public auth_get_reset_password = this.UrlAction(this.account_controller, "ResetPassword", "auth");
    public auth_token = this.UrlAction('', "token", "auth");

    //Logins
    public googleAuthUtl(): string {
        if (this.IsBroswer()) {
            return this.BaseUrlAuthServer() + "/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=ngApp&redirect_uri=" + document.getElementsByTagName('base')[0].href + "authComplate";
        }
        return "";
    }
    public facebookAuthUtl(): string {
        if (this.IsBroswer()) {
            return this.BaseUrlAuthServer() + "/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=ngApp&redirect_uri=" + document.getElementsByTagName('base')[0].href + "authComplate";
        }
        return "";
    }

    public static PRUD_RES_URL: string = "";
    public static AUTH_RES_URL: string = "";

    // Helprs 
    private BaseUrlResourceServer(): string {
        return this.IsInDevMode() ? "http://localhost:31320/api/" : ShaerdStrings.PRUD_RES_URL;
    }

    private BaseUrlAuthServer(): string {
        return this.IsInDevMode() ? "http://localhost:54510/" : ShaerdStrings.AUTH_RES_URL;
    }



    private IsInDevMode(): boolean {
        if (this.IsBroswer()) {
            return /localhost/.test(document.location.host);
        }
        return false;
    }

    private IsBroswer(): boolean {
        try {
            if (document != null) {
                return true;
            }
        } catch (e) {

        }

        return false;
    }

    private UrlController(controller: string): string {
        var base_url = this.BaseUrlResourceServer();
        return base_url + controller;
    }
    private UrlAction(controller: string, action: string, server: string = 'resource'): string {
        var base_url = "";
        switch (server.toLowerCase()) {
            case "auth":
                base_url = this.BaseUrlAuthServer();
                break;
            case "resource":
                base_url = this.BaseUrlResourceServer();
                break;
            default:
                return "";
        }
        if (controller.length > 0) {
            base_url = base_url + controller + '/';
        }
        return base_url + action;
    }
}