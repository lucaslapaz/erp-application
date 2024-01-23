import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "id", headerName: "ID", width: "70" },
  { field: "productName", headerName: "Produto", width: 130 },
  { field: "quantity", headerName: "Qnt.", width: 50 },
  {
    field: "unitaryValue",
    headerName: "Val. unit.",
    type: "number",
    width: 90,
  },
  {
    field: "subtotal",
    headerName: "Subtotal",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${Math.round(params.row.quantity * params.row.unitaryValue)}`,
  },
];
const rows = [
  { id: 1, productName: "Snow", quantity: 2, unitaryValue: 35 },
  { id: 2, productName: "Lannister", quantity: 1, unitaryValue: 42 },
  { id: 3, productName: "Lannister", quantity: 4, unitaryValue: 45 },
  { id: 4, productName: "Stark", quantity: 5, unitaryValue: 16 },
  { id: 5, productName: "Targaryen", quantity: 6, unitaryValue: 63.2 },
  { id: 6, productName: "Melisandre", quantity: 3, unitaryValue: 150 },
  { id: 7, productName: "Clifford", quantity: 1, unitaryValue: 44 },
  { id: 8, productName: "Frances", quantity: 4, unitaryValue: 36 },
  { id: 9, productName: "Roxie", quantity: 9, unitaryValue: 65 },
  { id: 10, productName: "Snow", quantity: 2, unitaryValue: 35 },
  { id: 11, productName: "Snow", quantity: 2, unitaryValue: 35 },
  { id: 12, productName: "Lannister", quantity: 1, unitaryValue: 42 },
  { id: 13, productName: "Lannister", quantity: 4, unitaryValue: 45 },
  { id: 14, productName: "Stark", quantity: 5, unitaryValue: 16 },
  { id: 15, productName: "Targaryen", quantity: 6, unitaryValue: 63.2 },
  { id: 16, productName: "Melisandre", quantity: 3, unitaryValue: 150 },
  { id: 17, productName: "Clifford", quantity: 1, unitaryValue: 44 },
  { id: 18, productName: "Frances", quantity: 4, unitaryValue: 36 },
  { id: 19, productName: "Roxie", quantity: 9, unitaryValue: 65 },
];

const ContainerProdutosFicha = styled(Box)(({asd, theme}) => {
  return {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto 1fr",
  }
})

export default function ProdutosFicha({ sx }) {
  return (
    <ContainerProdutosFicha sx={sx}>
      <Typography variant="h4" sx={{ marginBottom: "15px", marginTop: "10px" }}>
        Mesa 23
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 40, 60]}
        checkboxSelection
      />
    </ContainerProdutosFicha>
  );
}
