import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../voiture.service';
import { Voiture } from '../voiture';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id: number;
  voiture: Voiture;

  constructor(
    public voitureService: VoitureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['voitureId'];

    this.voitureService.findVoiture(this.id).subscribe((res) => {
      this.voiture = res;
    });
  }
}
