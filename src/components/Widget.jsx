import { useDispatch } from "react-redux";
import { removeWidget } from "../redux/features/categoriesSlice";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Card, CardContent, Stack, Typography, IconButton } from "@mui/material";

export default function Widget({ children, widget, categoryId }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };
  return (
    <>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography>{widget.name}</Typography>
            <IconButton size="small" onClick={handleRemove}>
              <CloseOutlinedIcon  />
            </IconButton>
          </Stack>
          {children}
        </CardContent>
      </Card>
    </>
  );
}
