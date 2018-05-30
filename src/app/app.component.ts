import { Component } from '@angular/core';
import {GitService} from "./services/git/git.service";
import {DataService} from "./services/data/data.service";
import {NpipData} from "./services/data/npip.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private gitService: GitService,
    private _dataService:DataService
  ) {

  }


  get npips(): NpipData[] {
    return this._dataService.npips.reverse();
  }


}
