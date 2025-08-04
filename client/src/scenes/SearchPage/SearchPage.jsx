import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:3001/users/search/users?query=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <WidgetWrapper>
      <Typography variant="h4" mb={2}>
        Поиск пользователей
      </Typography>
      <Box display="flex" gap="1rem" mb="1rem">
        <TextField
          fullWidth
          label="Введите имя или фамилию"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Найти
        </Button>
      </Box>

      <List>
        {results.map((user) => (
          <Box key={user._id}>
            <ListItem
              alignItems="flex-start"
              component={NavLink}
              to={`/profile/${user._id}`}
              sx={{
                textDecoration: "none",
                color: theme.palette.text.primary,
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <ListItemAvatar>
                <Avatar src={user.picturePath} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {user.location} — {user.occupation}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </Box>
        ))}
      </List>
    </WidgetWrapper>
  );
};

export default SearchPage;
