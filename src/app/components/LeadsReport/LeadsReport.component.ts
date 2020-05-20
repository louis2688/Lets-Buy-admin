import { Component} from '@angular/core';
import { ServerService } from "../../service/serverService";
import { Link } from '../../entities/link';
import { Lead } from '../../entities/lead';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'LeadsReport',
    templateUrl: './LeadsReport.component.html',
    styleUrls: ['./LeadsReport.component.css'],
    providers: [ServerService]
})
export class LeadsReportComponent {
    public items: Lead[];
    public curLink: Link;

    constructor(private service: ServerService, activatedRoute: ActivatedRoute) {
        var linkId = activatedRoute.snapshot.params['id'];
        this.service.Get_Link_ByID(linkId).then(x => {
            if (x.isOk) {
                this.curLink = x.Singel;
            }
        });

        this.service.Get_Leads_Items(linkId,0).then(x => {
            if (x.isOk) {
                this.items = x.List;
            }
        });
    }


}
