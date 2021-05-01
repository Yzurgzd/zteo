import Cookies from "js-cookie";
import useSWR from "swr";

export async function fetchWithToken(...args) {
  if (!(await VerifyToken())) {
    await RefreshToken();
  }

  const [url, token] = args;

  const userApi = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  if (userApi.ok) {
    return userApi.json();
  } else {
    return null;
  }
}

export function useUser() {
  const token = Cookies.get("token");

  const { data, mutate, error } = useSWR(
    [`${process.env.API_URL}/auth/users/me/`, token],
    fetchWithToken
  );

  const loadingUser = data === undefined && !error;
  const loggedOut = !data && !loadingUser;

  return {
    loadingUser,
    loggedOut,
    user: data,
    mutate,
  };
}

export async function RefreshToken() {
  let refresh = Cookies.get("refresh");

  if (refresh) {
    const refreshApi = await fetch(`${process.env.API_URL}/auth/jwt/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    if (refreshApi.ok) {
      let result = await refreshApi.json();
      Cookies.set("token", result.access, { expires: 1 });
    }
  } else {
    return false;
  }
}

export async function VerifyToken() {
  let access = Cookies.get("token");

  if (access) {
    const verifyApi = await fetch(`${process.env.API_URL}/auth/jwt/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: access }),
    });

    if (verifyApi.ok) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
