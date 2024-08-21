import Cookies from "js-cookie";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setCookieSession = (name: string, sessionData: any) => {
  Cookies.set(name, JSON.stringify(sessionData), { expires: 1 });
};

export const getCookieSession = (name: string) => {
  const session = Cookies.get(name);
  if (session) {
    return JSON.parse(session);
  }
  return null;
};

export const removeCookieSession = (name: string) => {
  Cookies.remove(name);
};
