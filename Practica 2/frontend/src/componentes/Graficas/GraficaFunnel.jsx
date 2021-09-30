import React from "react";
import CanvasJSReact from "./canvasjs-3.2.9/canvasjs.react";

export default function GraficaFunnel({ datosJS }) {
  if (datosJS === undefined) {
    datosJS = {
      titulo: "No Hay Datos Aun",
      data: [],
    };
  }
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  var dataPoint;
  var total = 0;
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", //"light1", "dark1", "dark2"
    title: {
      text: datosJS.titulo,
    },
    data: [
      {
        type: "funnel",
        toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
        indexLabelPlacement: "inside",
        indexLabel: "{label} ({percentage}%)",
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
