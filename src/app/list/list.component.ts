import { Component, OnInit } from '@angular/core';
import { Voiture } from '../voiture';
import { VoitureService } from '../voiture.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public voitures: Voiture[];
  public editVoiture: Voiture;
  public deleteVoiture: Voiture;
idclient
  constructor(private voitureService: VoitureService,private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params=>
      {const id=+params.get('id');
      console.log(id)
      this.idclient=id
    });
  
    this.getVoitures();
  }

  public getVoitures(): void {
    this.voitureService.getVoitures(this.idclient).subscribe(
      (response: Voiture[]) => {
       
        this.voitures = response;
        console.log(this.voitures);
        console.log(this.idclient)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddVoiture(addForm: NgForm): void {
    document.getElementById('add-voiture-form').click();
    this.voitureService.addVoiture(addForm.value,this.idclient).subscribe(
      (response: Voiture) => {
        console.log(response);
        this.getVoitures();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateVoiture(voiture: Voiture): void {
    this.voitureService.updateVoiture(voiture).subscribe(
      (response: Voiture) => {
        console.log(response);
        this.getVoitures();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteVoiture(voitureId: number): void {
    this.voitureService.deleteVoiture(voitureId).subscribe(
      (response: void) => {
        console.log(response);
        this.getVoitures();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchVoitures(key: string): void {
    console.log(key);
    let results: Voiture[] = [];
    for (const voiture of this.voitures) {
      if (
        voiture.client.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        voiture.marque.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        voiture.matricule.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        voiture.numTelephone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(voiture);
      }
    }
    this.voitures = results;
    if (results.length === 0 || !key) {
      this.getVoitures();
    }
  }

  public onOpenModal(voiture: Voiture, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addVoitureModal');
    }
    if (mode === 'edit') {
      this.editVoiture = voiture;
      button.setAttribute('data-target', '#updateVoitureModal');
    }
    if (mode === 'delete') {
      this.deleteVoiture = voiture;
      button.setAttribute('data-target', '#deleteVoitureModal');
    }
    container.appendChild(button);
    button.click();
  }
}
