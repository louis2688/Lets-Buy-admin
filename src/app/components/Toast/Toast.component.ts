import { Component, Input } from '@angular/core';
//import * as $ from 'jquery';

@Component({
    selector: 'Toast',
    templateUrl: './Toast.component.html',
    styleUrls: ['./Toast.component.css']

})

export class ToastComponent {
    isDisplay: boolean;
    timeoutID: number;
    @Input() content: string;
    _alertType: string = "";

    ToggleToast(_content: string, _alertType: string = "alert-info") {
        this._alertType = _alertType;
        clearTimeout(this.timeoutID);
        this.isDisplay = true;
        this.content = _content;
        this.timeoutID = setTimeout(() => { this.isDisplay = false; }, 5000);
    }

    constructor() {

    }
   
    SetClaas() {
        var classAttr = "content alert " + this._alertType;
        if (this.isDisplay) {
            classAttr += ' show';
        }
        return classAttr;
        
    }
}
