import { checkPasswordStrength } from "../utils/passwordStrength";

export const PasswordStrengthIndicator = ({ password }) => {
  const score = checkPasswordStrength(password);

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score];
  const strengthColor = ["", "red", "orange", "blue", "green"][score];

  return (
    <div>
      <p style={{ color: strengthColor }}>{strengthLabel}</p>
    </div>
  );
};
