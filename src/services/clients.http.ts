import type { ApiResponse } from '@/types/types';
import { http } from './http';

const BASE_ROUTER = '/clients';
const findCity = async (): Promise<ApiResponse<string[] | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}/find/city`)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

const findUF = async (): Promise<ApiResponse<string[] | null>> => {
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

export { findCity, findUF };
