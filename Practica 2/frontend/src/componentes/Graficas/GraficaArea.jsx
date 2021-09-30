import React from "react";
import CanvasJSReact from "./canvasjs-3.2.9/canvasjs.react";

export default function GraficaArea({ datosJS }) {
  if (datosJS === undefined) {
    datosJS = {
      titulo: "No Hay Datos Aun",
      data: [],
    };
  }
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: datosJS.titulo,
    },
    axisY: {
      title: datosJS.tituloY,
      suffix: "%",
      interval:5,
      
    },
    axisX: {
      title: datosJS.tituloX,
      prefix: "t",
      interval: 1,
    },
    data: [
      {
        type: "area",
        toolTipContent: "{y}",
        dataPoints: datosJS.data,
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}
