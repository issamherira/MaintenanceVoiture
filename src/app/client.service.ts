import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiServerUrl = environment.apiBaseUrl;
  isAdmin = false;
  constructor(private http: HttpClient) {}

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}/api/client/all`);
  }

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerUrl}/api/client/add`, client);
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(
      `${this.apiServerUrl}/api/client/update`,
      client
    );
  }

  public findClient(clientId: number): Observable<Client> {
    return this.http.get<Client>(
      `${this.apiServerUrl}/api/client/find/${clientId}`
    );
  }

  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/client/delete/${clientId}`
    );
  }
}
