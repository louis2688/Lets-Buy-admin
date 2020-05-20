import { Component, ViewChild } from '@angular/core';
import { ServerService } from "../../service/serverService";
import { SelectableCategory } from "../../entities/category";
import { ToastComponent } from "../Toast/Toast.component";


@Component({
    selector: 'EditCategories',
    templateUrl: './EditCategories.component.html',
    styleUrls: ['./EditCategories.component.css'],
    providers: [ServerService]
})
export class EditCategoriesComponent {
    public items: SelectableCategory[];
    public itemToDelete: SelectableCategory;
    public itemToAdd: SelectableCategory = new SelectableCategory();

    @ViewChild(ToastComponent) Toast: ToastComponent;

    constructor(private service: ServerService) {
        this.service.Get_Categories_Items().then(x => {
            if (x.isOk) {
                this.items = x.List;
            }
        });
    }
    ValidationItem(item: SelectableCategory) {
        return true;
    }
    SetItemToDelete(item: SelectableCategory) {
        this.itemToDelete = item;
    }
    DeleteItem() {
        if (this.itemToDelete) {
            this.service.DeleteCategory(this.itemToDelete).then(x => {
                if (x.isOk) {
                    var index = this.items.indexOf(this.itemToDelete, 0);
                    if (index > -1) {
                        this.items.splice(index, 1);
                    }
                }
                else {
                    this.Toast.ToggleToast(x.Errors[0].Value);
                }
            })

            this.service.DeleteCategory(this.itemToDelete);

        }
    }
    AddItem() {
        if (this.ValidationItem(this.itemToAdd)) {
            this.service.AddCategory(this.itemToAdd).then(x => {
                if (x.isOk) {
                    this.items.unshift(x.Singel);
                    this.itemToAdd = new SelectableCategory();
                }
                else {
                    this.Toast.ToggleToast(x.Errors[0].Value);
                }
            });
        }
    }
    async UpdateItem(item: SelectableCategory) {
        try {
            if (item.itemChange) {
                var _updateMain = await this.service.UpdateCategory(item);
                if (_updateMain.isOk) {
                    item.itemChange = false;
                }
                else {
                    throw new Error(_updateMain.Errors[0].Value);
                }
            }
            item.sub_categories.forEach(async (x: SelectableCategory,i) => {
                if (x.itemChange) {
                    var _updateSub = await this.service.UpdateSubCategory(x, item.id);
                    if (_updateSub.isOk) {
                        item.sub_categories[i].id = _updateSub.Singel.id;
                        item.sub_categories[i].name = _updateSub.Singel.name;
                        item.sub_categories[i].itemChange = false;
                    }
                    else {
                        throw new Error(_updateSub.Errors[0].Value);
                    }
                }
            })
            item.needToSave = false;
        } catch (e) {
            this.Toast.ToggleToast(e);
        }

        
    }
    AddMoreSubCat(item: SelectableCategory) {
        if (!item.sub_categories) {
            item.sub_categories = new Array<SelectableCategory>();
        }
        
        var _newCat = new SelectableCategory();
        _newCat.itemChange = true;
        _newCat.parentID = item.id;
        item.sub_categories.push(_newCat);
        item.needToSave = true;
    }
    RemoveSubCat(item: SelectableCategory, i: number) {
        var obj = item.sub_categories[i];
        this.service.DeleteCategory(obj).then(x => {
            if (x.isOk) {
                item.sub_categories.splice(i, 1);
            }
            else {
                this.Toast.ToggleToast(x.Errors[0].Value);
            }
        })
        
    }

    ItemChanged(item: SelectableCategory, parent: SelectableCategory) {
        item.itemChange  = true;
        parent.needToSave = true;
    }

    MainItemChanged(item: SelectableCategory) {
        item.itemChange = true;
        item.needToSave = true;
    }
}
