import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  useTheme,
  Box,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { NavLink } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    picturePath: "",
  });

  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const currentUserId = useSelector((state) => state.user._id);

  const getUser = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location || "",
        occupation: data.occupation || "",
        picturePath: data.picturePath || "",
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }, [userId, token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing && user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location || "",
        occupation: user.occupation || "",
        picturePath: user.picturePath || "",
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      alert(error.message || "An error occurred while updating");
    }
  };

  if (!user) return null;

  const isCurrentUser = userId === currentUserId;

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween
          component={NavLink}
          to={`/profile/${userId}`}
          gap="1rem"
          sx={{
            textDecoration: "none",
            color: "inherit",
            "&:hover h4": { color: palette.primary.light },
          }}
        >
          <UserImage image={isEditing ? formData.picturePath : user.picturePath} />
          <Box>
            {isEditing ? (
              <>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  size="small"
                  sx={{ mb: "0.5rem" }}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  size="small"
                />
              </>
            ) : (
              <>
                <Typography variant="h4" fontWeight="500" color={palette.neutral.dark}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color={palette.neutral.medium}>
                  {user.friends.length} friends
                </Typography>
              </>
            )}
          </Box>
        </FlexBetween>

        {isCurrentUser && (
          <IconButton onClick={handleEditToggle}>
            <ManageAccountsOutlined />
          </IconButton>
        )}
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: palette.neutral.main }} />
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          ) : (
            <Typography color={palette.neutral.medium}>{user.location}</Typography>
          )}
        </Box>

        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: palette.neutral.main }} />
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
            />
          ) : (
            <Typography color={palette.neutral.medium}>{user.occupation}</Typography>
          )}
        </Box>

        {isEditing && (
          <Box mt="1rem">
            <TextField
              label="Profile Picture URL"
              name="picturePath"
              value={formData.picturePath}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
          </Box>
        )}
      </Box>

      {isEditing && (
        <Box mt="1rem" display="flex" justifyContent="flex-end" gap="1rem">
          <Button
            onClick={handleEditToggle}
            variant="outlined"
            sx={{
              color: palette.neutral.dark,
              borderColor: palette.neutral.medium,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: palette.primary.main,
              color: "white",
              "&:hover": { backgroundColor: palette.primary.dark },
            }}
          >
            Save
          </Button>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default UserWidget;
