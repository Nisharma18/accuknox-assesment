import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addWidget } from "../redux/features/categoriesSlice";
import { styled } from "@mui/material/styles";

import {
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& input": { width: "100%", fontSize: "0.875rem", padding: "0.3rem 0.5rem" },
}));

function WidgetForm({ categoryId, handleClose }) {
  const [name, setName] = useState("");
  const [chartFieldsData, setChartFieldsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {console.log(chartFieldsData);
  }, [chartFieldsData])

  const addChartFields = () => {
    setChartFieldsData([
     ...chartFieldsData,
      {
        id: crypto.randomUUID(),
        label: "",
        value: "",
        color: "#000000"
      },
    ]);
  }


  const handleChartFieldValue = ({id, key, value}) => {
    setChartFieldsData(chartFieldsData.map(field => (field.id === id)? {...field, [key]: value } : field));
  }

  const handleFormClose = () => {
    setName("");
    setChartFieldsData([]);
    handleClose();
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addWidget({ categoryId, widget: {id: crypto.randomUUID(), active: true, name, chartFieldsData} }));
    handleClose();
  };

  return (
    <Box
      component="form"
      sx={{
        padding: "1rem",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={handleFormSubmit}
      noValidate
      autoComplete="off">
      <Box sx={{ marginBottom: "0.6rem" }}>
        <InputLabel
          htmlFor="name"
          sx={{ color: "#000000DE" }}>
          Name:
        </InputLabel>
        <StyledTextField
          id="name"
          sx={{ width: "100%" }}
          size="small"
          placeholder="Enter the widget name..."
          variant="outlined"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
        />
      </Box>
      <Box>
        <Typography>Chart Data:</Typography>
        {chartFieldsData.length > 0 &&
          chartFieldsData.map((field) => (
            <Stack
              key={field.id}
              direction="row"
              sx={{ marginBottom: "0.6rem" }}
              gap={1}>
              <StyledTextField
                size="small"
                placeholder="Enter label..."
                variant="outlined"
                value={field.label}
                onChange={(e) => {handleChartFieldValue({id: field.id, key: "label", value: e.target.value})}}
              />
              <StyledTextField
                size="small"
                sx={{ width: "8rem" }}
                placeholder="Enter value..."
                variant="outlined"
                value={field.value}
                onChange={(e) => {handleChartFieldValue({id: field.id, key: "value", value: e.target.value})}}
              />
              <StyledTextField
                type="color"
                sx={{ width: "2rem" }}
                size="small"
                variant="outlined"
                value={field.color}
                onChange={(e) => {handleChartFieldValue({id: field.id, key: "color", value: e.target.value})}}
              />
            </Stack>
          ))}
        <Button
          variant="contained"
          size="small"
          onClick={addChartFields}
          sx={{ marginLeft: "auto", display: "block" }}
        >
          Add New Fields
        </Button>
      </Box>
      <Stack
        direction="row"
        gap={1}
        justifyContent="end"
        sx={{ marginTop: "auto" }}>
        <Button
          variant="outlined"
          onClick={handleFormClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained">
          Submit
        </Button>
      </Stack>
    </Box>
  );
}

export default WidgetForm;
