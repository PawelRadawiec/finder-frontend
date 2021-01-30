import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: 'shortText' })
export class ShortTextPipe implements PipeTransform {

    transform(value: any, maxLength: number) {
        if (value && value.length >= maxLength) {
            value = value.substring(0, maxLength) + '...';
            console.log('value: ', value);
        }
        return value;
    }

}