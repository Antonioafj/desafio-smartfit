import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})

export class FormsComponent implements OnInit{
  @Output() submitEvent = new EventEmitter();
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService,
    private filterUnitService: FilterUnitsService){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group ({
      hour: '',
      showClosed: true
    })
      this.unitService.getAllUnits().subscribe(data => {
      this.results = data;
      this.filteredResults = data;
    });
  }

  onSubmit(): void {
      let {showClosed, hour} = this.formGroup.value
      this.filteredResults = this.filterUnitService.filter(this.results, showClosed, hour);
      this.unitService.setFilteredUnits(this.filteredResults);

      this.submitEvent.emit();
  }
  
  onClean(): void {
    this.formGroup.reset();
  }
}
