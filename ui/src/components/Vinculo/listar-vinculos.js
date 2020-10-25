import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Vinculo from './vinculo';

import { getVinculos, deleteVinculo } from '../../Server';

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

export default function ListarVinculos() {
  const [vinculoState, setVinculoState] = useState();

  useEffect(() => {
    getVinculos().then(data => setVinculoState(data));
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const lista = vinculoState != null ? vinculoState.map((item, index) =>

    <ListItem key={index.toString()} className={classes.root}>

      <Card className={classes.root} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <GroupIcon />
            </Avatar>
          }
          action={
            <IconButton aria-label="delete"
              aria-controls={"delete" + index.toString()}
              aria-haspopup="true"
              onClick={() => { deleteVinculo(item.id).then(data => { console.log(data); window.alert("Sucesso!"); }); getVinculos().then(data => setVinculoState(data)); }}>
              <DeleteIcon />

            </IconButton>
          }
          title={item.empresa +" - " + item.uf}
          subheader={"Fornecedor: " + item.fornecedor}
        />
      </Card>

    </ListItem>

  ) : <div></div>;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getVinculos().then(data => setVinculoState(data));
    setOpen(false);
  };

  return (
    <div>
      <List >
        {lista}
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
              Novo Vinculo
        </Typography>
          </Toolbar>
        </AppBar>
        <Vinculo handleClose={handleClose} />
      </Dialog>


    </div>
  );

}