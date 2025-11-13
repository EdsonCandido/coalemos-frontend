import type { ApiResponse, tBanners } from "@/types/types";
import { http } from "./http";

const BASE_ROUTER = "/banners";

const findCurrentBanners = async (): Promise<ApiResponse<tBanners[] | null>> => {
  const request = await http
    .get(`${BASE_ROUTER}/current`)
    .then((e) => ({ data: e.data, success: true, message: null }))
    .catch((e) => ({
      data: null,
      success: false,
      message: e.response.data || e.message,
    }));

  return request;
};

const findBannerByCod = async (cod: number): Promise<ApiResponse<tBanners | null>> => {
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

const findBanners = async (): Promise<ApiResponse<tBanners[] | null>> => {
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

const changeActiveBannerByCod = async (
  cod: number,
): Promise<ApiResponse<null | tBanners>> => {
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

const storeBanner = async (banner: tBanners): Promise<ApiResponse<null | tBanners>> => {
  const payload = new FormData();

  payload.append('data_vigencia_inicial', banner.data_vigencia_inicial);
  payload.append('data_vigencia_final', banner.data_vigencia_final);
  payload.append('descricao', banner.descricao);

  if(banner.arquivo) {
    payload.append('file', banner.arquivo);
  }
  if(banner.cod) {
    payload.append('cod', String(banner.cod));
  }

  const request = await http
    .post(BASE_ROUTER, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
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


export { findCurrentBanners, findBannerByCod, findBanners, changeActiveBannerByCod, storeBanner };