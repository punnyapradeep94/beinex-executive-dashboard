import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() percentage: any;
  @Input() value: any;
  @Input() strokeColor: any;
  @Input() context: any;

  constructor() { }

  ngOnInit(): void { }

  percentageToDegrees(value: any) {
    return value / 100 * 360
  }

  progressStyle(progressStrokeSide: any) {
    return (progressStrokeSide === 'progress-left')
      ? this.percentage > 50 ? 'rotate(' + this.percentageToDegrees(this.percentage - 50) + 'deg)' : 'none'
      : this.percentage <= 50 ? 'rotate(' + this.percentageToDegrees(this.percentage) + 'deg)' : 'rotate(180deg)'
  }
}
