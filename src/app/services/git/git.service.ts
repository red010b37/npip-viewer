import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DataService} from "../data/data.service";

@Injectable({
  providedIn: 'root'
})
export class GitService {

  npipCounter: number = 1;

  constructor(
    private _httpClient: HttpClient,
    private _dataService: DataService
  ) {

    try {
      this.getNpipData();
    } catch (e) {
      debugger
    }
  }


  async getNpipData():Promise<any>  {

    debugger

    let url = this.buildNipUrl(this.npipCounter);

    this.npipCounter++;

    await this._httpClient.get(url,  {
      responseType: 'text',
    }).toPromise().then((e: string) => {

      this._dataService.npips.push(this.convertMediawikiToMarkdown(e));

      debugger
      try {
        this.getNpipData();
      } catch (e) {
        debugger
      }
    }).catch((r) => {
      debugger
    });

  }

  buildNipUrl(counter): string {

    let strCounter = counter.toString();

    let strZ = strCounter.split('');

    for(let i =strZ.length ; i < 4 ; i++){
      strZ.unshift('0')
    }
    let str = strZ.join('');

    return `${environment.NpipUrl}npip-${str}.mediawiki`;

  }



  convertMediawikiToMarkdown(wikiDataToConvert):string {

    // convert "==Heading 2==" to "# Heading 2" etc.
    wikiDataToConvert = wikiDataToConvert.replace(/=====\s*(.*)\s*=====/g, "#### $1\n\n");
    wikiDataToConvert = wikiDataToConvert.replace(/====\s*(.*)\s*====/g, "### $1\n\n");
    wikiDataToConvert = wikiDataToConvert.replace(/===\s*(.*)\s*===/g, "## $1");
    wikiDataToConvert = wikiDataToConvert.replace(/==\s*(.*)\s*==/g, "# $1");
    // convert
    // "[http://coding.smashingmagazine.com/2012/04/20/decoupling-html-from-css/ Decoupling HTML From CSS]"
    // to
    // "[Decoupling HTML From CSS](http://coding.smashingmagazine.com/2012/04/20/decoupling-html-from-css/)"
    // '[^\s]*' matches the URL, '([^\]]*)' machtes everything else till the first closing brakcet ']'
    wikiDataToConvert = wikiDataToConvert.replace(/\[([^\s]*)\s([^\]]*)\]/g, "[$2]($1)");
    // convert '**' into '    *'
    wikiDataToConvert = wikiDataToConvert.replace(/\*\*/g, "    *");

    // show the converted text
    return wikiDataToConvert
  }

}
