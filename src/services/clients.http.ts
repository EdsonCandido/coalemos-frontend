import type { ApiResponse, tCEP, tClientes } from '@/types/types';
import { http } from './http';

const BASE_ROUTER = '/clients';
const findCity = async (uf: string): Promise<ApiResponse<Array<{ cidade: string }> | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}/find/cidade`, {
      params: {
        uf,
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

const findUF = async (): Promise<ApiResponse<Array<{ estado: string }> | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}/find/uf`)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

const findClient = async ({
  search,
  uf,
  cidade,
  cpf_cnpj,
}: {
  search?: string;
  uf?: string;
  cidade?: string;
  cpf_cnpj?: string;
}): Promise<ApiResponse<tClientes[] | null>> => {
  const request = await http
    .get(BASE_ROUTER, {
      params: {
        search,
        cpf_cnpj,
        uf,
        cidade,
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

const findClientById = async (cod: number): Promise<ApiResponse<tClientes | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}/`, {
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

const storeClient = async (data: tClientes): Promise<ApiResponse<tClientes | null>> => {
  const request = await http
    .post(`${BASE_ROUTER}/store`, data)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

const findCEP = async (cep: string): Promise<ApiResponse<tCEP | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}/search/cep`, {
      params: {
        cep,
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

const changeActiveClient = async (cod: number): Promise<ApiResponse<tClientes | null>> => {
  const request = await http
    .delete(`${BASE_ROUTER}/${cod}`)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

export { findCity, findUF, findClientById, findClient, storeClient, findCEP, changeActiveClient };
