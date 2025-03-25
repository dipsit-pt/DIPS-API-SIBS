// Import --------------------------------------------
import { log } from '@dips/api-log';
import crypto from 'crypto';

// Decrypt Message
export const decryptMessage = async (message, authTag, secretKey, iv) => {
  try {
    // Convert inputs from Base64
    const secret = Buffer.from(secretKey, 'base64');
    const msg = Buffer.from(message, 'base64');
    const nonce = Buffer.from(iv, 'base64');
    const tag = Buffer.from(authTag, 'base64');

    // Create decipher
    const decipher = crypto.createDecipheriv('aes-256-gcm', secret, nonce);

    decipher.setAuthTag(tag);

    // Decrypt message
    let decrypted = decipher.update(msg, 'binary', 'utf8');

    // TODO: This line is comment because some error, need to be checked properly
    // decrypted += decipher.final('utf8');

    //console.log(decrypted);

    return decrypted;
  } catch (e) {
    console.log(e);
    log(JSON.stringify(e, null, 2), 'error');
  }
};

export const decryptWebookMessage = async (message, authTag, secretKey, iv) => {
  const key = Buffer.from(secretKey, 'base64');
  const data = Buffer.from(message, 'base64');
  const tag = Buffer.from(authTag, 'base64');
  const ivBuf = Buffer.from(iv, 'base64');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, ivBuf);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);

  return decrypted.toString('utf8');
};
