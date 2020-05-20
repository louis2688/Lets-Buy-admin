import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ServerService } from "../../service/serverService";
import { Question } from "../../entities/faq";
import { ToastComponent } from "../Toast/Toast.component";

@Component({
    selector: 'EditFaq',
    templateUrl: './EditFaq.component.html',
    styleUrls: ['./EditFaq.component.css'],
    providers: [ServerService]
})
export class EditFaqComponent {
    public items: Question[];
    public itemToDelete: Question;
    public itemToAdd: Question = new Question();
    @ViewChild(ToastComponent) Toast: ToastComponent;

    constructor(private service: ServerService) {
        this.Refrash();
    }
    Refrash() {
        this.service.Get_FAQ_Items().then(x => {
            if (x.isOk) {
                this.items = x.List;
            }
        });
    }
    ValidationItem(item: Question) {
        if (item.answer == "" || item.question == "" || !item.answer || !item.question || item.classification == "" || !item.classification) {
            return false;
        }
        return true;
    }
    SetItemToDelete(item: Question) {
        this.itemToDelete = item;
    }
    async DeleteItem() {
        if (this.itemToDelete) {
            await this.service.DeleteQuetion(this.itemToDelete);
            this.Refrash();
            this.Toast.ToggleToast("Delete successful", "alert-info");
        }
    }

    AddItem() {
        if (this.ValidationItem(this.itemToAdd)) {
            this.service.AddQuetion(this.itemToAdd).then(x => {
                if (x.isOk) {
                    this.Toast.ToggleToast("Saved successfully", "alert-success");
                    this.Refrash();
                    this.itemToAdd = new Question();
                }
                else {
                    this.Toast.ToggleToast(x.Errors[0].Value);
                }
            });
            
        }
        else {
            this.Toast.ToggleToast("Failed to save. <br/> You have to enter question and answer!", "alert-danger");
        }
    }

    UpdateItem(item: Question) {
        if (this.ValidationItem(item)) {
            this.service.UpdateQuetion(item);
            this.Toast.ToggleToast("Saved successfully", "alert-success");
        }
        else {
            this.Toast.ToggleToast("Failed to save. <br/> You have to enter question and answer!", "alert-danger");
        }

    }
}
