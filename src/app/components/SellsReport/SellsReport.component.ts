import { Component} from '@angular/core';
import { ServerService } from "../../service/serverService";
import { Sale } from '../../entities/sale';
@Component({
    selector: 'SellsReport',
    templateUrl: './SellsReport.component.html',
    styleUrls: ['./SellsReport.component.css'],
    providers: [ServerService]
})
export class SellsReportComponent {
    public items: Sale[];
    public pages: number[] = [];
    public currentPage: number = 0;
    public searchInput: string = "";
    public setSearchInput: string = "";

    constructor(private service: ServerService) {
        this.RefreshItems();
    }

    async RefreshItems() {
        this.service.Get_Sells_Items(this.currentPage, this.setSearchInput).then(x => {
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

    GetPage(i: number) {
        this.currentPage = i;
        this.RefreshItems();
    }  

    async togglePayment(item: Sale) {
        await this.service.TogglePayment(item.id);
        await this.RefreshItems();
    }

}
