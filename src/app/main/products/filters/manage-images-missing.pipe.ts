import { Pipe, PipeTransform } from '@angular/core';
import { IStockItems } from '@eps/models';

@Pipe({
  name: 'imageMissing',
})
export class ImagesMissingFilterPipe implements PipeTransform {
  transform(items: IStockItems[], missingInd: boolean): any {
    if (!missingInd) {
      return items;
    }
    return items.filter(item => (item.photosCount > 0 ? false : true));
  }
}
