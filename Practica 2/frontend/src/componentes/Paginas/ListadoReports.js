import React, { useEffect } from 'react';
import {
  ApiGetAllData
  , ApiSetData
} from '../endpoints';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Paper, Grid, Button, GridList, GridListTile, makeStyles, TextField, Typography
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import carpeta from "../Imagenes/carpeta.png";
import Swal from "sweetalert2";

export class ListadoReports extends React.Component {
  render() {
    return (
      <div style={{ minWidth: '100%' }}>
        <ListadoFull props={this.props} />
      </div>
    );
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  gridList: {
    width: "90%",
    height: "350px",
  },
  containerList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  itemList: {
    minWidth: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  potho: {
    maxWidth: 200,
    maxHeight: 200,
  },
  search: { flexDirection: "row", display: "flex", justifyContent: "flex-start", alignItems: "baseline", gap: 10 }
}));


export default function ListadoFull({ props }) {
  const classes = useStyles();
  const [txtSearch, settxtSearch] = React.useState("");
  const [txtSearchFiltro, settxtSearchFiltro] = React.useState("");
  const [txtCarnet, settxtCarnet] = React.useState("");
  const [txtNombre, settxtNombre] = React.useState("");
  const [txtCurso, settxtCurso] = React.useState("");
  const [txtCuerpo, settxtCuerpo] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [modalNuevo, setmodalNuevo] = React.useState(false);
  const [infoIMG, setinfoIMG] = React.useState([]);
  const [allData, setallData] = React.useState([]);
  const GenerarFotos = () => {
    const tileData = [];
    var img = 200;
    var f = true;
    for (let index = 0; index < allData.length; index++) {
      img++
      if (txtSearchFiltro == "" || String(allData[index].carnet).includes(txtSearchFiltro)) {
        tileData.push({
          key: index,
          img: carpeta,
          carnet: allData[index].carnet,
          nombre: allData[index].nombre,
          curso: allData[index].curso,
          procesado: allData[index].procesado,
          solicitud: allData[index].solicitud,
          fecha: allData[index].fecha,
          cuerpo: allData[index].cuerpo,
        });
      }
    }
    return tileData;
  };
  const GenerarAlbums = () => {
    const nuevoAlbums = [];
    const tileData = GenerarFotos();
    nuevoAlbums.push(
      <Grid item xs={12} key={1}>
        <h2>Resultados de la busqueda "{txtSearchFiltro}"</h2>
        <div className={classes.containerList}>
          <GridList className={classes.gridList} cols={5} key={1}>
            {tileData.map((tile) => (
              <GridListTile
                key={tile.key}
                className={classes.itemList}
              >
                <Paper>
                  <img
                    src={tile.img}
                    alt={tile.carnet}
                    className={classes.potho}
                    onClick={() => {
                      console.log(tile)
                      MostarFoto(tile);
                    }}
                  />
                  <GridListTileBar title={tile.carnet} />
                </Paper>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Grid>
    );
    return nuevoAlbums;
  };

  const MostarFoto = (infoFoto) => {
    setinfoIMG(infoFoto);
    setOpen(true);
  };
  const agregarNuevo = () => {
    setmodalNuevo(true);
  };
  //cerrar cuadro emergente de fotos
  const handleClose = () => {
    setOpen(false);
    setmodalNuevo(false);
    settxtCarnet("")
    settxtCurso("")
    //settxtSearch("")
    settxtNombre("")
    settxtCuerpo("")
  };
  //---------cargar en variables el texto ingresado
  const inputChange = (e) => {
    let { id, value } = e.target;
    if (id === "txtSearch") {
      settxtSearch(value);
    } else if (id === "txtCarnet") {
      settxtCarnet(value);
    } else if (id === "txtNombre") {
      settxtNombre(value);
    } else if (id === "txtCurso") {
      settxtCurso(value);
    } else if (id === "txtCuerpo") {
      settxtCuerpo(value);
    }
  };
  //####################### BLOQUE SERVIDOR ################
  //hacer peticiones cada cierto tiempo 1000=1seg
  /*
  useEffect(() => {
    const timeOut = setInterval(() => {
      getAllData();
    }, 10000);
    getAllData();
    return () => clearInterval(timeOut);
  }, []);
  */
  const getAllData = () => {
    settxtSearchFiltro(txtSearch)
    axios
      .get(ApiGetAllData)
      .then((data) => {
        setallData([])
        if (data.data != undefined) {
          setallData(data.data)
        }
      })
      .catch(() => {
        console.log('Error Conexion ' + ApiGetAllData);
      });
  };
  const GuardarNuevo = () => {
    setOpen(false);
    setmodalNuevo(false);
    var data = {
      carnet: txtCarnet,
      nombre: txtNombre,
      curso: txtCurso,
      cuerpo: txtCuerpo
    };
    fetch(ApiSetData, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch(function (error) {
        alert(error);
      })
      .then((response) => {
        Swal.fire({
          title: "",
          text: response.mensaje,
          icon: "success",
        }).then((result) => {
          settxtCarnet("")
          settxtCurso("")
          settxtSearch("")
          settxtNombre("")
          settxtCuerpo("")
        });
      });
  };

  //########################################################

  return (
    <div>
      <Navbar props={props} tituloP={'Listado de Reportes'}></Navbar>
      <Grid container spacing={24}>
        <Grid item xs={8} className={classes.search}>
          <Typography variant="h5" gutterBottom component="div">
            Carnet:
          </Typography>
          <TextField
            style={{ width: 500 }}
            label="Escriba el numero de carnet"
            id="txtSearch"
            onChange={inputChange}
            value={txtSearch}
          />
          <Button variant="contained" size="medium" color="primary" startIcon={<Search />} onClick={getAllData}>
            BUSCAR
          </Button>
        </Grid>
        <Grid item xs={4} style={{ flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button variant="contained" size="medium" color='secondary' onClick={agregarNuevo} startIcon={<Add />}>
            AGREGAR
          </Button>
        </Grid>
        <Grid item xs={12}>
          {GenerarAlbums()}
        </Grid>
      </Grid>
      {/**MODAL VER OBJETO*/}
      <Dialog onClose={handleClose} open={open} scroll={"paper"}>
        <DialogTitle onClose={handleClose} style={{ textAlign: "center" }}>
          Ingreso de reportes de practicantes
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.search}>
              <Typography gutterBottom style={{ width: 200 }}>Carnet:</Typography>
              <TextField
                style={{ width: '100%' }}
                label=""
                variant="outlined"
                disabled
                value={infoIMG.carnet}
              />
            </Grid>
            <Grid item xs={12} className={classes.search}>
              <Typography gutterBottom style={{ width: 200 }}>Nombre:</Typography>
              <TextField
                style={{ width: '100%' }}
                label=""
                variant="outlined"
                disabled
                value={infoIMG.nombre}
              />
            </Grid>
            <Grid item xs={12} className={classes.search}>
              <Typography gutterBottom style={{ width: 200 }}>Curso/Proyecto:</Typography>
              <TextField
                style={{ width: '100%' }}
                label=""
                variant="outlined"
                disabled
                value={infoIMG.curso}
              />
            </Grid>
            <Grid item xs={12} className={classes.search}>
              <Typography gutterBottom style={{ width: 200 }}>Procesado Por:</Typography>
              <TextField
                style={{ width: '100%' }}
                label=""
                variant="outlined"
                disabled
                value={infoIMG.procesado + String("(Servidor)")}
              />
            </Grid>
            <Grid item xs={12} className={classes.search}>
              <Typography gutterBottom style={{ width: 200 }}>Fecha:</Typography>
              <TextField
                style={{ width: '100%' }}
                label=""
                variant="outlined"
                disabled
                value={infoIMG.fecha}
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: 20 }}>
            <Typography gutterBottom>Cuerpo del reporte</Typography>
            <TextField
              style={{ width: '100%' }}
              label=""
              multiline
              variant="outlined"
              disabled
              value={infoIMG.cuerpo}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Typography gutterBottom>Solicitud atendida por el servidor: "{infoIMG.solicitud}"</Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/**MODAL PARA AGREGAR NUEVOS */}
      <Dialog onClose={handleClose} open={modalNuevo} scroll={"paper"}>
        <DialogTitle onClose={handleClose} style={{ textAlign: "center" }}>
          Ingreso de reportes de practicantes
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.search}>
              <Typography gutterBottom style={{ width: 200 }}>Carnet:</Typography>
              <TextField
                style={{ width: '100%' }}
                label=""
                id="txtCarnet"
                onChange={inputChange}
                variant="outlined"
                value={txtCarnet}
              />
            </Grid>
            <Grid item xs={12} className={classes.search}>
              <Typography gutterBottom style={{ width: 200 }}>Nombre:</Typography>
              <TextField
                style={{ width: '100%' }}
                label=""
                id="txtNombre"
                onChange={inputChange}
                variant="outlined"
                value={txtNombre}
              />
            </Grid>
            <Grid item xs={12} className={classes.search}>
              <Typography gutterBottom style={{ width: 200 }}>Curso/Proyecto:</Typography>
              <TextField
                style={{ width: '100%' }}
                label=""
                id="txtCurso"
                onChange={inputChange}
                variant="outlined"
                value={txtCurso}
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: 20 }}>
            <Typography gutterBottom>Cuerpo del reporte</Typography>
            <TextField
              style={{ width: '100%' }}
              label=""
              multiline

              id="txtCuerpo"
              onChange={inputChange}
              variant="outlined"
              value={txtCuerpo}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={GuardarNuevo}
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
