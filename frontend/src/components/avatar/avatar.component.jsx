import React from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";

function AvatarLogo(props) {
  const { onClick } = props;
  const { user } = useSelector((state) => state.user);
  return (
    <Avatar
      name={`${user.name.firstName} ${user.name.lastName}`}
      size="40px"
      textSizeRatio={3}
      textMarginRatio={0.1}
      round
      color="#fff"
      fgColor="#494949"
      style={{ fontWeight: 600, cursor: "pointer" }}
      onClick={onClick}
    />
  );
}

export default AvatarLogo;
