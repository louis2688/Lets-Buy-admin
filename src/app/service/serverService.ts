import { Injectable } from '@angular/core';
import { Question } from "../entities/faq";
import { SelectableCategory } from "../entities/category";
import { Site } from "../entities/sites";
import { LetsBuyResponse } from "./response";
import { User } from "../entities/user";
import { Link } from '../entities/link';
import { Lead } from '../entities/lead';
import { Sale, Profit } from '../entities/sale';
import { Trend } from '../entities/trend';
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';

@Injectable()
export class ServerService {



    constructor(private http: SecureHttp, private str: ShaerdStrings) {

    }

    /// Question Function ***************************** ///
    async Get_FAQ_Items() {
        return this.http._get<Question>(this.str.getFaqs);
    }
    DeleteQuetion(item: Question) {
        return this.http._post<Question>(this.str.RemoveFaq, item);
    }
    UpdateQuetion(item: Question) {
        return this.http._post<Question>(this.str.UpdateFaq, item);
    }
    AddQuetion(item: Question) {
          return this.http._post<Question>(this.str.AddFaq,item);
    }

    /// Category Function ***************************** ///
    async Get_Categories_Items() {
        return this.http._get<SelectableCategory>(this.str.getCategories);
    }
    DeleteCategory(item: SelectableCategory) {
        var url = this.str.deleteCategory + "?id=" + item.id;
        return this.http._get<SelectableCategory>(url);
    }
    UpdateCategory(item: SelectableCategory) {
        return this.http._post(this.str.updateCategory, item);
    }
    UpdateSubCategory(item: SelectableCategory, parentId: string) {
        var url = this.str.updateSubCategory + "?parent=" + parentId;
        return this.http._post<SelectableCategory>(url, item);
    }
    AddCategory(item: SelectableCategory) {
        return this.http._post<SelectableCategory>(this.str.addCategory, item);
    }

    /// TOU Function ***************************** ///
    async Get_TOU() {
        return this.http._get<string>(this.str.getTOU);
    }
    async Update_TOU(val) {
        return this.http._post<string>(this.str.setTou,{html: val});
    }

    /// Site Function ***************************** ///
    async Get_Sites_Items(index: number, filter: string) {
        var url = this.str.getSites + "?page=" + index + "&search=" + filter;
        return this.http._get<Site>(url);
    }
    async Get_SitesAPI_List() {
        var url = this.str.getApis;
        return this.http._get<string>(url);
    }
    DeleteSite(item: Site) {
        var url = this.str.deleteSite + "?id=" + item.ID;
        var data = {  }
        return this.http._post<Site>(url, data);
    }
    UpdateSite(item: Site) {
        var url = this.str.updateSite;
        return this.http._post<Site>(url, item);
    }
    AddSite(item: Site) {
        var url = this.str.addSite;
        return this.http._post<Site>(url, item);
    }
    UploadSiteLogo(formData:any) {
        //TODO
    }
    UpdateSiteCaregories(site: Site) {
        var data: string[] = [];
        site.CategorySiteFees.forEach(x => {
            data.push(x.ID);
        })

        var url = this.str.setSiteCategories + "?siteid=" + site.ID;
        return this.http._post<Site>(url, data);
    }

    /// User Function ***************************** ///
    async Get_Users_Items(justBlocked: boolean, index: number, filter: string) {
        var url = this.str.getUsers + "?search=" + filter + "&page=" + index + "&block=" + justBlocked;
        return this.http._get<User>(url);
    }
    ToggleUser(id: string) {
        var url = this.str.blockUser + "?id=" + id;
        return this.http._get<boolean>(url);
    }

    
    ToggleAdviser(id: string) {
        var url = this.str.toggleAdviser + "?id=" + id;
        return this.http._get<boolean>(url);
    }


    SetAffilate(id: string, val : number) {
        var url = this.str.blockUser + "?id=" + id + "&value=" + val;
        return this.http._get<boolean>(url);
    }
    
   /// link report Function ***************************** ///
    async Get_Links_Items(index: number, filter: string) {

        var url = this.str.getLinks + "?search=" + filter + "&page=" + index;
        return this.http._get<Link>(url);
    }

    async Get_Link_ByID(linkId: string) {
        //TODO
        var item = new LetsBuyResponse<Link>();
        
        var tmp1 = new Link();
        tmp1.leads = 7;
        tmp1.site = "Ebay";
        tmp1.url = "http://www.ebay.com/cln/ebayhomeeditor/culinary-cuteness/246967696018";
        tmp1.userName = "Tali Cohen";

        item.isOk = true;
        item.Singel = tmp1;
        return item;
    }
    async Get_Leads_Items(linkId: string, page: number) {
        var url = this.str.getLeads + "?id=" + linkId + "&page=" + page;
        return this.http._get<Lead>(url);
    }

    /// Sells report Function ***************************** ///
    async Get_Sells_Items(page: number, filter: string) {
        var url = this.str.getSells + "?search=" + filter + "&page=" + page;
        return this.http._get<Sale>(url);
    }

    TogglePayment(id: string) {
        var url = this.str.togglePayment + "?id=" + id;
        return this.http._get<boolean>(url);
    }

    /// Profit report Function ***************************** ///
    async Get_Profit_Items(page: number, filter: string) {
        var url = this.str.getProfit + "?search=" + filter + "&page=" + page;
        return this.http._get<Profit>(url);
    }

    async Get_Home_Profit_Items() {
        var url = this.str.getHomeProfit;
        return this.http._get<Profit>(url);
    }

    /// Trends report Function ***************************** ///
    async Get_Trends_Items(page: number, filter: string) {
        var url = this.str.getTrends + "?search=" + filter + "&page=" + page;
        return this.http._get<Trend>(url);

    }
}
