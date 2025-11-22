import type { ApiResponse, tEmpresas } from '@/types/types';
import { http } from './http';

const BASE_ROUTER = '/companies';

const finCompanyByCod = async (cod: number): Promise<ApiResponse<tEmpresas | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}`, {
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

const findCompanies = async (): Promise<ApiResponse<tEmpresas[] | null>> => {
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

export { finCompanyByCod, findCompanies };
