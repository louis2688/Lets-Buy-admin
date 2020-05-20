import { SelectableCategory } from "./category";

export class User {
    public id: string;
    public firstName: string;
    public lastName: string;
    public nickname: string;
    public bank: string;
    public email: string;
    public imageUrl: string;
    public birthday: Date;
    public specialitiesList: SelectableCategory[];
    public langList: string[];
    public location: string;
    public registerBy: string;
    public registerDate: string;
    public isBlocked: boolean;
    public affiliateRate: number;
    public isAdviser: boolean;
}