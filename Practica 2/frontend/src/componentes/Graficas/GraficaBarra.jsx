import React from "react";
import CanvasJSReact from "./canvasjs-3.2.9/canvasjs.react";

export default function GraficaBarra({ datosJS }) {
  if (datosJS === undefined) {
    datosJS = {
      titulo: "No Hay Datos Aun",
      data: [],
      media: []
    };
  }
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: datosJS.titulo,
    },
    axisY: {
      includeZero: true,
    },
    axisX:{
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: datosJS.data,
      }
    ],
  };

  if(datosJS.media!=undefined && datosJS.media==true){
    var AuxMedia=[]
    var med=0
    for (let index = 0; index < datosJS.data.length; index++) {
      med+=datosJS.data[index].y
    }
    med=parseFloat((med/datosJS.data.length).toFixed(1))
    for (let index = 0; index < datosJS.data.length; index++) {
      AuxMedia.push({x:datosJS.data[index].x,y:med})
    }
    options.data.push(
      {
				type: "line",
        indexLabel: "Media: {y}",
        dataPoints: AuxMedia,
			}
    )
  }
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}
