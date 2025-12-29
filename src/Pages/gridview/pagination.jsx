import React from "react";
import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function CustomPagination() {
  return (
    <Stack spacing={2}>
      <MuiPagination
        className="MuiPagination"
        count={4}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
}
export default CustomPagination;
