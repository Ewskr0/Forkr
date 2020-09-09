import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.css']
})
  
export class SearchOptionsComponent implements OnChanges {
  @Output("parentRefresh") parentRefresh: EventEmitter<any> = new EventEmitter();

  selectedSize: string;
  constructor(private flickrService: FlickrService) { 
  }

  ngOnChanges() {
  }

  ngOnInit(): void {
  }

  sizeSelected() { 
    this.flickrService.selectedSize = this.selectedSize;
  }

  dateFromChange(event:any) {
    this.flickrService.selectedDateFrom = event.value;
  }

  dateToChange(event:any ) {
    this.flickrService.selectedDateTo = event.value;
  }
  refreshImages() { 
    this.parentRefresh.emit();
  }
}
