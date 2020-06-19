import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lux-canvas-lib';
  public circleOptions = {
    backgroundColor: '#262a36',
    fillHeightPercentage: 70,
    fillWightPercentage: 70,
    radius: 200
  };
  public valueOptions = {
    maxValue: 50,
    displayZoneLine: true,
    zones: [
      {
        maxPointValue: 25,
        zoneColor: '#259a10',
        textColor: '#e1ac08'
      },
      {
        maxPointValue: 50,
        zoneColor: '#b9081d',
        textColor: '#e1ac08'
      },
      {
        maxPointValue: 45,
        zoneColor: '#161825',
        textColor: '#e1ac08'
      },
      {
        maxPointValue: 10,
        zoneColor: '#fff76c',
        textColor: '#e1ac08'
      },
    ]
  };
  public isStartFromCenter = false;
  public dynamicForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public appService: AppService) {
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      zones: new FormArray([])
    });
    this.valueOptions.zones.forEach(el => {
      this.zones.push(this.formBuilder.group({
        maxPointValue: [el.maxPointValue, Validators.required],
        zoneColor: [el.zoneColor, Validators.required],
        textColor: [el.textColor, [Validators.required]]
      }));
    });
  }

  get formControls() {
    return this.dynamicForm.controls;
  }

  get zones() {
    return this.formControls.zones as FormArray;
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      return;
    }
    this.valueOptions.zones = this.dynamicForm.value.zones;
  }

  onAdd() {
    this.zones.push(this.formBuilder.group({
      maxPointValue: ['', Validators.required],
      zoneColor: ['', Validators.required],
      textColor: ['', [Validators.required]]
    }));
  }

  onDelete(zone: number) {
    this.zones.removeAt(zone);
  }

}
