import { sign, verify } from 'jsonwebtoken';

export async function encodeJwt<T extends Record<string, unknown>>(
  payload: T,
  privateKey: string,
  expiresIn: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    sign(payload, privateKey, { expiresIn }, (error, encoded) => {
      if (error) {
        return reject(error);
      }

      return resolve(encoded);
    });
  });
}

export async function decodeJwt<T = unknown>(
  token: string,
  privateKey: string,
): Promise<T> {
  return new Promise((resolve, reject) => {
    verify(token, privateKey, {}, (error, decoded) => {
      if (error) {
        return reject(error);
      }

      return resolve(decoded as T);
    });
  });
}
