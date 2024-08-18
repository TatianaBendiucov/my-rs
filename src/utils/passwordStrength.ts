export const checkPasswordStrength = (password: string): number => {
  if (!password) {
    return 0;
  }

  let score = 0;

  if (/[0-9]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  return score;
};
