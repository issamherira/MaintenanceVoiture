import { Component, OnInit } from '@angular/core';
import { Client } from '../../client';
import { ClientService } from '../../client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {public clients: Client[];
  public editClient: Client;
  public deleteClient: Client;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getClients();
  }

  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddClient(addForm: NgForm): void {
    document.getElementById('add-client-form').click();
    this.clientService.addClient(addForm.value).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateClient(client: Client): void {
    this.clientService.updateClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(
      (response: void) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchClients(key: string): void {
    console.log(key);
    let results: Client[] = [];
    for (const client of this.clients) {
      if (
        client.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      //  client.marque.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      //  client.matricule.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        client.numTelephone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(client);
      }
    }
    this.clients = results;
    if (results.length === 0 || !key) {
      this.getClients();
    }
  }

  public onOpenModal(client: Client, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addClientModal');
    }
    if (mode === 'edit') {
      this.editClient = client;
      button.setAttribute('data-target', '#updateClientModal');
    }
    if (mode === 'delete') {
      this.deleteClient = client;
      button.setAttribute('data-target', '#deleteClientModal');
    }
    container.appendChild(button);
    button.click();
  }
}
