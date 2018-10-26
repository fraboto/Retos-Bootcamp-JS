import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, arg1: string, arg2: string): any {
    if(!value)
    {
      return;
    }
    if(!arg1)
    {
      return value;
    }
    arg1 = arg1.toLowerCase();

    if(arg2 !== "")
    {
      return value.filter((item) => {
        return JSON.stringify(item[arg2]).toLocaleLowerCase().includes(arg1);
      });
    } 
    else
    {
      return value.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(arg1);
      });
    }
  }

}
