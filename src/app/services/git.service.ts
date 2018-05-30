import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GitService {

  npipCounter: number = 1;

  constructor(
    private _http: HttpClient
  ) {

    this.getNpipData();
  }


  getNpipData() {



    //this._http.get();

  }

  buildNipUrl(counter): string {

    let strCounter = counter.toString();

    let strZ = strCounter.split('');

    for(let i =strZ.length ; i < 4 ; i++){
      strZ.unshift('0')
    }
    let str = strZ.join('');

    return `${environment.NpipUrl}${str}.mediawiki`;

  }

}
