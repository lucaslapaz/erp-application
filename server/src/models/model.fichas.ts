import model from "../core/model";

export async function criarTipoFichaModel(infoTipoFicha: object) {
  const resposta: any = await model.DBCreate("FICHAS_TIPO", infoTipoFicha);

  if (resposta instanceof Error) {
    switch ((resposta as any).code) {
      case "ER_DUP_ENTRY":
        return new Error("Tipo de ficha já existe.");
      default:
        return new Error(
          "Erro ao inserir o novo tipo de ficha no banco de dados."
        );
    }
  }
}


export async function consultarTipoFichaModel() {
  const resposta: any = await model.DbRead('FICHAS_TIPO', ['IDTIPO', 'PATHIMAGEM', 'FORMATO', 'NOMETIPOFICHA']);
  return resposta;
}


export async function criarFichaModel(idtipo:number, inicio:number, final:number) {

  let infoFicha:object[] = [];
  for(let num = inicio; num <= final; num++){
    infoFicha.push({
      ID_TIPO: idtipo,
      NUMERO: num
    })
  }

  const resposta: any = await model.DBCreateMultiple("FICHAS", infoFicha);

  if (resposta instanceof Error) {
    console.log(resposta.message);
    switch ((resposta as any).code) {
      case "ER_DUP_ENTRY":
        return new Error("Ficha já existe.");
      default:
        return new Error(
          "Erro ao inserir o novo tipo de ficha no banco de dados."
        );
    }

    console.log(resposta);
  }
}