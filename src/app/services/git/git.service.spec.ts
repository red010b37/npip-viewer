import { TestBed, inject } from '@angular/core/testing';

import { GitService } from './git.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";

describe('GitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GitService]
    });
  });

  it('should be created', inject([GitService], (service: GitService) => {
    expect(service).toBeTruthy();
  }));


  describe('buildNipUrl()', () => {

    beforeEach(() => {
      environment.NpipUrl = 'url/';
    });

    it('should build url correctly passing 1', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0001.mediawiki`;
      expect(service.buildNipUrl(1)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 5', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0005.mediawiki`;
      expect(service.buildNipUrl(5)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 9', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0009.mediawiki`;
      expect(service.buildNipUrl(9)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 10', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0010.mediawiki`;
      expect(service.buildNipUrl(10)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 57', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0057.mediawiki`;
      expect(service.buildNipUrl(57)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 99', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0099.mediawiki`;
      expect(service.buildNipUrl(99)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 100', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0100.mediawiki`;
      expect(service.buildNipUrl(100)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 692', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0692.mediawiki`;
      expect(service.buildNipUrl(692)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 999', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}0999.mediawiki`;
      expect(service.buildNipUrl(999)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 1000', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}1000.mediawiki`;
      expect(service.buildNipUrl(1000)).toEqual(expectUrl);
    }));

    it('should build url correctly passing 8975', inject([GitService], (service: GitService) => {
      let expectUrl = `${environment.NpipUrl}8975.mediawiki`;
      expect(service.buildNipUrl(8975)).toEqual(expectUrl);
    }));

  });

});
