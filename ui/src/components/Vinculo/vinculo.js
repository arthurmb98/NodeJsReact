import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { useForm } from "react-hook-form";

import { postVinculo, getEmpresas, getFornecedores } from '../../Server';

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


export default function Vinculo(props) {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();

  const [empresas, setEmpresas] = React.useState();

  const [fornecedores, setFornecedores] = React.useState();

  const [empresa, setEmpresa] = React.useState();

  const [fornecedor, setFornecedor] = React.useState();

  const handleChangeEmpresa = (event) => {
    setEmpresa(event.target.value);
  }

  const handleChangeFornecedor = (event) => {
    setFornecedor(event.target.value);
  }

  React.useEffect(() => {
    getEmpresas().then(data => setEmpresas(data));
    getFornecedores().then(data => setFornecedores(data));
  }, []);

  function onSubmit(data) {
    data.fkIdEmpresas = empresa;
    data.fkIdFornecedores = fornecedor;
    console.log(data);
    postVinculo(data).then(data => { console.log(data); window.alert("Sucesso!"); });
    props.handleClose();
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupIcon />
        </Avatar>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" required
                fullWidth id="fkIdEmpresas"
                name="fkIdEmpresas"
                ref={register({
                  required: true,
                })}>
                <InputLabel id="fkIdEmpresasLabel">Empresas</InputLabel>
                <Select
                  labelId="fkIdEmpresas"
                  id="fkIdEmpresas"
                  value={empresa}
                  onChange={handleChangeEmpresa}
                >
                 {empresas != null ? empresas.map((item) => <MenuItem key={item.id} value={item.id}>{item.nome + " - " + item.cnpj}</MenuItem>) : <MenuItem></MenuItem>}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl variant="outlined" required
                fullWidth id="fkIdFornecedores"
                name="fkIdFornecedores"
                ref={register({
                  required: true,
                })}>
                <InputLabel id="fkIdFornecedoresLabel">Fornecedores</InputLabel>
                <Select
                  labelId="fkIdFornecedores"
                  id="fkIdFornecedores"
                  value={fornecedor}
                  onChange={handleChangeFornecedor}
                >
                  {fornecedores != null ? fornecedores.map((item) => <MenuItem key={item.id} value={item.id}>{item.nome + " - " + item.documento}</MenuItem>) : <MenuItem></MenuItem>}
                </Select>
              </FormControl>
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