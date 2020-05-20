import { Question } from "../entities/faq";
import { Pipe, Injectable, PipeTransform } from "@angular/core";

@Pipe({
    name: 'QuetionsFilter'
})
@Injectable()
export class QuetionsFilter implements PipeTransform {
    transform(items: Question[], filter: string): any {
        filter = filter.toLowerCase();
        items = items.filter(x => x.classification.toLowerCase().indexOf(filter) >= 0);
        return items;
    }
}