import { type tUsuarios, type ApiResponse } from "@/types/types";
import { http } from "./http";

const BASE_ROUTER = "/users";

const findUserAll = async (): Promise<ApiResponse<tUsuarios[] | null>> => {
  const request = await http
    .get(BASE_ROUTER)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

const findUserById = async (
  cod: number,
): Promise<ApiResponse<tUsuarios | null>> => {
  const request = await http
    .get(BASE_ROUTER, {
      params: {
        cod,
      },
    })
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

const storeUser = async ({
  foto_perfil = null,
  login,
  nome,
  cod,
  cpf,
  is_admin = false,
  is_primeiro_acesso = false,
  senha = null,
}: tUsuarios): Promise<ApiResponse<tUsuarios | null>> => {
  const payload = {
    cpf,
    login,
    senha,
    nome,
    cod,
    is_admin,
    is_primeiro_acesso,
    foto_perfil,
  };
  const request = await http
    .post(BASE_ROUTER, payload)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

const validLogin = async (login: string): Promise<ApiResponse<boolean>> => {
  const request = await http
    .post(`${BASE_ROUTER}/valid`, { login })
    .then(() => ({ data: true, success: true, message: null }))
    .catch((e) => ({
      data: false,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

const changeActiveUser = async (
  cod: number,
): Promise<ApiResponse<null | tUsuarios>> => {
  const request = await http
    .put(`${BASE_ROUTER}/${cod}`)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

export { findUserById, findUserAll, storeUser, validLogin, changeActiveUser };
