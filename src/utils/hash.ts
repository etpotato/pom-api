import { pbkdf2, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

const pbkdf2Promise = promisify(pbkdf2);

const SEPARATOR = '$';

async function getHash(password: string, salt: string) {
  const hash = (
    await pbkdf2Promise(password, salt, 10000, 64, 'sha256')
  ).toString('hex');
  return hash + SEPARATOR + salt;
}

export async function generateHash(password: string) {
  const salt = randomBytes(16).toString('hex');
  return getHash(password, salt);
}

export async function validateHash(passwordToCheck: string, hash: string) {
  const [, salt] = hash.split(SEPARATOR);
  const hashToCheck = await getHash(passwordToCheck, salt);

  return hashToCheck === hash;
}
