import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useSelector } from "react-redux";

import cardio from "../../../assets/cardio.png";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Collapse,
  Alert,
  useTheme,
  Avatar,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { adminCreatWorkout, adminUploadWorkoutLogo } from "../../../apis/admin";

function CreateWorkout() {
  const { user } = useSelector((state) => state.user);
  const [alartIsOpen, setAlartIsOpen] = useState(true);
  const [successAlartIsOpen, setSuccessAlartIsOpen] = useState(true);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const theme = useTheme();

  const [selectedFile, setSelectedFile] = useState(cardio);
  const [workoutLogo, setWorkoutLogo] = useState();

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
    console.log(value);
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
      setFormSuccess("New workout created");
      props.resetForm();
    } catch (error) {
      if (error.response.data) {
        setFormError(error.response.data.error.message);
      } else {
        setFormError("Please Check Network Connection");
      }
      setAlartIsOpen(true);
    }
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
            {formError && (
              <Collapse in={alartIsOpen}>
                <Alert
                  severity="error"
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
                  {formError}
                </Alert>
              </Collapse>
            )}
            {formSuccess && (
              <Collapse in={successAlartIsOpen}>
                <Alert
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSuccessAlartIsOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {formSuccess}
                </Alert>
              </Collapse>
            )}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
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
                      <Stack spacing={1}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Category*</FormLabel>
                          <RadioGroup
                            row
                            name="category"
                            value={values.category}
                            onChange={(event) => {
                              setFieldValue(
                                "category",
                                event.currentTarget.value
                              );
                            }}
                          >
                            <FormControlLabel
                              value="strength"
                              control={<Radio />}
                              label="Strength"
                            />
                            <FormControlLabel
                              value="cardio"
                              control={<Radio />}
                              label="Cardio"
                            />
                          </RadioGroup>
                        </FormControl>
                        {touched.category && errors.category && (
                          <FormHelperText error id="helper-text-category">
                            {errors.category}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">Workout Name*</InputLabel>
                        <OutlinedInput
                          autoComplete="off"
                          id="name"
                          type="name"
                          value={values.name}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Running"
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                        />
                        {touched.name && errors.name && (
                          <FormHelperText error id="helper-text-name">
                            {errors.name}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="calories">Calories*</InputLabel>
                        <OutlinedInput
                          autoComplete="off"
                          fullWidth
                          error={Boolean(touched.calories && errors.calories)}
                          id="calories"
                          type="calories"
                          value={values.calories}
                          name="calories"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="12"
                          inputProps={{}}
                        />
                        {touched.calories && errors.calories && (
                          <FormHelperText error id="helper-text-calories">
                            {errors.calories}
                          </FormHelperText>
                        )}
                      </Stack>
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
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CreateWorkout;
