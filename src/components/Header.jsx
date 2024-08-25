import { useSelector, useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { grey, indigo } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import {updateSearchValue} from "../redux/features/searchSlice";
import {
  Box,
  Breadcrumbs,
  Container,
  InputBase,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

// Search Input Style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  fontSize: "1rem",
  backgroundColor: alpha("#cfd8dc", 0.5),
  "&:hover": {
    backgroundColor: alpha("#cfd8dc", 0.75),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

export default function Header() {
  const searchValue = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/">
      Home
    </Link>,
    <Typography
      key="2"
      sx={{ fontSize: "0.925rem", fontWeight: "700", color: indigo[700] }}>
      Dashboard V2
    </Typography>,
  ];

  return (
    <Box
      component="header"
      sx={{
        padding: "0.25rem 0",
        backgroundColor: grey["A100"],
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
      <Container
        component="nav"
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Breadcrumbs
          separator="›"
          component="div"
          sx={{ fontSize: "0.875rem" }}
          aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
        <Stack
          spacing={1}
          direction="row">
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ width: "1.15rem" }} />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchValue}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) =>
                dispatch(updateSearchValue({ value: e.target.value }))
              }
            />
          </Search>
          <IconButton aria-label="notification">
            <NotificationsActiveOutlinedIcon />
          </IconButton>
          <IconButton aria-label="user">
            <AccountCircleOutlinedIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
