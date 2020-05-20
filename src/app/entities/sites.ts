import { SelectableSiteCategory } from "./category";

export class Site {
    public ID: string = "";
    public Image: string;
    public Name: string;
    public Desc: string;
    public Url: string;
    public Fee: number;
    public FeeUpperLimite: number;
    public CategorySiteFees: SelectableSiteCategory[];
    public API_NAME: string;
}

