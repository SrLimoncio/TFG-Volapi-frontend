import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const TimeLineChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    // Convertir las fechas de cadena a objetos Date
    const parsedData = data.map((d) => ({
      ...d,
      date: new Date(d.date), // Asegúrate de que esto corresponda al formato de tus fechas
    }));

    // Dimensiones y márgenes
    const width = 1400;
    const height = 800;
    const marginTop = 20;
    const marginRight = 150;
    const marginBottom = 70;
    const marginLeft = 40;

    // Escalas
    const x = d3
      .scaleUtc()
      .domain(d3.extent(parsedData, (d) => d.date))
      .range([marginLeft, width - marginRight]);
    const y = d3
      .scaleLog()
      .domain([1, d3.max(parsedData, (d) => d.count)]) // Asegúrate de que el dominio no incluya el valor 0
      .range([height - marginBottom, marginTop]);

    // Generador de línea
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.count));

    // Limpiar el contenedor
    d3.select(ref.current).selectAll("*").remove();

    // Crear contenedor SVG
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif");

    // Agregar ejes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d-%m-%Y %H:%M")))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-35)");

      svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40, ","))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call((g) => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Number of events"));

    // Agregar la línea
    svg
      .append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Tooltip
    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("opacity", 0);

    tooltip
      .append("rect")
      .attr("width", 160)
      .attr("height", 50)
      .attr("fill", "black")
      .style("opacity", 0.8);

    const tooltipText = tooltip
      .append("text")
      .attr("x", 75)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "white");

    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height)
      .style("opacity", 0)
      .on("mouseover", () => tooltip.style("opacity", 1))
      .on("mouseout", () => tooltip.style("opacity", 0))
      .on("mousemove", mousemove);

    /*function mousemove(event) {
      const x0 = x.invert(d3.pointer(event)[0]),
        bisectDate = d3.bisector((d) => d.date).left,
        i = Math.min(parsedData.length - 1, bisectDate(parsedData, x0, 1)),
        d0 = parsedData[i - 1],
        d1 = parsedData[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      tooltip.attr(
        "transform",
        `translate(${x(d.date) - 30},${y(d.count) - 30})`
      );
      tooltip.select("text").text(`${d.count} eventos`);
    }*/

    function mousemove(event) {
        const x0 = x.invert(d3.pointer(event)[0]),
          bisectDate = d3.bisector((d) => d.date).left,
          i = bisectDate(parsedData, x0, 1),
          d0 = parsedData[i - 1],
          d1 = parsedData[i] || d0;
  
        const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  
        tooltip.attr("transform", `translate(${x(d.date)},${y(d.count)})`);
        tooltipText.html("");
        tooltipText
          .append("tspan")
          .attr("x", 81)
          .attr("y", 5)
          .text(`Date: ${d3.timeFormat("%d-%m-%Y %H:%M")(d.date)}`);
        tooltipText
          .append("tspan")
          .attr("x", 40)
          .attr("y", 40)
          .text(`Events: ${d.count}`);
      }
  }, [data]);

  return <div className="section-content-data" ref={ref}></div>;
};

export default TimeLineChart;
