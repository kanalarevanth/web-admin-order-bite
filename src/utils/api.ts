import { handleResHeaders } from "./headers";
import { localKeys } from "../utils/local-storage";
import { User } from "../types/type";

type APIInput = {
  url?: string;
  query?: any;
};

type GetInput = APIInput;
type PostInput = APIInput & {
  multipart?: boolean;
  body?: any;
};

export const UpdatedAtHeader = "UPDATED-USER-AT";

export const ContentTypes = {
  json: "application/json",
  text: "text/html",
  multipart: "multipart/form-data",
};

export const CommonHeaders = {
  "cache-control": "no-cache",
  pragma: "no-cache",
};

const handleRes = async (
  res: Response,
  resolve: (value?: unknown) => void,
  reject: (reason?: any) => void
) => {
  const contentType: any = res.headers.get("content-type");
  if (res.ok) {
    if (contentType?.indexOf(ContentTypes.json) >= 0) {
      resolve(await res.json());
    } else {
      resolve(await res.text());
    }
  } else {
    if (contentType?.indexOf(ContentTypes.json) >= 0) {
      const error = await res.json();
      console.error("API ERROR 1 : ", error);
      reject({ status: res.status, headers: res.headers, body: error });
    } else {
      const error = await res.text();
      console.error("API ERROR 2 : ", error);
      reject({ status: res.status, headers: res.headers, body: error });
    }
  }
};

export const getData = ({ url, query = {} }: GetInput): Promise<any> => {
  return new Promise((resolve, reject) => {
    const queryString = new URLSearchParams(query).toString();
    const currentUserData: User | null = JSON.parse(
      localStorage.getItem(localKeys.user) || "null"
    );
    const tokenData = localStorage.getItem(localKeys.token);

    fetch(url + (queryString ? `?${queryString}` : ""), {
      method: "get",
      headers: {
        "content-type": ContentTypes.json,
        ...CommonHeaders,
        ...(tokenData ? { Authorization: "Bearer " + tokenData } : {}),
        ...(currentUserData
          ? {
              [UpdatedAtHeader]: new Date(
                currentUserData?.updatedAt || ""
              ).toISOString(),
            }
          : {}),
      },
    })
      .then((res) => {
        handleResHeaders(res);
        handleRes(res, resolve, reject);
      })
      .catch((error) => {
        console.error("API ERROR : ", error);
        reject(error);
      });
  });
};

export const postData = ({
  url,
  body,
  query = {},
  multipart = false,
}: PostInput): Promise<any> => {
  const currentUserData: User | null = JSON.parse(
    localStorage.getItem(localKeys.user) || "null"
  );
  const tokenData = localStorage.getItem(localKeys.token);

  return new Promise((resolve, reject) => {
    const queryString = new URLSearchParams(query).toString();

    fetch(url + (queryString ? `?${queryString}` : ""), {
      method: "post",
      headers: {
        ...(multipart ? {} : { "content-type": ContentTypes.json }),
        ...CommonHeaders,
        ...(tokenData ? { Authorization: "Bearer " + tokenData } : {}),
        ...(currentUserData
          ? {
              [UpdatedAtHeader]: new Date(
                currentUserData?.updatedAt || ""
              ).toISOString(),
            }
          : {}),
      },
      body: multipart ? body : JSON.stringify(body),
    })
      .then((res) => {
        handleResHeaders(res);
        handleRes(res, resolve, reject);
      })
      .catch((error) => {
        console.error("API ERROR : ", error);
        reject(error);
      });
  });
};
