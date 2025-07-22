import { useState, useEffect } from "react";

export const TOKEN_KEY = "authToken";
export const ROLE = "role";

export default function useToken() {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const saveToken = (userToken: string) => {
    localStorage.setItem(TOKEN_KEY, userToken);
    setTokenState(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE);
    setTokenState(null);
  };

  return {
    token,
    saveToken,
    removeToken,
  };
}
