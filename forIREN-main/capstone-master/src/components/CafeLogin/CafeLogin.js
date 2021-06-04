import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2A324B",
    fontSize: "1.5em",
  },
}));

export default function CafeLogin() {
  let history = useHistory();

  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
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
      const response = await getUserToken(values);
      localStorage.setItem("token", response.data.token);
      history.push("/");
    } catch (e) {
      setErrorMessage(e.response?.data.message || "Something went wrong");
    }
  };

  const getUserToken = (values) => {
    const { email, password } = values;
    return axios.post("http://localhost:8050/cafes/login", {
        email,
      password,
    });
  };

  return (
    <Container component="main" maxWidth="false">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in as Restaurant
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            name="email"
            label="Username or email"
            value={values.email}
            onChange={handleInputValue}
            required
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            value={values.password}
            onChange={handleInputValue}
            type="password"
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/partnership" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
