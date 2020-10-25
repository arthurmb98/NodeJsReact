import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


import Fornecedor from './fornecedor';

import { getFornecedores, deleteFornecedor } from '../../Server';

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }

}));

export default function ListarFornecedores() {
  const [fornecedorState, setFornecedorState] = useState();
  const [fornecedorFilterState, setFornecedorFilterState] = useState();
  const [modelState, setmodelState] = useState();

  const [nomeFilterState, setNomeFilterState] = useState("");
  const [documentoFilterState, setDocumentoFilterState] = useState("");

  const handleChangeNomeFilter = (event) => {
    console.log(event.target.value);
    setNomeFilterState(event.target.value);
    setFornecedorFilterState(fornecedorState.filter(f => f.nome.includes(event.target.value)));
  };

  const handleChangeDocumentoFilter = (event) => {
    setDocumentoFilterState(event.target.value);
    setFornecedorFilterState(fornecedorState.filter(f => f.documento.includes(event.target.value)));
  };

  useEffect(() => {
    getFornecedores().then(data => { setFornecedorState(data); setFornecedorFilterState(data); });
    setmodelState({
      nome: "",
      email: "",
      documento: ""
    });
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const lista = fornecedorFilterState != null ? fornecedorFilterState.map((item, index) =>

    <ListItem key={index.toString()} className={classes.root}>

      <Card className={classes.root} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <PersonIcon />
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
                onClick={() => { deleteFornecedor(item.id).then(data => { console.log(data); window.alert("Sucesso!"); }); getFornecedores().then(data => setFornecedorState(data)); }}>
                <DeleteIcon />

              </IconButton>
            </div>


          }
          title={item.nome}
          subheader={ item.rg != null && item.rg.trim() != "" ? "CPF: " + item.documento : "CNPJ: " + item.documento}
        />
      </Card>

    </ListItem>

  ) : <div></div>;

  const handleClickOpen = () => {
    setmodelState({
      nome: "",
      email: "",
      documento: ""
    });
    setOpen(true);
  };

  const handleClickOpenEdit = (modelo) => {
    setmodelState(modelo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getFornecedores().then(data => setFornecedorState(data));

  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Filtrar por nome"
              onChange={handleChangeNomeFilter}
              value={nomeFilterState}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Filtrar por CPF ou CNPJ"
              onChange={handleChangeDocumentoFilter}
              value={documentoFilterState}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
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
              Novo Fornecedor
        </Typography>
          </Toolbar>
        </AppBar>
        <Fornecedor handleClose={handleClose} model={modelState} />
      </Dialog>


    </div>
  );

}