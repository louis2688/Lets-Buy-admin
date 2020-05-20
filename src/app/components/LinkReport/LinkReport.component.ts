import { Component} from '@angular/core';
import { ServerService } from "../../service/serverService";
import { Link } from '../../entities/link';
import { Router } from '@angular/router';
@Component({
    selector: 'LinkReport',
    templateUrl: './LinkReport.component.html',
    styleUrls: ['./LinkReport.component.css'],
    providers: [ServerService]
})
export class LinkReportComponent {
    public items: Link[];
    public pages: number[] = [];
    public currentPage: number = 0;
    public searchInput: string = "";
    public setSearchInput: string = "";

    constructor(private service: ServerService, private nav: Router) {
        this.RefreshItems();
    }

    async RefreshItems() {
        this.service.Get_Links_Items(this.currentPage, this.setSearchInput).then(x => {
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

    ShowLeads(linkId: string) {
        this.nav.navigate(['/LeadsReport', linkId]);
    }
}
