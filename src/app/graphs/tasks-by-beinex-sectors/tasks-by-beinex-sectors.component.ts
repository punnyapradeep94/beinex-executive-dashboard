import { Component, OnInit, ElementRef } from '@angular/core';
import * as D3 from 'd3';
@Component({
  selector: 'app-tasks-by-beinex-sectors',
  templateUrl: './tasks-by-beinex-sectors.component.html',
  styleUrls: ['./tasks-by-beinex-sectors.component.scss']
})
export class TasksByBeinexSectorsComponent implements OnInit {

  constructor(private container: ElementRef) {

  }
  ngOnInit(): void {
    let data = [];
    let data1 = [
      {
        "Strategic Affairs": 5,
        Name: "1",
        "Healthcare Workforce Sector": 3,
        "Healthcare Facilities Sector": 3,
        "5Support Services": 4
      },
      {
        "Strategic Affairs": 3,
        Name: "2",
        "Healthcare Workforce Sector": 5,
        "Healthcare Facilities Sector": 2,
        "5Support Services": 3
      },
      {
        "Strategic Affairs": 2,
        Name: "3",
        "Healthcare Workforce Sector": 2,
        "Healthcare Facilities Sector": 3,
        "5Support Services": 5
      },
      {
        "Strategic Affairs": 2,
        Name: "4",
        "Healthcare Workforce Sector": 1,
        "Healthcare Facilities Sector": 3,
        "5Support Services": 2
      }
    ];
    let groups = Object.keys(data1[0]);
    groups = groups.filter((d) =>  {
      return d != "Name";
    });

    groups.forEach((group) => {
      data.push({
        group: group
      });
    });
    data1.forEach((group) => {
      Object.keys(group).forEach((key) => {
        let dataIndex = data.findIndex((value) => {
          return value.group == key;
        });
        if (dataIndex >= 0) {
          let cunData = data[dataIndex];
          cunData[group.Name] = group[key];
        }
      })
    });

    let subgroups = Object.keys(data[0]).slice(1);

    let stackedData = D3.stack().keys(subgroups)(data);
    let subGroupsObject = subgroups.map((d) =>  {
      return {
        name: d,
        disable: true
      };
    });

    let width = 400;

    let margin = {
      top: 10,
      right: 30,
      bottom: 20,
      left: 50
    };
   

    let height = 250;
    let color = D3.scaleOrdinal(["#32ac71", "#e59e34", "#cb334c", "#255c68"]);

    let svg = D3
      .select("#chartBeinex")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let y = D3.scaleBand().domain(groups).range([height, 0]).padding(0.2);
    svg
      .append("g")
      .call(D3.axisLeft(y).tickSizeOuter(2))
      .attr("class", "yAxisClass y-axis");

    let rect = null;

    subgroups = subGroupsObject
      .filter((d) =>  {
        return d.disable;
      })
      .map((d) =>  {
        return d.name;
      });

    let groups1: any = D3
      .map(data, (d) =>  {
        return d.group;
      })
      .keys();

    // Add X axis
    stackedData = D3.stack().keys(subgroups)(data);

    //Calculate MAx val
    let mayValue = [];
    data.forEach((val) => {
      let sum = 0;
      Object.keys(val).forEach(d => {
        if (d != "group" && subgroups.includes(d)) {
          sum += val[d];
        }
      });
      mayValue.push(sum);
      sum = 0;
    });
    console.log(mayValue);
    let x = D3
      .scaleLinear()
      .domain([0, Math.round(D3.max(mayValue) / 10) * 10])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(D3.axisBottom(x).ticks(6).tickSize(-height))
      .attr("class", "xAxisClass x-axis");

    // Show the bars

    rect = svg
      .append("g")
      .attr("class", "rectArea")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", (d, i) =>  {
        return "rectBar " + d.key.replace(/ /g, ""); //+ '_' + i
      })
      .attr("fill", (d, i) =>  {
        let index = subGroupsObject.findIndex((a) => {
          return a.name == d.key;
        });
        return color(index.toString());
      });

    rect
      .selectAll("rect")
      .data((d) => {
        return d;
      })
      .enter()
      .append("rect")
      .attr("y", (d) => {
        console.log(y(d.data.group));
        return y(d.data.group);
      })
      .attr("x", (d) =>  {
        return x(d[0]);
      })
      .attr("width", (d) =>  {
        return x(d[1]) - x(d[0]);
      })
      .attr("height", y.bandwidth())
      .attr("innerText", y.bandwidth())
  }
}
