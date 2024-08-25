import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DonutChart from "./DonutChart";
import Widget from "./Widget";
import WidgetDrawer from "./WidgetDrawer";
import UpdateWidgetsDrawer from "./WidgetsListDrawer";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export default function Dashboard() {
  const [days, setDays] = useState(2);
  const categories = useSelector((state) => state.categories.value);
  const searchValue = useSelector((state) => state.search.value);
  const [filteredArray, setFilteredArray] = useState([]);

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const getFilteredArray = () => {
    if (!searchValue) {
      setFilteredArray(categories);
      return;
    }

    const filteredArray = categories.map((cat) => ({
      ...cat,
      widgets: cat.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    }));

    setFilteredArray(filteredArray);
  };

  useEffect(() => {
    getFilteredArray();
  }, [searchValue, categories]);

  return (
    <Container
      maxWidth="xl"
      sx={{ padding: "1rem 0" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Typography
          variant="h6"
          component="h1">
          CNAPP Dashboard
        </Typography>
        <Stack
          spacing={2}
          direction="row">
          <UpdateWidgetsDrawer />
          <IconButton
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              borderRadius: "6px",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            size="small"
            aria-label="refresh">
            <LoopOutlinedIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              borderRadius: "6px",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            aria-label="list menu">
            <MoreVertOutlinedIcon fontSize="inherit" />
          </IconButton>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <Select
              value={days}
              onChange={handleDaysChange}
              displayEmpty
              size="small"
              sx={{ fontSize: "0.875rem" }}
              inputProps={{ "aria-label": "Days Filter" }}>
              <MenuItem value={2}>Last 2 days</MenuItem>
              <MenuItem value={7}>Last 7 days</MenuItem>
              <MenuItem value={30}>Last 30 days</MenuItem>
              <MenuItem value={60}>Last 60 days</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      {filteredArray &&
        filteredArray.map((category) => category && (
            <Box key={category.id} sx={{ padding: "1rem 0 0" }}>
              <Typography
                variant="subtitle1"
                component="h2"
                sx={{ paddingBottom: "0.35rem" }}>
                {category.name}
              </Typography>
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}>
                {category.widgets.map(
                  (widget) =>
                    widget.active && (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={widget.id}>
                        <Widget
                          categoryId={category.id}
                          widget={widget}>
                          <DonutChart data={widget.chartFieldsData} />
                        </Widget>
                      </Grid>
                    )
                )}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      minHeight: "200px",
                      backgroundColor: "#f5f5f5",
                    }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}>
                      <WidgetDrawer categoryId={category.id} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )
        )}
    </Container>
  );
}
