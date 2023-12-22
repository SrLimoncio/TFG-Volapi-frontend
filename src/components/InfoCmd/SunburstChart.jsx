import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SunburstChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Crear el gráfico de sunburst
    const createSunburstChart = () => {
      const width = 928;
      const height = width;
      const radius = width / 6;

      const color = d3.scaleOrdinal(
        d3.quantize(d3.interpolateRainbow, data.children.length + 1)
      );

      const hierarchy = d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);

      const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(
        hierarchy
      );
      root.each((d) => (d.current = d));

      const arc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius((d) => d.y0 * radius)
        .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

      const svg = d3
        .create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, width])
        .style("font", "10px sans-serif");

      const path = svg
        .append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", (d) => {
          while (d.depth > 1) d = d.parent;
          return color(d.data.name);
        })
        .attr("fill-opacity", (d) =>
          arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
        )
        .attr("pointer-events", (d) =>
          arcVisible(d.current) ? "auto" : "none"
        )
        .attr("d", (d) => arc(d.current));

      path
        .filter((d) => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);

      const format = d3.format(",d");
      path.append("title").text(d => {
        // Construyendo la cadena de texto para el tooltip
        let tooltipText = `${d
                            .ancestors()
                            .map(d => d.data.name)
                            .reverse()
                            .join("/")}`;
      
        // Añadiendo información adicional
        if (d.data.pid) {
          tooltipText += `\nPID: ${d.data.pid}`;
        }
        if (d.data.createTime) {
          tooltipText += `\nCreate Time: ${d.data.createTime}`;
        }
        if (d.data.exiteTime) {
          tooltipText += `\nExite Time: ${d.data.exiteTime}`;
        }
        
        tooltipText += `\nThreads: ${d.data.threads}`;
        
        //tooltipText += `\nThreads: ${format(d.value) - 1}`;
      
        return tooltipText;
      });

      const label = svg
        .append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", (d) => +labelVisible(d.current))
        .attr("transform", (d) => labelTransform(d.current))
        .text((d) => d.data.name);

      const parent = svg
        .append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

      function clicked(event, p) {
        parent.datum(p.parent || root);

        root.each(
          (d) =>
            (d.target = {
              x0:
                Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
                2 *
                Math.PI,
              x1:
                Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
                2 *
                Math.PI,
              y0: Math.max(0, d.y0 - p.depth),
              y1: Math.max(0, d.y1 - p.depth),
            })
        );

        const t = svg.transition().duration(750);

        path
          .transition(t)
          .tween("data", (d) => {
            const i = d3.interpolate(d.current, d.target);
            return (t) => (d.current = i(t));
          })
          .filter(function (d) {
            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
          })
          .attr("fill-opacity", (d) =>
            arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
          )
          .attr("pointer-events", (d) =>
            arcVisible(d.target) ? "auto" : "none"
          )
          .attrTween("d", (d) => () => arc(d.current));

        label
          .filter(function (d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
          })
          .transition(t)
          .attr("fill-opacity", (d) => +labelVisible(d.target))
          .attrTween("transform", (d) => () => labelTransform(d.current));
      }

      function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }

      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
      }

      function labelTransform(d) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = ((d.y0 + d.y1) / 2) * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${
          x < 180 ? 0 : 180
        })`;
      }

      // Adjuntar el gráfico al elemento DOM referenciado por chartRef
      chartRef.current.appendChild(svg.node());
    };

    createSunburstChart();
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default SunburstChart;
