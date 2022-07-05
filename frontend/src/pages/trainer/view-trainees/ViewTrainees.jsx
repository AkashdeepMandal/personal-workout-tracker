import { useEffect, useState } from "react";
import { Avatar, Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import { calculateAge } from "../../../utils/calculateAge";
import { trainerViewTrainees } from "../../../apis/trainer";
import { stringToAvatar } from "../../../utils/generateAvatarLogo";

function ViewTrainees() {
  const [tableData, setTableData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();

  const columns = [
    { field: "id", headerName: "Id", hide: true, allowSearch: false },
    {
      field: "avatar",
      headerName: "Avatar",
      renderCell: (params) => {
        return (
          <>
            <Avatar
              {...stringToAvatar(params.row.name)}
              src={buildImage(params.value)}
            />
          </>
        );
      },
      allowSearch: false,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    { field: "gender", headerName: "Gender", flex: 1, allowSearch: false },
    { field: "age", headerName: "Age", flex: 1, allowSearch: false },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              size="small"
              to={`/trainer/view-trainee-details/${params.id}`}
              variant="contained"
              component={NavLink}
              sx={{ fontSize: "14px", textTransform: "capitalize" }}
            >
              View
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    trainerViewTrainees(user.authToken)
      .then((res) => {
        const trainees = res.data.map((user) => {
          return {
            id: user._id,
            avatar: user.avatar,
            name: `${textCapitalize(user.firstName)} ${textCapitalize(
              user.lastName
            )}`,
            gender: user.gender,
            age: calculateAge(user.dob),
          };
        });
        setTableData(trainees);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        height: { xs: `calc(100vh - 60px)`, sm: `calc(100vh - 250px)` },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        mb={2}
        sx={{
          fontSize: { xs: "24px", sm: "28px" },
          color: theme.palette.grey[800],
        }}
      >
        View Users
      </Typography>
      <DataGrid
        disableColumnSelector
        disableDensitySelector
        rows={tableData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        backgroundColor={theme.palette.grey[50]}
        sx={{ boxShadow: "0 0 12px #ccc" }}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}

export default ViewTrainees;
