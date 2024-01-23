import { Card, CardContent, Grid, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as DescontoIcon } from "../Images/menuFerramentasIcons/descontoIcon512x512.svg";
import { ReactComponent as LiberarFichaIcon } from "../Images/menuFerramentasIcons/liberarFichaIcon72x72.svg";
import { ReactComponent as PagamentoIcon } from "../Images/menuFerramentasIcons/pagamentoIcon1416x1416.svg";
import { ReactComponent as cadastroClienteIcon } from "../Images/menuFerramentasIcons/cadastroClienteIcon512x512.svg";
import { ReactComponent as calculadoraIcon } from "../Images/menuFerramentasIcons/calculadoraIcon1024x1024.svg";
import { ReactComponent as vendaDiretaIcon } from "../Images/menuFerramentasIcons/vendaDiretaIcon1024x1024.svg";
import { ReactComponent as adicionarProdutosIcon } from "../Images/menuFerramentasIcons/adicionarProdutosIcon512x512.svg";
import { ReactComponent as conferenciaIcon } from "../Images/menuFerramentasIcons/conferenciaIcon512x512.svg";
import { ReactComponent as desbloquearIcon } from "../Images/menuFerramentasIcons/desbloquearIcon512x512.svg";
import { ReactComponent as novaFichaIcon } from "../Images/menuFerramentasIcons/novaFichaIcon512x512.svg";


const botoes = [
  {
    name: "descontoBtn",
    label: "Desconto",
    component: DescontoIcon,
    viewBox: "0 0 512 512",
  },
  {
    name: "liberarFichaBtn",
    label: "Liberar",
    component: LiberarFichaIcon,
    viewBox: "0 0 72 72",
  },
  {
    name: "PagamentoBtn",
    label: "Pagamento",
    component: PagamentoIcon,
    viewBox: "0 0 1416 1416",
  },
  {
    name: "CadastroClientesBtn",
    label: "Clientes",
    component: cadastroClienteIcon,
    viewBox: "0 0 512 512",
  },
  {
    name: "CalculadoraBtn",
    label: "Calculadora",
    component: calculadoraIcon,
    viewBox: "0 0 1024 1024",
  },
  {
    name: "VendaDiretaBtn",
    label: "V. Direta",
    component: vendaDiretaIcon,
    viewBox: "0 0 1024 1024",
  },
  {
    name: "AdicionarProdutoBtn",
    label: "Adc. Prod.",
    component: adicionarProdutosIcon,
    viewBox: "0 0 512 512",
  },
  {
    name: "ConferenciaBtn",
    label: "Conferência",
    component: conferenciaIcon,
    viewBox: "0 0 512 512",
  },
  {
    name: "DesbloquearBtn",
    label: "Desb. Ficha",
    component: desbloquearIcon,
    viewBox: "0 0 512 512",
  },
  {
    name: "NovaFichaBtn",
    label: "Nova Ficha",
    component: novaFichaIcon,
    viewBox: "0 0 512 512",
  },
];

export default function MenuFerramentas({ sx }) {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent='center'
      gap={1}
      margin={0}
      overflow="hidden auto"
      sx={{
        ...sx,
        borderTop: (theme) => ` 1px solid ${theme.palette.divider}`,
        borderRight: (theme) => ` 1px solid ${theme.palette.divider}`,
      }}
    >
      {botoes.map((botao, indice) => {
        return (
          <Card
            key={indice}
            variant="outlined"
            sx={{
              width: "110px",
              height: "120px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <SvgIcon
                component={botao.component}
                viewBox={botao.viewBox}
                sx={{ width: "60px", height: "60px" }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  userSelect: "none",
                }}
              >
                {botao.label}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Grid>
  );
}
