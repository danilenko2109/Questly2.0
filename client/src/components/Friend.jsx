import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween"; // Измененный импорт
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { PersonRemoveOutlined, PersonAddOutlined } from "@mui/icons-material";
import UserImage from "components/UserImage";
import { setFriends } from "state";

const Friend = ({ friendId, name, subtitle, userPicturePath, onUpdate }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const [isFriend, setIsFriend] = useState(true);

  const patchFriend = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setIsFriend(!isFriend);
      onUpdate && onUpdate(data);
    } catch (error) {
      console.error("Error updating friend:", error);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            // Переход на профиль друга
          }}
        >
          <Typography
            color={palette.neutral.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.neutral.medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: palette.primary.dark }} />
        ) : (
          <PersonAddOutlined sx={{ color: palette.primary.dark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;