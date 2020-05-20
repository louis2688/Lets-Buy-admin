import { Component, Output, EventEmitter, Input, ViewChild, ElementRef  } from '@angular/core';
import { ToastComponent } from "../Toast/Toast.component";
import { Site } from "../../entities/sites";
import { ServerService } from "../../service/serverService";
import { SelectableSiteCategory, SelectableCategory } from "../../entities/category";

@Component({
    selector: 'EditSites',
    templateUrl: './EditSites.component.html',
    styleUrls: ['./EditSites.component.css'],
    providers: [ServerService]
})

export class EditSitesComponent {
    public items: Site[];
    public apiList: string[];
    public allCategoriesList: SelectableSiteCategory[];
    public itemToDelete: Site;
    public editSiteIndex: number;
    public itemToAdd: Site = new Site();
    public isEditCatOpen: boolean;

    public pages: number[] = [];
    public currentPage: number = 0;
    public searchInput: string = "";
    public setSearchInput: string = "";

    @ViewChild(ToastComponent) Toast: ToastComponent;
    @ViewChild('imageUpload') fileInput: ElementRef;

    constructor(private service: ServerService) {
        this.RefreshItems();
        this.service.Get_SitesAPI_List().then(x => {
            if (x.isOk) {
                this.apiList = x.List;
            }
        });
        this.service.Get_Categories_Items().then(x => {
            if (x.isOk) {
                this.allCategoriesList = [];
                x.List.forEach(x => {
                    var item = new SelectableSiteCategory();
                    item.ID = x.id;
                    item.Name = x.name;
                    this.allCategoriesList.push(item);
                })
            }
        });
        
    }

    async RefreshItems() {
        this.service.Get_Sites_Items(this.currentPage, this.setSearchInput).then(x => {
            if (x.isOk) {
                this.items = x.List;
                this.pages = [];
                for (var i = 0; i < x.pages; i++) {
                    this.pages.push(i);
                }
            }
        });
    }

    GetPage(i: number) {
        this.currentPage = i;
        this.RefreshItems();
    }   

    SetSearchInput() {
        this.setSearchInput = this.searchInput;
        this.currentPage = 0;
        this.RefreshItems();
    }

    ValidationItem(item: Site) {
        if (!item.Url || item.Url == "" || !item.API_NAME || item.API_NAME == "") {
            return false;
        }
        return true;
    }

    SelectApi(item: Site, api: string) {
        item.API_NAME = api;
    }

    SetItemToDelete(item: Site) {
        this.itemToDelete = item;
    }

    async DeleteItem() {
        if (this.itemToDelete) {
            var result = await this.service.DeleteSite(this.itemToDelete);
            if (result.isOk) {
                this.Toast.ToggleToast("Delete successful", "alert-info");
                this.RefreshItems();
            }
            else {
                this.Toast.ToggleToast(result.Errors[0].Value, "alert-danger");
            }
        }
    }
    async AddItem() {
        if (this.ValidationItem(this.itemToAdd)) {
            var _site = await this.service.AddSite(this.itemToAdd);
            if (_site.isOk) {
                this.items.unshift(_site.Singel);
                this.Toast.ToggleToast("Saved successfully", "alert-success");
            }
            else {
                this.Toast.ToggleToast(_site.Errors[0].Value, "alert-danger");
            }
        }
        else {
            this.Toast.ToggleToast("Failed to save. <br/> You have to enter name and api!", "alert-danger");
        }
    }
    async UpdateItem(item: Site) {
        if (this.ValidationItem(item)) {
            var result = await this.service.UpdateSite(item);
            if (result.isOk) {
                this.Toast.ToggleToast("Saved successful", "alert-info");
                this.RefreshItems();
            }
            else {
                this.Toast.ToggleToast(result.Errors[0].Value, "alert-danger");
            }
        }
        else {
            this.Toast.ToggleToast("Failed to save. <br/> You have to enter question and answer!", "alert-danger");
        }

    }

    EditSiteCtegories(i: number) {
        this.editSiteIndex = i;
        var site = this.items[i];
        if (!site.CategorySiteFees) {
            site.CategorySiteFees = [];
        }
        this.allCategoriesList.forEach(function (obj, index) {
            var isSelect = site.CategorySiteFees.find(x => x.CategoryID == obj.ID);
            if (isSelect != null) {
                obj.chacked = true;
            }
            else {
                obj.chacked = false;
            }
        });
        this.isEditCatOpen = true;
    }

    async UpdateSiteCtegories() {
        var site = this.items[this.editSiteIndex];
        site.CategorySiteFees = [];
        this.allCategoriesList.forEach(function (obj, index) {
            if (obj.chacked) {
                site.CategorySiteFees.push(obj);
            }
        });
        this.items[this.editSiteIndex].CategorySiteFees = site.CategorySiteFees;
        var result = await this.service.UpdateSiteCaregories(this.items[this.editSiteIndex]);
        if (result.isOk) {
            this.Toast.ToggleToast("Saved successful", "alert-info");
            this.isEditCatOpen = false;
        }
        else {
            this.Toast.ToggleToast(result.Errors[0].Value, "alert-danger");
        }
    }

    public SelectImageDialog(i: number) {
        this.editSiteIndex = i;
        this.fileInput.nativeElement.click();
    }
    
    public async SelectImage() {
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append('files', fileBrowser.files[0]);
            var result = await this.service.UploadSiteLogo(formData);
            //if (result.isOk) {
            //    this.items[this.editSiteIndex].logo = result.Singel;
            //}
            this.items[this.editSiteIndex].Image = fileBrowser.files[0];
        }
    }
}
