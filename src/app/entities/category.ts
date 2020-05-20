
export class SelectableCategory {
    public id: string;
    public name: string;
    public parentID: string;
    public sub_categories: SelectableCategory[];
    public itemChange: boolean;
    public needToSave: boolean;
    public chacked: boolean;
    public isOpen: boolean;

}

export class SelectableSiteCategory {
    public ID: string;
    public CategoryID: string;
    public Name: string;
    public itemChange: boolean;
    public needToSave: boolean;
    public chacked: boolean;
    public isOpen: boolean;

}


export class Location {
    public ID: number;
    public Name: string;
}

export class Language {
    public ID: number;
    public DispalyName: string;
    public chacked: boolean;

    constructor(_DispalyName: string) {
        this.DispalyName = _DispalyName;
    }
}


export class Dictionary {
    public key: string;
    public value: string;

    constructor(_key: string, _value: string) {
        this.key = _key;
        this.value = _value;
    }

}
export class SelectableDictionary extends Dictionary {
    public selected: boolean;
    constructor(_key: string, _value: string) {
        super(_key, _value);
    }

}