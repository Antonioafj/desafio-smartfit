import { Component, OnInit } from '@angular/core';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';

@Component({
  selector: 'app-cards-list',
  imports: [],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent implements OnInit{

  unitsList: Location []= [];

  constructor(private unitService: GetUnitsService ){

  }


  ngOnInit(): void {
    this.unitsList = this.unitService.getFilteredUnits();
    console.log(this.unitsList);
  }

}
