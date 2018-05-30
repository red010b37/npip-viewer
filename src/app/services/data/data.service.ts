import { Injectable } from '@angular/core';
import {NpipData} from "./npip.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  npips: NpipData[] = [];

}
