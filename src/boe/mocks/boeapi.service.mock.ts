import { Observable, of } from 'rxjs';

export class mockBoeApiService {
  obtenerSumario = (idSumario: string): Observable<any> => of({});
  obtenerBoe = (boeId: string): Observable<any> => of({});
  obtenerAnuncio = (anuncioID: string): Observable<any> => of({});
  obtenerContrato = (contratoId: string): Observable<any> => of({});
}
