import { Component } from '@angular/core';
import {GitService} from "./services/git/git.service";
import {DataService} from "./services/data/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private gitService: GitService,
    private _dataService:DataService
  ) {

  }


  get npips(): string[] {
    return this._dataService.npips;
  }


}
