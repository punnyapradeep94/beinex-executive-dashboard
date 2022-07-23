import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as D3 from 'd3';

@Component({
  selector: 'app-tasks-distribution',
  templateUrl: './tasks-distribution.component.html',
  styleUrls: ['./tasks-distribution.component.scss']
})
export class TasksDistributionComponent implements OnInit {

  @ViewChild("piechart") element: ElementRef<HTMLElement> = {} as ElementRef;
  private margin = { top: 10, right: 30, bottom: 30, left: 40 };
  private width = 450;
  private height = 450;
  private svg: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  private data: any = [
    {
      label: 'test0',
      value: '35'
    },
    {
      label: 'test2',
      value: '65'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createSvg();
    this.createColors(this.data);
    this.drawChart();
  }


  createSvg() {
    this.svg = D3
      .select("figure#donut")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      )
      .on('mouseover', (d, i) => {
        D3.select("figure#donut").transition()
          .duration(50)
          .attr('opacity', '.85')
      })
      .on('mouseout', (d, i) => {
        D3.select("figure#donut").transition()
          .duration(50)
          .attr('opacity', '1');
      })
  }

  private createColors(data: any): void {
    let index = 0;
    const defaultColors = [
      "#255c68",
      "#65969a"
    ];

    const colorsRange: any = [];
    this.data.forEach((element: any) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = D3
      .scaleOrdinal()
      .domain(data.map((d: any) => d.value.toString()))
      .range(colorsRange);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    let pie = D3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d: any) => {
        return d.value;
      });
    let data_ready = pie(this.data);

    // The arc generator
    let arc = D3
      .arc()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    let outerArc = D3
      .arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => this.colors(d.data.value))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

  }
}
