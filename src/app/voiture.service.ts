import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voiture } from './voiture';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VoitureService {
  private apiServerUrl = environment.apiBaseUrl;
  isAdmin = false;
  constructor(private http: HttpClient) {}

  public getVoitures(voitureID :number): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(`${this.apiServerUrl}/api/client/${voitureID}/voitures`);
  }

  public addVoiture(voiture: Voiture,voitureId:number): Observable<Voiture> {
    return this.http.post<Voiture>(`${this.apiServerUrl}/api/client/${voitureId}/voitures`, voiture);
  }

  public updateVoiture(voiture: Voiture): Observable<Voiture> {
    return this.http.put<Voiture>(
      `${this.apiServerUrl}/api/voiture/update`,
      voiture
    );
  }

  public findVoiture(voitureId: number): Observable<Voiture> {
    return this.http.get<Voiture>(
      `${this.apiServerUrl}/api/voiture/find/${voitureId}`
    );
  }

  public deleteVoiture(voitureId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/voiture/delete/${voitureId}`
    );
  }
}
