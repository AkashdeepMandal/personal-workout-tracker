import {
  capitalize,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { textCapitalize } from "../../utils/textCapitalize";
import "../styles/scss/progressCardTables.scss";

const WorkoutProgressCard = ({ value, ...rest }) => {
  console.log(value.workouts);
  return (
    <Card
      sx={{
        minWidth: 200,
        marginBottom: "24px",
        boxShadow: "0 0  8px #9ca3af",
      }}
    >
      <CardContent>
        <Stack dirction="column" spacing={2} alignItems="center">
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Date :
            </Typography>
            <Typography variant="subtitle2">
              {moment(value.createdAt).format("DD / MM / yyyy")}
            </Typography>
          </Stack>
          <Divider variant="middle" sx={{ width: "100%" }} />
          <table className="card-table">
            <thead>
              <tr className="card-row">
                <th>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Duration
                  </Typography>
                </th>
                <th>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Calories
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {value.workouts.map((workout) => {
                return (
                  <tr className="card-row" key={workout.name}>
                    <td>
                      <Typography variant="subtitle2">
                        {`${textCapitalize(workout.name)}`}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">
                        {workout.duration}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">
                        {workout.totalCalories}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Divider variant="middle" sx={{ width: "100%" }} />
          <Stack direction="column" alignItems="flex-end" sx={{ width: "90%" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Total Calories Burned
            </Typography>
            <Typography variant="h6">{value.totalCaloriesBurned}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WorkoutProgressCard;
