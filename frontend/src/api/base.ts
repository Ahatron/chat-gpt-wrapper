import { useAlertStore } from '@/stores/alert';
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

class BaseInstanse {
  private readonly baseURL = import.meta.env.VITE_APP_API;
  private readonly base = axios.create({
    baseURL: this.baseURL,
    timeout: 60000,
  });

  constructor() {
    this.base.interceptors.response.use(
      (response) => {
        const appStore = useAlertStore();

        appStore.disableLoading();

        return response;
      },
      (error) => {
        const appStore = useAlertStore();

        appStore.disableLoading();

        return Promise.reject(error);
      }
    );

    this.base.interceptors.request.use(
      async (config) => {
        const appStore = useAlertStore();

        appStore.setLoading();

        console.log(config.url);

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.base;
  }
}


export const isErrorStatusCode = (res: { code: string; statusCode?: number }) =>
  res.code === 'ERR_NETWORK' || (res?.statusCode && res.statusCode >= 400);


export function getErrorMessage(error: any): string {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;

    if (message) {
      return typeof message === 'string' ? message : message.join('\n ');
    }
    return error.message;
  }
  return 'Необработанная ошибка!';
}

export function setAlertSuccess(message?: string) {
  const appStore = useAlertStore();

  appStore.setAlertState('success', message,);
}

export function setAlertError(error: any, message?: string) {
  const appStore = useAlertStore();

  appStore.setAlertState(
    'error',
    message + ' ' + getErrorMessage(error),

  );
}

interface HttpRequest {
  url: string;
  config?: AxiosRequestConfig;
  messages?: {
    success?: string | boolean;
    error?: string;
  };
}
interface FetchRequest extends HttpRequest {
  method: 'get' | 'head' | 'options';
}
interface BodyRequest extends HttpRequest {
  body?: string | object | FormData;
}
interface SendRequest extends BodyRequest {
  method: 'post' | 'patch' | 'put' | 'delete';
}

type Request = FetchRequest | SendRequest;

class BaseRequest {
  private readonly base = new BaseInstanse().getInstance();

  async try<Res>(req: Request): Promise<Res | null> {
    try {
      let res: AxiosResponse<Res>;
      if (
        req.method === 'post' ||
        req.method === 'patch' ||
        req.method === 'put' ||
        req.method === 'delete'
      ) {
        res = await this.base[req.method](req.url, req.body, req.config);
      } else {
        res = await this.base[req.method](req.url, req.config);
      }
      console.log(res);
      if (req?.messages?.success) {
        if (typeof req.messages.success === 'string') {
          setAlertSuccess(req.messages.success);
        } else {
          setAlertSuccess();
        }
      }
      return res.data;
    } catch (error) {
      setAlertError(error, req?.messages?.error);
    }
    return null;
  }
  async tryPost<Res>(req: BodyRequest): Promise<Res | null> {
    return this.try<Res>({ method: 'post', ...req });
  }
  async tryPatch<Res>(req: BodyRequest): Promise<Res | null> {
    return this.try<Res>({ method: 'patch', ...req });
  }
  async tryPut<Res>(req: BodyRequest): Promise<Res | null> {
    return this.try<Res>({ method: 'put', ...req });
  }
  async tryDelete<Res>(req: BodyRequest): Promise<Res | null> {
    return this.try<Res>({ method: 'delete', ...req });
  }
  async tryGet<Res>(req: HttpRequest): Promise<Res | null> {
    return this.try<Res>({ method: 'get', ...req });
  }
  async tryHead<Res>(req: HttpRequest): Promise<Res | null> {
    return this.try<Res>({ method: 'head', ...req });
  }
  async tryOptions<Res>(req: HttpRequest): Promise<Res | null> {
    return this.try<Res>({ method: 'options', ...req });
  }
}

export const baseReq = new BaseRequest();
