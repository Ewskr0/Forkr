import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {
 images = [];
 value : string;
 constructor(private flickrService: FlickrService) { 
   this.images = this.flickrService.images
 }

  ngOnInit(): void {
  }

  onScroll() {
    this.flickrService.onScroll;
  }
}
