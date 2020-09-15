import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
  
export class FlickrService {
  prevKeyword: string;
  currPage = 1;
  images = [];
  value : string;
  selectedSize: string;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  constructor(private http: HttpClient) { 
  }

  search_keyword(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const paramsSize = this.selectedSize && this.selectedSize.length > 0 ? "&extras=" + this.selectedSize : '';
    const paramsDateFrom = this.selectedDateFrom  ? "&min_upload_date=" + this.selectedDateFrom.getTime()/1000 : '';
    const paramsDateTo = this.selectedDateTo  ? "&max_upload_date=" + this.selectedDateTo.getTime()/1000 : '';

    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currPage}` + paramsSize + paramsDateFrom;

    return this.http.get(url + params).pipe(map((res: FlickrOutput) => {
      const urlArr = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
          title: ph.title
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }));
  }
}
