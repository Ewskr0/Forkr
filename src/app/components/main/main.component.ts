import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  images: any[];
  value: string;

  constructor(private flickrService: FlickrService) { 
  }

  ngOnInit(): void {
  }

  parentSearch(value: string) {
    if (value && value.length > 0) {
      this.value = value;
      this.flickrService.search_keyword(value)
      .toPromise()
      .then(res => {
        this.images = res;
      });
    }
  }

  parentRefresh(event: any)  { 
    this.parentSearch(this.value);
  }

  parentOnScroll(event: any) {
    if (this.value && this.value.length > 0) {
      this.flickrService.search_keyword(this.value)
      .toPromise()
      .then(res => {
        this.images = this.images.concat(res);
      });
    }
  }
}
