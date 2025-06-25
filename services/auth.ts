import { UserInfo } from "@/types/Interfaces";

const URL_API_LOGIN = 'http://172.20.1.70:3001/api/v1'

export const loginUser = async (username: string, password: string): Promise<string | null> => {
  try {
    const token = await fetch(`${URL_API_LOGIN}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!token.ok) {
      console.error('Login failed:', token.statusText);
      return null;
    }

    const data = await token.json();
    if (!data.token) return null

    return data.token;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
}

export const verifyTokenUser = async (token: string) => {
  try {
    const response = await fetch(`${URL_API_LOGIN}/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.error('Token verification failed:', response.statusText);
      return null;
    }

    const data = await response.json();
    console.log(data);

    const mappedData: UserInfo = {
      company: data.company,
      email: data.email,
      document: data.document,
      names: data.names,
      lastnames: data.lastnames,
      process: data.process,
    };

    return mappedData;
  } catch (error) {
    console.error('Error during token verification:', error);
    return null;
  }
}