import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  default_value = "random";

  ngOnInit(){
  }
  constructor(private flickrService: FlickrService) { }

  search(event: any) {
    this.flickrService.search(event.target.value.toLowerCase());
  }

}
