import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';

import { useForm } from "react-hook-form";

import { postFornecedor, putFornecedor } from '../../Server';

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


export default function Fornecedor(props) {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: props.model
  });

  const [valueRadio, setValueRadio] = React.useState("J");

  const [valueDocumentos, setValueDocumentos] = React.useState();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dadosPessoaFisica = <Container>
    < Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        id="documento"
        label="CPF"
        type="number"
        name="documento"
        maxLength="15"
        autoComplete="documento"
        inputRef={register({
          required: true,
          maxLength: 15
        })}

      />
    </Grid >
    <br />
    < Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        id="rg"
        label="RG"
        type="number"
        name="rg"
        maxLength="15"
        autoComplete="rg"
        inputRef={register({
          required: true,
          maxLength: 15
        })}

      />
    </Grid >
    <br />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      < Grid item xs={12}  >
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="nascimento"
          label="Data Nacimento"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'mudar data',
          }}
        />
      </Grid >
    </MuiPickersUtilsProvider>
  </Container>

  const dadosPessoaJuridica = < Grid item xs={12} >
    <TextField
      variant="outlined"
      required
      fullWidth
      id="documento"
      label="CNPJ"
      type="number"
      name="documento"
      maxLength="15"
      autoComplete="documento"
      inputRef={register({
        required: true,
        maxLength: 15
      })}

    />
  </Grid >

  React.useEffect(() => {
    if (props.model != null && props.model.rg != null) {
      setValueRadio("F");
      setValueDocumentos(dadosPessoaFisica);
    } else {
      setValueDocumentos(dadosPessoaJuridica);
    }

  }, []);

  function onSubmit(data) {
    data.documento = data.documento.toString();
    data.rg = data.rg.toString();
    // EDITA
    if (props.model != null && props.model.id != null) {
      data.id = props.model.id;
      putFornecedor(data).then(data => { console.log(data); window.alert("Sucesso!"); });
      props.handleClose();
      // INSERE
    } else {
      postFornecedor(data).then(data => { console.log(data); window.alert("Sucesso!"); });
      props.handleClose();
    }
  }

  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);

    if (event.target.value == "F") {
      setValueDocumentos(dadosPessoaFisica);
    } else {
      setValueDocumentos(dadosPessoaJuridica);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                maxLength="100"
                autoComplete="fname"
                inputRef={register({
                  required: true,
                  maxLength: 100
                })}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                type="email"
                maxLength="100"
                autoComplete="fname"
                inputRef={register({
                  required: true,
                  maxLength: 100
                })}

              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="F" value={valueRadio} onChange={handleChangeRadio}>
                  <FormControlLabel
                    value="J"
                    control={<Radio color="primary" />}
                    label="Pessoa Jurídica"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio color="primary" />}
                    label="Pessoa Física"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {valueDocumentos}
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