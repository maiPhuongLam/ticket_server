import * as jwt from 'jsonwebtoken';

export const generateToken = async (payload, key) => {
  const token = jwt.sign(payload, key, {
    expiresIn: key === process.env.ACCESS_TOKEN_KEY ? '1h' : '7d',
  });
  return token;
};

export const validateToken = async (token, key) => {
  const payload = await jwt.verify(token, key);
  return payload;
};
