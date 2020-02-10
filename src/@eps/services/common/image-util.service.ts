import { ElementRef, Injectable } from '@angular/core';
import { NgxPicaService, NgxPicaErrorInterface } from '@digitalascetic/ngx-pica';

@Injectable({
  providedIn: 'root',
})
export class ImageUtils {
  constructor(private _ngxPicaService: NgxPicaService) {}

  toBase64(file: File, cb: Function): void {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (event: any): void => {
      const base64Data = event.target.result.substr(event.target.result.indexOf('base64,') + 'base64,'.length);
      cb(base64Data);
    };

    fileReader.readAsDataURL(file);
  }

  handleFiles(event: any, entity, field: string, isImage: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        const files: File[] = event.target.files;
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          this._ngxPicaService.resizeImages(files, 256, 256).subscribe(
            (imageResized: File) => {
              this.toBase64(imageResized, base64Data => {
                entity[field] = base64Data;
                entity[`${field}ContentType`] = file.type;
                resolve(entity);
              });
            },
            (err: NgxPicaErrorInterface) => {
              reject(err.err);
            }
          );
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    });
  }
}
