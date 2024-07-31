import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpConnectorService {
  private _httpClient = inject(HttpClient);

  get(url: string) {
    return this._httpClient.get(url);
  }
}
