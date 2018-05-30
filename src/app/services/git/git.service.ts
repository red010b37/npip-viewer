import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DataService} from "../data/data.service";
import {NpipData} from "../data/npip.interface";

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
      // if there is an error we are at the end of the npip files

    }
  }


  async getNpipData():Promise<any>  {

    let url = this.buildNipUrl(this.npipCounter);

    await this._httpClient.get(url,  {
      responseType: 'text',
    }).toPromise().then((e: string) => {

      this._buildRespObj(e);

      try {

        this.npipCounter++;
        this.getNpipData();

      } catch (e) {
        // if there is an error we are at the end of the npip files
      }
    }).catch((r) => {

    });

  }

  buildName(counter: number): string {

    let strCounter = counter.toString();

    let strZ = strCounter.split('');

    for(let i =strZ.length ; i < 4 ; i++){
      strZ.unshift('0')
    }
    let str = strZ.join('');

    return `npip-${str}`;

  }

  buildNipUrl(counter): string {

    let str = this.buildName(counter);

    return `${environment.NpipUrl}${str}.mediawiki`;

  }



  private _buildRespObj(mediaWikiData: string) {

    let nData: NpipData = {} as NpipData;

    let linesArr: string[] = mediaWikiData.split('\n');

    try {
      linesArr.forEach((line) => {
        if (line.toLowerCase().indexOf('title:') != -1) {
          let titleS: string[] = line.split(":");
          nData.title = titleS[1].trim();

          throw {};
        }

      });
    } catch (e) {

    }


    try {
      linesArr.forEach((line) => {

        if (line.toLowerCase().indexOf('status:') != -1) {
          let s: string[] = line.split(":");

          nData.status = s[1].trim();
          throw {};
        }

      });
    } catch (e) {

    }

    nData.name = this.buildName(this.npipCounter);
    nData.content = this.convertMediawikiToMarkdown(mediaWikiData);
    this._dataService.npips.unshift(nData);

  }


  // thanks to https://github.com/philipashlock/mediawiki-to-markdown
  // for the base function that i modified below
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
