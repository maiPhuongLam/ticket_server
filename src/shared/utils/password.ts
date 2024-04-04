import * as bcrypt from 'bcrypt';

export const generateHashPassword = async (
  password: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (passwordInput, password) => {
  return await bcrypt.compare(passwordInput, password);
};
