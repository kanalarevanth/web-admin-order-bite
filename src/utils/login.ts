import { localKeys } from "./local-storage";
import { postData } from "./api";

const { VITE_API_URL } = import.meta.env;

export const loginUser = async (body: { email: string; password: string }) => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data = (await res.json()).data;
      if (data && data?.user && data?.token) {
        localStorage.setItem(localKeys.user, JSON.stringify(data.user));
        localStorage.setItem(localKeys.token, data.token);
        return data;
      }
      return false;
    } else if (res.status === 404) {
      return { status: 404 };
    } else if (res.status === 401) {
      return { status: 401 };
    }
    return false;
  } catch (error) {
    console.log("apiErrors.somethingWrong", error);
    return false;
  }
};

export const logoutUser = async () => {
  try {
    await postData({ url: `${VITE_API_URL}/auth/logout`, body: {} });
    localStorage.removeItem(localKeys.user);
    localStorage.removeItem(localKeys.token);
    return true;
  } catch (error) {
    console.log("apiErrors.somethingWrong", error);
    return false;
  }
};
