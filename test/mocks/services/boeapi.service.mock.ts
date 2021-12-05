import { Observable, of } from 'rxjs';

export class mockBoeApiService {
  getSumario = (idSumario: string): Observable<any> => of({});
  getBoe = (boeId: string): Observable<any> => of({});
  getAnuncio = (anuncioID: string): Observable<any> => of({});
  getContrato = (contratoId: string): Observable<any> => of({});
}
