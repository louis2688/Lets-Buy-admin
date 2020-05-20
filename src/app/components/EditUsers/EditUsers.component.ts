import { Component, Output, EventEmitter, Input, ViewChild, ElementRef} from '@angular/core';
import { ToastComponent } from "../Toast/Toast.component";
import { ServerService } from "../../service/serverService";
import { User } from "../../entities/user";

@Component({
    selector: 'EditUsers',
    templateUrl: './EditUsers.component.html',
    styleUrls: ['./EditUsers.component.css'],
    providers: [ServerService]
})

export class EditUsersComponent {
    public items: User[];
    public itemToDelete: User;
    public showBlockedUsers: boolean;
    public pages: number[] = [];
    public currentPage: number = 0;
    public searchInput: string = "";
    public setSearchInput: string = "";

    @ViewChild(ToastComponent) Toast: ToastComponent;

    constructor(private service: ServerService) {
        this.RefreshItems();
    }
 
    async RefreshItems() {
        this.service.Get_Users_Items(this.showBlockedUsers, this.currentPage, this.setSearchInput).then(x => {
            if (x.isOk) {
                this.items = x.List;
                this.pages = [];
                for (var i = 0; i < x.pages; i++) {
                    this.pages.push(i);
                }
            }
        });
    }

    SetSearchInput() {
        this.setSearchInput = this.searchInput;
        this.RefreshItems();
    }


    
    async SetAffilate(item: User) {
        await this.service.SetAffilate(item.id, item.affiliateRate);
        this.Toast.ToggleToast("Affilate Set Successfully");

    }

    async UpdateItem(item: User) {
        await this.service.ToggleUser(item.id);
        await this.RefreshItems();
    }

    async toggleAdviser(item: User) {
        await this.service.ToggleAdviser(item.id);
        await this.RefreshItems();
    }

    GetPage(i: number) {
        this.currentPage = i;
        this.RefreshItems();
    }   
}
