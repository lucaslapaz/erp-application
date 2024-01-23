import model from '../core/model';

export async function criarTipoFichaModel (infoTipoFicha: object) {
    return await model.DbCreate("FICHAS_TIPO", infoTipoFicha);
}