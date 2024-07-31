import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpConnectorService } from './http-connector.service';

describe('HttpConnectorService', () => {
  let service: HttpConnectorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpConnectorService]
    });
    service = TestBed.inject(HttpConnectorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request and return the expected response', () => {
    const mockResponse = { data: 'test' };
    const testUrl = 'https://api.example.com/test';

    service.get(testUrl).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
