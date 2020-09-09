import { Component, OnChanges, Input, Output, EventEmitter, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnChanges {
  @Input() images: any[];
  @Output("parentOnScroll") parentOnScroll: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { 
 }
//"{{ image.url }}_b.jpg
 ngOnChanges() {
}
  
  onScroll() {
    this.parentOnScroll.emit();
  }

  openDialog(image: any): void {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { title: image.title, url: image.url };
    dialogConfig.width = '250px';
    
    this.dialog.open(ImageDialogComponent,dialogConfig);
  }
}


@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
})
export class ImageDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
