import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'TopMenu',
    templateUrl: './TopMenu.component.html',
    styleUrls: ['./TopMenu.component.css']
})
export class TopMenuComponent {
    public tabActive: number;
    @Input() _pageName: string = "Page Name";
    @Output() _tabChecked = new EventEmitter<number>();

    constructor() {

    }

    TabChecked(i: number) {
        this.tabActive = i;
        this._tabChecked.emit(i);
    }

}
