import { Component, Input, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { GraphModel } from 'src/app/Models/GraphModel';

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss'],
})
export class GraphCardComponent implements OnInit {
  @Input() single!: GraphModel[];
  view: [number, number] = [350, 170];
  legendPosition: LegendPosition = LegendPosition.Below;
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#FF5733', '#4DFF6E', '#4DB3FF'],
  };
  @Input() Phrase!: string;
  constructor() {}

  ngOnInit(): void {}
}
