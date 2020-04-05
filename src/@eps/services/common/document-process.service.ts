import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class DocumentProcessService {
  data$: Observable<any[]>;
  base64Image$: Observable<any>;

  private dataSubject = new BehaviorSubject<any[]>([]);
  private imageSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.data$ = this.dataSubject.asObservable();
    this.base64Image$ = this.imageSubject.asObservable();
  }

  clearData():void{
    this.dataSubject.next([]);
  }

  updateData(data: any[]): void {
    this.dataSubject.next(data);
  }

  parseExcelFile(file: File): void {
    const fileReader = new FileReader();

    fileReader.onload = (event: any): any => {
      const bstr = event.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* convert worksheet to json data */
      const jsonData = this.workSheetToExcel(ws);
      // update dataSubject
      this.clearData();
      this.updateData(jsonData);
    };

    fileReader.onerror = (event: any): any => {
      console.error('File could not be read! Code: ' + event.target.error.code);
    };

    fileReader.readAsBinaryString(file);
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  parseImageFile(file: File): void {
    const fileReader = new FileReader();

    fileReader.onload = (event: any): any => {
      const result = event.target.result;
      this.imageSubject.next(result);
    };

    fileReader.onerror = (event: any): any => {
      console.error('File could not be read! Code: ' + event.target.error.code);
    };

    fileReader.readAsDataURL(file);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const currDate = moment().toDate();
    FileSaver.saveAs(data, fileName + '_export_' + currDate.getTime() + EXCEL_EXTENSION);
  }

  private workSheetToExcel(ws: XLSX.WorkSheet): any[] {
    const jsonData = XLSX.utils.sheet_to_json(ws);
    return jsonData;
  }
}
