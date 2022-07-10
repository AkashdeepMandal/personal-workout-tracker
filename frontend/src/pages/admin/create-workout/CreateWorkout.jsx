import { Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useSelector } from "react-redux";

import cardio from "../../../assets/cardio.png";

// material-ui
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  Collapse,
  Alert,
  useTheme,
  Avatar,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { adminCreatWorkout, adminUploadWorkoutLogo } from "../../../apis/admin";
import FormFieldControl from "../../../components/form-control/FormControl";

function CreateWorkout() {
  const { user } = useSelector((state) => state.user);
  const [alartIsOpen, setAlartIsOpen] = useState(false);
  const [formAlert, setFormAlert] = useState({ severity: null, msg: "" });
  const [workoutLogo, setWorkoutLogo] = useState();
  const [selectedFile, setSelectedFile] = useState(cardio);
  const theme = useTheme();

  const categoryOptions = [
    { key: "Strength", value: "strength" },
    { key: "Cardio", value: "cardio" },
  ];

  const changeHandlerLogo = (event) => {
    if (event.target.files && event.target.files[0]) {
      setWorkoutLogo(event.target.files[0]);
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  // formik props
  const initialValues = {
    category: "",
    name: "",
    calories: "",
  };
  const validationSchema = yup.object().shape({
    category: yup.string().required("Category is required"),
    name: yup.string().max(255).required("Workout name is required"),
    calories: yup.number().max(10000).required("Calories required"),
  });

  const onSubmit = async (value, props) => {
    const formData = new FormData();
    if (workoutLogo) {
      formData.append("logo", workoutLogo);
    }

    try {
      const workout = await adminCreatWorkout(user.authToken, { ...value });
      if (formData.has("logo")) {
        await adminUploadWorkoutLogo(
          user.authToken,
          formData,
          workout.data._id
        );
      }
      setFormAlert({
        severity: "success",
        msg: "Workout created successfully",
      });
      setSelectedFile(cardio);
      setWorkoutLogo();
      props.resetForm();
    } catch (error) {
      if (error.response.data) {
        setFormAlert({
          severity: "error",
          msg: error.response.data.error.message,
        });
      } else {
        setFormAlert({
          severity: "error",
          msg: "Please check your internet connection",
        });
      }
    }
    setAlartIsOpen(true);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        sx={{
          fontSize: { xs: "24px", sm: "28px" },
          color: theme.palette.grey[800],
        }}
      >
        Create New Workout
      </Typography>
      <Box
        sx={{
          maxWidth: "500px",
          margin: "18px auto",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 0 12px #ccc",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: theme.palette.grey[800] }}
            >
              Enter Workout Details Here
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Collapse in={alartIsOpen}>
              <Alert
                severity={formAlert.severity ? formAlert.severity : "success"}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlartIsOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {formAlert.msg}
              </Alert>
            </Collapse>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, setFieldValue, touched, values, ...rest }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            bgcolor: "White",
                            color: "#212121",
                          }}
                          alt={`${user.firstName} ${user.lastName}`}
                          src={selectedFile}
                        />

                        <Button
                          size="small"
                          variant="contained"
                          component="label"
                          sx={{
                            height: "max-content",
                            textTransform: "capitalize",
                            fontWeight: 600,
                          }}
                        >
                          Choose Logo
                          <input
                            type="file"
                            onChange={changeHandlerLogo}
                            hidden
                          />
                        </Button>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <FormFieldControl
                        row={true}
                        control="radio"
                        label="Category*"
                        name="category"
                        value={values.category}
                        setFieldValue={setFieldValue}
                        options={categoryOptions}
                        error={touched.category && errors.category}
                        errorMsg={errors.category}
                        {...rest}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormFieldControl
                        control="input"
                        label="Name*"
                        name="name"
                        placeholder="Running"
                        inputprops={{ maxLength: 100 }}
                        value={values.name}
                        error={touched.name && errors.name}
                        errorMsg={errors.name}
                        {...rest}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormFieldControl
                        control="input"
                        label="Calories burn per minute*"
                        name="calories"
                        placeholder="8"
                        inputprops={{ maxLength: 100 }}
                        value={values.calories}
                        error={touched.calories && errors.calories}
                        errorMsg={errors.calories}
                        {...rest}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Create Workout
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CreateWorkout;
