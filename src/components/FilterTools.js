import React, { useContext } from "react";
import { Stack, Box, Button } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FilterContext from "../Context/FilterContext";

export default function FilterTools() {

  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* for selecting score  */}

        <ScoreFilter />
      </Stack>
    </Box>
  );
}

// function for alert slider
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// function for score filter button
export function ScoreFilter() {
  const { scoreState, changeScoreState } = useContext(FilterContext); // for handling the state of asc and desc according to score

  const [open, setOpen] = React.useState(false);

  // function to open the snackbar
  async function handleClick() {
    await changeScoreState(); // changing the state for handling ascending and descending order
    setOpen(true); // changing the state for opening the snackbar
  }

  // for closing the snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        Score
        <ImportExportIcon />
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} sx={{ width: "100%" }}>
          {scoreState
            ? "Sorted in Ascending Order"
            : "Sorted in descending Order"}
        </Alert>
      </Snackbar>
    </>
  );
}
