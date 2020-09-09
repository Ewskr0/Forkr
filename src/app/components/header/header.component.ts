import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() parentSearch = new EventEmitter<string>();

  ngOnInit(){
  }

  search(event: any) {
    this.parentSearch.emit(event.target.value.toLowerCase());
  }

}
