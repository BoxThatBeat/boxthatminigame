import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() titleText: string = '';
  @Input() subText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
