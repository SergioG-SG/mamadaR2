import React from "react";
import CanvasJSReact from "./canvasjs-3.2.9/canvasjs.react";

export default function GraficaDona({ datosJS }) {
  if (datosJS === undefined) {
    datosJS = {
      titulo: "No Hay Datos Aun",
      data: [],
    };
  }
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  var dataPoint;
  var total = 0;
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: datosJS.titulo,
    },
    subtitles: [
      {
        text: "",
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "pie",
        showInLegend: true,
        indexLabel: "{name} ({percentage}%)",
        toolTipContent: "<b>{name}</b>: {y} <b>({percentage}%)</b>",
        dataPoints: datosJS.data,
      },
    ],
  };
  //calculate percentage
  dataPoint = options.data[0].dataPoints;
  for (let index = 0; index < dataPoint.length; index++) {
    total = total + parseInt(dataPoint[index].y);
  }
  for (var i = 0; i < dataPoint.length; i++) {
    options.data[0].dataPoints[i].percentage = (
      (parseInt(dataPoint[i].y) / total) *
      100
    ).toFixed(2);
  }
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}
