import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs/internal/Subject';

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
  imagesChange: Subject<boolean> = new Subject<boolean>();

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
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currPage}`;

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

  search(value: string) {
    if (value && value.length > 0) {
      this.value = value;
      this.search_keyword(this.value)
      .toPromise()
      .then(res => {
        this.images = res;
      });
    }
  }

  onScroll() {
    if (this.value && this.value.length > 0) {
      this.search_keyword(this.value)
      .toPromise()
      .then(res => {
        this.images = this.images.concat(res);
      });
    }
  }
}
