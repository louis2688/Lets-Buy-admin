import { Component} from '@angular/core';
import { ServerService } from "../../service/serverService";
import { Sale, Profit } from '../../entities/sale';
@Component({
    selector: 'ProfitReport',
    templateUrl: './ProfitReport.component.html',
    styleUrls: ['./ProfitReport.component.css'],
    providers: [ServerService]
})
export class ProfitReportComponent {
    public items: Profit[];
    public home: Profit;

    public pages: number[] = [];
    public currentPage: number = 0;
    public searchInput: string = "";
    public setSearchInput: string = "";

    constructor(private service: ServerService) {
        this.RefreshItems();
        this.service.Get_Home_Profit_Items().then(x=>{
            if(x.isOk){
                this.home = x.Singel;
            }
        })
    }

    async RefreshItems() {
        this.service.Get_Profit_Items(this.currentPage, this.setSearchInput).then(x => {
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
}
