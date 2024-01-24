import { Alert, Snackbar } from "@mui/material";

export default function Notificacao({ open, onClose, severity, message }) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
