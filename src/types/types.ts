export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type tBanners = {
  cod?: number;
  descricao: string;
  arquivo?: string;
  nome_arquivo?: string;
  data_vigencia_inicial: string;
  data_vigencia_final: string;
  created_at?: string;
  cod_usuario_criacao?: number;
  updated_at?: string;
  cod_usuario_updated?: number;
};
