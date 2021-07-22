import { auth } from "../vendor/firebase";

export const getAuthHeaders = (
  headers?: Headers | string[][] | Record<string, string>
) => {
  if (!auth.currentUser) {
    return Promise.resolve({ ...headers });
  }
  return auth.currentUser
    ?.getIdToken()
    .then((token) => ({
      authorization: token || "",
      ...headers,
    }))
    .catch((err) => {
      return { ...headers };
    });
};

export const fetchWithAuth = (route: string, init?: RequestInit) => {
  if (!auth.currentUser) return Promise.reject();
  return getAuthHeaders(init?.headers).then((headers) =>
    fetch(route, {
      ...init,
      headers: {
        ...headers,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  );
};
