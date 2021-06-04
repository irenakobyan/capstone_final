import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FileBase from 'react-file-base64';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from 'react-select';
import axios from "axios";

const cuisine = [
  {value:"Breakfast",label:"Breakfast"},
  {value:"Lunch",label:"Lunch"},
  {value:"Dinner",label:"Dinner"},
  {value:"Burger & Sandwich",label:"Burger & Sandwich"},
  {value:"Fast Food",label:"Fast Food"},
  {value:"Pizza",label:"Pizza"},
  {value:"BBQ, Kebab",label:"BBQ, Kebab"},
  {value:"Sushi",label:"Sushi"},
  {value:"Chicken Grill",label:"Chicken Grill"},
  {value:"Khash",label:"Khash"},
  {value:"Lahmajo",label:"Lahmajo"},
  {value:"Asian",label:"Asian"},
  {value:"Dessert", label:"Dessert"},
  {value:"Coffee and Tea",label:"Coffee and Tea"},
];

const activity = [
  {value:"Ajapnyak", label:"Ajapnyak"},
  {value:"Arabkir", label:"Arabkir"},
  {value:"Avan", label:"Avan"},
  {value:"Davtashen", label:"Davtashen"},
  {value:"Erebuni", label:"Erebuni"},
  {value:"Davtashen", label:"Davtashen"},
  {value:"Kanaker-Zeytun", label:"Kanaker-Zeytun"},
  {value:"Kentron", label:"Kentron"},
  {value:"Malatia-Sebastia", label:"Malatia-Sebastia"},
  {value:"Nork-Marash", label:"Nork-Marash"},
  {value:"Nubarashen", label:"Nubarashen"},
  {value:"Shengavit", label:"Shengavit"},
];

const location = [
  {value:"Work & Study", label:"Work & Study"},
  {value:"Friends Time", label:"Friends Time"},
  {value:"Music and Concerts", label:"Music and Concerts"},
  {value:"Hookah & Cigars", label:"Hookah & Cigars"},
  {value:"Friends Time", label:"Friends Time"},
  {value:"Friday Night", label:"Friday Night"},
  {value:"Wine & Cheese", label:"Wine & Cheese"},
  {value:"For Kids", label:"For Kids"},
];

const useStyles = makeStyles((theme) => ({
  paper: {
   
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
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    street_name: "",
    district: "",
    description: "",
    tags:"",
    cuisine:"",

    selectedFile: ""
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
      history.push("/filter");
    } catch (e) {
      setErrorMessage(e.response?.data?.message || "Something went wrong");
    }
  };
  
  function handleSelectChange(event) {
    let result = event.map(a => a.value);
    setValues({...values , tags:result});    
  }

  function handleSelectChangeTwo(event) {
    let result = event.map(a => a.value);
    setValues({...values , cuisine:result}); 
  }

  function handleSelectChangeThree(event) {
    let result = event.value;
    setValues({...values , district:result}); 
  }
  
  const createUser = async (values) => {
    return axios.post("http://localhost:8050/cafes", values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register a Restaurant
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
        <FormHelperText error={true}>{errorMessage || " "}</FormHelperText>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Cafe name"
                value={values.name}
                onChange={handleInputValue}
                className={classes.formField}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               name="email"
               label="Email"
               value={values.email}
               onChange={handleInputValue}
               className={classes.formField}
               required
               fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               name="street_name"
               label="Street name"
               value={values.street_name}
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
            <Grid  item xs={12}>
            <TextField
            name="description"
            value={values.description}
            variant="outlined"
            label="Description"
            onChange={handleInputValue}
            fullWidth
            multiline rows={4}
          />
            </Grid>
          </Grid>
          <div  className={classes.fileInput}>
     
          <FileBase type="file" multiple={false} onDone={({ base64 }) =>   {setValues({...values,  selectedFile:  base64})}} />
           </div>
           <Select 
           options={cuisine} 
           isMulti
           onChange={handleSelectChange}/> 
          <Select 
           options={location} 
           isMulti
           onChange={handleSelectChangeTwo}/>
          <Select options={activity} 

           onChange={handleSelectChangeThree}/> 
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