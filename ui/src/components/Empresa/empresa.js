import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { useForm } from "react-hook-form";

import { postEmpresa, putEmpresa } from '../../Server';

import { estados } from './estados';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Empresa(props) {
  const classes = useStyles();

  const [estado, setEstado] = React.useState('');

  React.useEffect(() => {
    if (props.model != null)
      setEstado(props.model.uf);
  }, []);

  const handleChange = (event) => {
    setEstado(event.target.value);
  };

  const { register, handleSubmit, errors } = useForm({
    defaultValues: props.model
  });

  function onSubmit(data) {
    data.uf = estado;
    // EDITA
    if (props.model != null && props.model.id != null) {
      data.id = props.model.id;
      putEmpresa(data).then(data => { console.log(data); window.alert("Sucesso!"); });
      props.handleClose();
      // INSERE
    } else {
      postEmpresa(data).then(data => { console.log(data); window.alert("Sucesso!"); });
      props.handleClose();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BusinessIcon />
        </Avatar>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" required
                fullWidth id="uf"
                name="uf"
                ref={register({
                  required: true,
                  maxLength: 2
                })}>
                <InputLabel id="ufLabel">Estado</InputLabel>
                <Select
                  labelId="uf"
                  id="uf"
                  value={estado}
                  onChange={handleChange}
                >
                  {estados.map((item) => <MenuItem key={item.Sigla} value={item.Sigla}>{item.Nome}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nome"
                label="Nome fantasia"
                name="nome"
                maxLength="100"
                autoComplete="fname"
                inputRef={register({
                  required: true,
                  maxLength: 100
                })}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cnpj"
                label="CNPJ"
                name="cnpj"
                type="number"
                maxLength="15"
                autoComplete="cnpj"
                inputRef={register({
                  required: true,
                  maxLength: 15
                })}

              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Salvar
          </Button>
        </form>
      </div>
    </Container>
  );
}