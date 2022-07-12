import { Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const CountDocumentCard = ({ count, label, iconbgcolor, bgcolor, icon }) => {
  const Icon = icon;
  return (
    <Card
      sx={{
        minWidth: 200,
        backgroundColor: bgcolor,
        boxShadow: "0 0  16px #9ca3af",
      }}
    >
      <CardContent>
        <Stack dirction="column" spacing={2} alignItems="center">
          <Paper
            sx={{
              padding: "12px",
              backgroundColor: iconbgcolor,
              borderRadius: "50%",
            }}
          >
            <Icon
              sx={{
                color: "#fff",
                margin: "0 2px",
                padding: 0,
                fontSize: "30px",
              }}
            />
          </Paper>
          <Typography variant="h4">{count}</Typography>
          <Typography variant="subtitle1">{label}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CountDocumentCard;
