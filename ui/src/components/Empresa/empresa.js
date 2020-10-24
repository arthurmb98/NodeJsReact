import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useForm } from "react-hook-form";

import { postEmpresa, putEmpresa } from '../../Server';

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

  const { register, handleSubmit, errors } = useForm({
    defaultValues: props.model
  });

  function onSubmit(data) {
    // EDITA
    if (props != null && props.model.id != null) {
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
              <TextField
                name="uf"
                variant="outlined"
                required
                fullWidth
                id="uf"
                label="UF"
                autoFocus
                inputRef={register({
                  required: true,
                  maxLength: 2
                })}

              />
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