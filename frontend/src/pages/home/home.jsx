import * as React from "react";
import "./home.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import PICT from "../../assets/img2.jpg";
import PICTU from "../../assets/pic2.jpg";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Home() {
  return (
    <div className="landing">
      <div className="heading">
        <center>
          <div className="sign">
            <span className="fast-flicker">PERSONAL-</span>
            WORK
            <span className="flicker">OUT-</span>
            TRACKER
          </div>
        </center>
      </div>
      <center>
        <div className="card-home">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              paddingX={1}
            >
              <Grid item xs={6} pb={6}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={PICT}
                      alt="USER"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="card-heading"
                      >
                        USERS
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="card-text"
                      >
                        By signing in users can show their progress reports by
                        which they can track their fitness journey.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={PICTU}
                      alt="TRAINER"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="card-heading"
                      >
                        TRAINER
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="card-text"
                      >
                        Our experienced trainer will help you to be physically
                        fit by assigninging you Workouts as per your body
                        requirements.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </center>
      <center>
        <Root>
          <Divider>
            <Chip label="ABOUT US" />
          </Divider>
          <div className="au">
            <Box sx={{ width: "100%" }}>
              <Stack spacing={2}>
                <Item>
                  <p className="fp">
                    "NO JUDGEMENTS" Some may call it a tagline, but for us, it's
                    a way of life. It's our Monday-thru-every-day mantra. An
                    unfiltered philosophy that drives us to create a community
                    for all.
                  </p>
                  <br />
                  <p className="sp">
                    No judgments means room for everyone, regardless of shape,
                    size, age, race, gender or fitness level. No matter your
                    workout of choice, we want you to feel good while reaching
                    your goals. Join the fun.
                  </p>
                </Item>
              </Stack>
            </Box>
          </div>
        </Root>
      </center>
      <div className="footer">
        <h5>Copyright &copy; All right reserved.</h5>
      </div>
    </div>
  );
}

export default Home;
