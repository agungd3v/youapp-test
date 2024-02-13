import { stringify } from "querystring";
import Cookies from "js-cookie";

interface RequestProps {
  url: string;
  method: string | "GET";
  body?: any;
  headers?: any;
  queryParams?: any;
  request?: any;
  response?: any;
}

export default async function request({
  url,
  method,
  body,
  headers,
  queryParams,
  request,
  response
}: RequestProps) {
  const token = request ? request.find((ab: any) => ab.name === "yp_tkn") : "";

  if (queryParams) {
    url = `${url}?${stringify(queryParams)}`;
  }

  const defaultHeader = {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Accept": "*/*",
    "Content-Type": "application/json",
    "User-Agent": headers ? headers["user-agent"] : "",
    "X-Access-Token": token ? token.value : ""
  }

  let options = {
    method: method,
    headers: new Headers({...defaultHeader}),
  }

  if (method != "GET") {
    options = { ...options, ...{ body: body ? JSON.stringify(body) : null } };
  }

  if (headers) {
    return fetch(url, options).then(async (res) => {
      const json = await res.json();
      return {...json, status: res.status};
    }).catch(err => {
      return err;
    });
  }
}
