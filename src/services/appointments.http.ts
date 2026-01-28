import type { ApiResponse, tAgendamentos, tAppointmentStatus } from '@/types/types';
import { http } from './http';

const BASE_ROUTER = '/appointments';

const findAppointments = async (): Promise<ApiResponse<tAgendamentos[] | null>> => {
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
const findMyAppointments = async (): Promise<ApiResponse<tAgendamentos[] | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}/my`)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};
const findAppointmentsByCod = async (cod: number): Promise<ApiResponse<tAgendamentos | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}/${cod}`, {
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

const changeActiveAppointmentsByCod = async (cod: number): Promise<ApiResponse<null | tAgendamentos>> => {
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

const changeStatusAppointmentsByCod = async (
  cod: number,
  status: tAppointmentStatus
): Promise<ApiResponse<null | tAgendamentos>> => {
  const request = await http
    .put(`${BASE_ROUTER}/status`, {
      status,
      cod,
    })
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

export {
  findAppointments,
  findAppointmentsByCod,
  changeActiveAppointmentsByCod,
  changeStatusAppointmentsByCod,
  findMyAppointments,
};
