import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emoji'
})
export class EmojiPipe implements PipeTransform {

  transform(value: string): any {

    switch (value)
    {
      case "perro":
        return '🐶';
      case "gato":
        return '🐱';
      default:
       return '🐾';
    }
  }

}
