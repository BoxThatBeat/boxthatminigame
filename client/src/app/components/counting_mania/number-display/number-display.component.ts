import { Component, Input, OnInit } from '@angular/core';
import { CountingManiaNum } from 'src/app/models/counting-mania-num';

@Component({
  selector: 'number-display',
  templateUrl: './number-display.component.html',
  styleUrls: ['./number-display.component.css']
})
export class NumberDisplayComponent implements OnInit {

  @Input() values: CountingManiaNum[] = [];

  constructor() { 
  }

  ngOnInit(): void {
  }

}
