import React, { useState } from "react";
import { Box, Container, OutlinedInput } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

function Profile({ drawerWidth }) {
  const { isLoggedIn, data } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    // await axios
    //   .post("localhost:5000/api/user/avatar/upload", formData, {
    //     headers: {
    //       Authorization: "Bearer " + data.authToken,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => console.log("success"))
    //   .catch((error) => console.log(error));

    await axios({
      url: "http://localhost:5000/api/user/avatar/upload",
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.authToken}`,
        "Content-Type": "multipart/form-data",
        crossDomain: true,
      },
      data: formData,
    })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <Box
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        flexGrow: 1,
        p: 3,
        // height: "100vh",
        backgroundColor: "green",
      }}
    >
      <Box>
        <input type="file" name="file" onChange={changeHandler} />
      </Box>
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </Box>
  );
}

export default Profile;
