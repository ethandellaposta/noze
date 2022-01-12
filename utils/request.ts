import axios, { Method, AxiosRequestConfig } from "axios";

const HOSTNAME = "https://2e20-2601-19b-b80-2b80-c4ec-9dc0-6b9f-583a.ngrok.io";

export type RequestOption = {
  loading?: boolean;
  message?: string;
  prefix?: boolean;
  version?: string;
} & AxiosRequestConfig;

async function request<T>(
  method: Method,
  api: string,
  options: RequestOption = {}
) {
  const {
    loading: isLoading = false,
    message,
    prefix = true,
    version,
    ...rest
  } = options;

  if (isLoading) {
    // @ts-ignore
    // show loading message
  }

  const url = prefix ? `${HOSTNAME}${api}` : api;

  const headers: { version?: string } = {};

  if (version) headers.version = version;

  if (!axios.defaults.headers.common.Authorization) {
    // get and set accessToken
  }

  return axios
    .request<T & { accessToken?: string }>({
      method,
      url,
      headers,
      ...rest,
    })
    .then((res: any) => {
      if (isLoading) {
        // turn off loading state
      }

      if (res.data.accessToken) {
        // if accessToken in response, save it
      }

      return res.data;
    })
    .catch((e: any) => {
      if (isLoading) {
        // @ts-ignore
        // turn off loading state
      }

      if (e?.response?.status === 401 || e?.response?.status === 403) {
        // need to login
      }
      throw e;
    });
}

export async function get<T>(
  api: string,
  params?: { [key: string]: any },
  options?: RequestOption
) {
  return request<T>("GET", api, { ...options, params });
}

export async function post<T>(
  api: string,
  data?: { [key: string]: any },
  options?: RequestOption
) {
  return request<T>("POST", api, { ...options, data });
}

export async function put<T>(
  api: string,
  data?: { [key: string]: any },
  options?: RequestOption
) {
  return request<T>("PUT", api, { ...options, data });
}

export async function patch<T>(
  api: string,
  data?: { [key: string]: any },
  options?: RequestOption
) {
  return request<T>("PATCH", api, { ...options, data });
}

export default async function deleteMethod<T>(
  api: string,
  data?: { [key: string]: any },
  options?: RequestOption
) {
  return request<T>("DELETE", api, { ...options, data });
}
