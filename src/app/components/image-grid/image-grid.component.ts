import { Component, OnChanges, Input, Output, EventEmitter, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnChanges {
  @Input() images: any[];
  @Output("parentOnScroll") parentOnScroll: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog, private flickrService: FlickrService) { 
  }

 ngOnChanges() {
}
  
  onScroll() {
    this.parentOnScroll.emit();
  }

  openDialog(image: any): void {
    
    
    const dialogConfig = new MatDialogConfig();
    let photoDetails  :any;
     this.flickrService.get_details(image.id).toPromise()
    .then(res => {
      photoDetails = res;
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { title: image.title, url: image.url, details:photoDetails};
      dialogConfig.width = '350px';
      
      this.dialog.open(ImageDialogComponent,dialogConfig);
    });
  }
}

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
})
export class ImageDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  openImage(image: string) { 
    window.open(image + "_b.jpg", '_blank');
  }  
}
