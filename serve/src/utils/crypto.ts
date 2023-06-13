import * as crypto from 'crypto';
export const CreateMd5 = (value: string): string => {
  const hash = crypto.createHash('md5');
  hash.update(value);
  return hash.digest('hex');
}