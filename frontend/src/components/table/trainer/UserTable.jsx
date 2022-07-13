import { useEffect, useState } from "react";
import { Avatar, Button, OutlinedInput, Stack, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import { buildImage } from "../../../utils/buildImage";
import { textCapitalize } from "../../../utils/textCapitalize";
import { calculateAge } from "../../../utils/calculateAge";
import { stringToAvatar } from "../../../utils/generateAvatarLogo";
import { trainerViewTrainees } from "../../../apis/trainer";

function UserTable({ action }) {
  const { user } = useSelector((state) => state.user);
  const [tableData, setTableData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
      width: 80,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    { field: "gender", headerName: "Gender", flex: 1, allowSearch: false },
    { field: "age", headerName: "Age", flex: 1, allowSearch: false },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        if (action === "view") {
          return (
            <>
              <Button
                size="small"
                to={`/trainer/view-trainee/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "12px", textTransform: "capitalize" }}
              >
                View
              </Button>
            </>
          );
        } else if (action === "assign") {
          return (
            <>
              <Button
                size="small"
                to={`/trainer/assign-workout/${params.row.name}/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "12px", textTransform: "capitalize" }}
              >
                Assign Workout
              </Button>
            </>
          );
        } else if (action === "remove") {
          return (
            <>
              <Button
                size="small"
                color="error"
                to={`/trainer/remove-workout/${params.row.name}/${params.id}`}
                variant="contained"
                component={NavLink}
                sx={{ fontSize: "12px", textTransform: "capitalize" }}
              >
                Remove Workout
              </Button>
            </>
          );
        }
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    trainerViewTrainees(user.authToken, search, page)
      .then((res) => {
        const { users, totalUsers } = res.data;
        const trainees = users.map((user) => {
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
        setRowCount(totalUsers);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [search, page]);

  return (
    <>
      <Stack direction="row" spacing={3} justifyContent="flex-end" marginY={2}>
        <OutlinedInput
          size="small"
          autoComplete="off"
          id="search"
          type="text"
          value={search}
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search by name or e-mail"
          inputProps={{}}
        />
      </Stack>
      <DataGrid
        disableColumnMenu
        disableSelectionOnClick
        pagination
        paginationMode="server"
        rowCount={rowCount}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        rowsPerPageOptions={[10]}
        pageSize={10}
        rows={tableData}
        columns={columns}
        loading={isLoading}
        sx={{ boxShadow: "0 0 12px #ccc" }}
        backgroundColor={theme.palette.grey[50]}
      />
    </>
  );
}

export default UserTable;
