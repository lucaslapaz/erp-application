import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  createTheme,
} from "@mui/material";
import { blue} from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

const tema = createTheme({
  palette: {
    primary: blue,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Inicio() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function a11yProps(index) {
  //   return {
  //     id: `simple-tab-${index}`,
  //     "aria-controls": `simple-tabpanel-${index}`,
  //   };
  // }

  return (
    <div>
      <ThemeProvider theme={tema}>

        <Container maxWidth="xl" sx={{ backgroundColor: "silver" }}>
          <Button variant="contained" onClick={handleOpen}>
            Abrir Modal
          </Button>
        </Container>
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          maxWidth="xxl"
          PaperProps={{
            sx: {
              height: "90%", // ou qualquer valor desejado
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              marginBottom: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6">Lista de Produtos</Typography>
              <CloseIcon onClick={handleClose} />
            </Box>
          </DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
