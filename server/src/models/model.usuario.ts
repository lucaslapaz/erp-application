import model from "../core/model";

export async function loginModel(_username: string) {
  return await model.DbRead("usuarios", ["idusuario", "username", "password"], {
    username: _username
  });
}

export async function authenticateModel(userInfo: object){
  return await model.DbRead("usuarios", ["idusuario", "username", "permission"], userInfo);
}

export async function validateTokenModel(userInfo: object) {
  return await model.DbRead("usuarios", ["idusuario", "username", "permission"], userInfo);
}