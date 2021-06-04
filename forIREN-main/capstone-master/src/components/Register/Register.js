import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2A324B',
    fontSize: '1.5em'
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  const { updateToken } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(values);
      localStorage.setItem("token", response.data.token);
      history.push("/profile");
    } catch (e) {
      setErrorMessage(e.response?.data?.message || "Something went wrong");
    }
  };

  const createUser = async (values) => {
    return axios.post("http://localhost:8050/users", values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
        <FormHelperText error={true}>{errorMessage || " "}</FormHelperText>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First name"
                value={values.firstName}
                onChange={handleInputValue}
                className={classes.formField}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               name="lastName"
               label="Last name"
               value={values.lastName}
               onChange={handleInputValue}
               className={classes.formField}
               required
               fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               name="username"
               label="Username"
               value={values.username}
               onChange={handleInputValue}
               className={classes.formField}
               required
               fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               name="email"
               label="Email"
               type="email"
               value={values.email}
               onChange={handleInputValue}
               className={classes.formField}
               required
               fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  name="password"
                  value={values.password}
                  onChange={handleInputValue}
                  type="password"
                  label="Password"
                  className={classes.formField}
                  required
                  fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
