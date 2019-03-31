import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../environments/environment';

export interface ICapabilities {
  strategies: string[];
}

const baseUrl = `${environment.baseUri}/api/v1/capabilities`;

@Injectable({
  providedIn: 'root'
})
export class CapabilitiesService {
  capabilitiesSubject = new Subject<ICapabilities>();
  capabilities$ = this.capabilitiesSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getCapabilities(): void {
    this.httpClient.get<ICapabilities>(`${baseUrl}`)
      .subscribe(caps => {
          caps.strategies = caps.strategies.sort();
          this.capabilitiesSubject.next(caps);
        },
        (error => console.log(error))
      );
  }

}
