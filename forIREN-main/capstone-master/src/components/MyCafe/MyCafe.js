import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Text from "../../components/Text/Text.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import jwt_decode from "jwt-decode";
import Box from "@material-ui/core/Box";
import { Rating } from "@material-ui/lab";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    margin: "auto",
    width: "70%",
    display: "flex",
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
  image: {
    overflowY: "hidden",
    height: "500px",
  },
  MainItems: {
    margin: "0 5em",
  },
  reviews: {
    border: "1px solid black",
    padding: "1em",
  },
  rating: {
    display: "inline-block",
    padding: "0.35em 1.2em",
    color: "#2A324B",
    border: "0.1em solid #2A324B",
    margin: "0 0.3em 0.3em 0",
    borderRadius: "0.12em",
    boxSizing: "border-box",
    textDecoration: "none",
    fontWeight: "300",
    transition: "all 0.2s",
    backgroundColor: "#ffff4d",
  },
  ratingRev: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  change: {
    backgroundColor: " #2A324B",
    padding: "7px",
    color: "white",
  },
}));

export default function MyCafe() {
  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const classes = useStyles();

  const [values, setValues] = useState({
    reviews: "",
    raitings: "",
  });
  const decoded = jwt_decode(token).userId;

  const [user] = useState(!!decoded ? decoded : null);

  const [errorMessage, setErrorMessage] = useState("");
  const [cafes, setCafes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [edit, setEdit] = useState(false);
  const [check, setCheck] = useState("");

  async function fetchCafesFromServer() {
    const result = await axios.get(`http://localhost:8050/cafes/${id}`);
    setCafes(result.data);
  }

  useEffect(() => {
    fetchCafesFromServer();
  }, []);

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  let pathArray = window.location.pathname.split("/");
  let id = pathArray[2];

  const handleFormSubmit = async (e) => {
    try {
      const result = await AddReview(values);
    } catch (e) {
      setErrorMessage(e.response?.data.message || "Something went wrong");
    }
  };

  async function AddReview(newBest) {
    const { reviews, raitings } = values;
    await axios.post(`http://localhost:8050/reviews/${id}`, {
      reviews,
      raitings,
    });
    // await window.location.reload(true);
  }
  useEffect(() => {
    AddReview();
  }, [values]);
  async function ViewReviews() {
    const result = await axios.get(`http://localhost:8050/reviews/${id}`);
    setReviews(result.data);
  }

  useEffect(() => {
    ViewReviews();
  }, []);

  const handleEdit = () => {
    setEdit(true);
  };
  async function handleDelete() {
    await axios.delete(`http://localhost:8050/reviews/${id}`);
    window.location.reload(true);
  }

  async function handleReviewChange(e) {
    const { reviews, raitings } = values;
    await axios.patch(`http://localhost:8050/reviews/${id}`, {
      reviews,
      raitings,
    });
    window.location.reload(true);
    await setEdit(false);

    //setReviews(result.data);
  }
  // useEffect(() => {
  //   handleReviewChange();
  // }, []);

  async function checkRev() {
    const meh = await axios.get(`http://localhost:8050/reviews/test/${id}`);
    setCheck(meh.data);
  }
  useEffect(() => {
    checkRev();
  }, []);

  return (
    <div>
      <div className={classes.image}>
        <img src={cafes.selectedFile} alt="cafe_picture" />
      </div>
      <div className={classes.paper}>
        <div className={classes.MainItems}>
          <Text
            head={cafes.name}
            par={cafes.description}
            head1={"Cafe Address: " + cafes.street_name}
          />
          <div>
            <p>
              <h2>Cafe Reviews</h2>
              {reviews.map((a) => (
                <div className={classes.reviews}>
                  <p style={{ color: " #2A324B" }}>
                    <i>{a.creator.username}</i>
                  </p>
                  <div className={classes.ratingRev}>
                    {edit && a.creator._id === user ? (
                      <div style={{ width: "70%" }}>
                        <TextField
                          name="reviews"
                          label="Reviews"
                          value={values.reviews}
                          onChange={handleInputValue}
                          required
                          fullWidth
                        />
                        <Box
                          component="fieldset"
                          mb={3}
                          borderColor="transparent"
                        >
                          <Typography component="legend">
                            Edit Rating
                          </Typography>
                          <Rating
                            name="raitings"
                            value={values.raitings}
                            onChange={handleInputValue}
                            required
                            size="large"
                          />
                        </Box>
                        <button
                          className={classes.change}
                          onClick={handleReviewChange}
                        >
                          Submit{" "}
                        </button>{" "}
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <b>{a.reviews}</b>{" "}
                      </div>
                    )}

                    <div>
                      <p className={classes.rating}>{a.raitings}</p>
                    </div>
                  </div>
                  {a.creator._id === user && edit === false ? (
                    <div>
                      <button
                        type="submit"
                        className={classes.change}
                        onClick={handleEdit}
                      >
                        Edit
                      </button>

                      <button
                        type="submit"
                        className={classes.change}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </p>
          </div>
        </div>

        {check ? (
          <div>
            <div>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                Add a Review
              </Typography>

              <form className={classes.form} onSubmit={handleFormSubmit}>
                <FormHelperText error={true}>
                  {errorMessage || " "}
                </FormHelperText>

                <TextField
                  name="reviews"
                  label="Review"
                  value={values.reviews}
                  onChange={handleInputValue}
                  required
                  fullWidth
                />
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Add Rating</Typography>
                  <Rating
                    name="raitings"
                    value={values.raitings}
                    onChange={handleInputValue}
                    required
                    size="large"
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add a Rating
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <h1>
              You already have a review!! You can edit or delete it in review
              list
            </h1>{" "}
          </div>
        )}
      </div>{" "}
      :
    </div>
  );
}
