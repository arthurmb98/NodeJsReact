import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import BusinessIcon from '@material-ui/icons/Business';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import Empresa from './empresa';

import { getEmpresas, deleteEmpresa } from '../../Server';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appBar: {
    position: 'static',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

}));

export default function ListarEmpresas() {
  const [empresaState, setEmpresaState] = useState();
  const [modelState, setmodelState] = useState();

  useEffect(() => {
    getEmpresas().then(data => setEmpresaState(data));

    setmodelState({
      nome: "",
      uf: "",
      cnpj: ""
    });
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const listItems = empresaState != null ? empresaState.map((item, index) =>
    <ListItem key={index.toString()} className={classes.root}>

      <Card className={classes.root} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <BusinessIcon />
            </Avatar>
          }
          action={
            <div>
              <IconButton aria-label="edit"
                aria-controls={"edit" + index.toString()}
                aria-haspopup="true"
                onClick={() => handleClickOpenEdit(item)}>
                <EditIcon />

              </IconButton>
              <IconButton aria-label="delete"
                aria-controls={"delete" + index.toString()}
                aria-haspopup="true"
                onClick={() => { deleteEmpresa(item.id).then(data => { console.log(data); window.alert("Sucesso!"); }); getEmpresas().then(data => setEmpresaState(data)); }}>
                <DeleteIcon />

              </IconButton>
            </div>


          }
          title={item.nome}
          subheader={"UF: "+ item.uf}
        />



      </Card>

    </ListItem>


  ) : <div></div>;

  const handleClickOpen = () => {
    setmodelState({
      nome: "",
      uf: "",
      cnpj: ""
    });
    setOpen(true);
  };

  const handleClickOpenEdit = (modelo) => {
    setmodelState(modelo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getEmpresas().then(data => setEmpresaState(data));

  };

  return (
    <div>
      <List >
        {listItems}
      </List>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Nova Empresa
        </Typography>
          </Toolbar>
        </AppBar>
        <Empresa handleClose={handleClose} model={modelState} />
      </Dialog>


    </div>
  );

}