export interface TokenDecode {
    iss: string;
    aud: string;
    iat: number;
    nbf: number;
    exp: number;
    data: Data;
  }
export  interface Data {
    id: number;
    username: string;
  }