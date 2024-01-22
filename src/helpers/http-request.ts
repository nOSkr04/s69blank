import qs from "qs";
import { HttpHandler } from "./http-handler";
import { store } from "./store";

type Options = {
  method: string;
  contentType?: string;
};

type JSONobj = any;

export class HttpRequest {
  uri?: string;
  store?: any;
  errorHandler?: (statusCode: number, error: HttpHandler) => void;

  constructor(errorHandler?: (statusCode: number, error: HttpHandler) => void) {
    this.errorHandler = errorHandler;
  }

  async request(
    api: string,
    data: JSONobj,
    options: Options,
    header: any = {}
  ) {
    if (!this.store && !store) {
      throw new Error("No store found");
    }

    if (!this.store) {
      this.store = store;
    }

    if (!this.uri) {
      throw new Error("No uri found");
    }

    const state = this.store.getState();

    const defaultOptions: any = {
      credentials: "include",
      method     : options.method,
      headers    : {
        Accept        : "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...header,
        // "X-Device"    : deviceToken,
        // Authorization : accessToken ? `Bearer ${accessToken}` : "",
      },
    };

    if (
      state.auth &&
      state.auth.accessToken &&
      typeof state.auth.accessToken === "string"
    ) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        Authorization: `Bearer ${state.auth.accessToken}`,
      };
    }

    if (
      state.auth &&
      state.auth.deviceToken &&
      typeof state.auth.deviceToken === "string"
    ) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        "X-Device": state.auth.deviceToken,
      };
    }

    if (options.contentType === "multipart/form-data") {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        ["Content-Type"]: options.contentType,
      };

      defaultOptions.body = data as any;
    } else {
      defaultOptions.body = JSON.stringify(data) as any;
    }

    let queryString = "";

    if (options.method === "GET") {
      delete defaultOptions.body;
      queryString = `?${qs.stringify(data)}`;
    }

    try {
      const res = await fetch(
        `${this.uri}${api}${queryString}`,
        defaultOptions
      );
      const http = new HttpHandler(res.status);

      const response = await http.handle(res);

      return response;
    } catch (ex) {
      if (this.errorHandler) {
        this.errorHandler((ex as HttpHandler).statusCode, ex as HttpHandler);
        return;
      }

      throw ex as HttpHandler;
    }
  }

  get(api: string, data?: JSONobj, header?: any) {
    return this.request(api, data || {}, { method: "GET" }, header);
  }

  post(api: string, data?: JSONobj, header?: any) {
    return this.request(api, data || {}, { method: "POST" }, header);
  }

  put(api: string, data?: JSONobj, header?: any) {
    return this.request(api, data || {}, { method: "PUT" }, header);
  }

  del(api: string, data?: JSONobj, header?: any) {
    return this.request(api, data || {}, { method: "DELETE" }, header);
  }

  upload(api: string, data?: JSONobj) {
    return this.request(api, data || {}, {
      method     : "POST",
      contentType: "multipart/form-data",
    });
  }
}
