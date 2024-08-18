import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import * as Yup from "yup";

type ValidationSchema = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: File | FileList | null;
  country: string;
};

export const useValidationSchema = () => {
  const countries = useSelector((state: RootState) => state.countries.list);

  return Yup.object<ValidationSchema>().shape({
    name: Yup.string()
      .matches(/^[A-Z]/, "Name must start with an uppercase letter")
      .required("Name is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .required("Age is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    gender: Yup.string().required("Gender is required"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Terms and conditions is required"),
    picture: Yup.mixed()
      .required("Picture is required")
      .test("fileSize", "File too large", (value) => {
        if (!value) return true;

        const file = value instanceof FileList ? value[0] : value;
        return file instanceof File && file.size <= 1024 * 1024;
      })
      .test("fileFormat", "Unsupported Format", (value) => {
        if (!value) return true;

        const file = value instanceof FileList ? value[0] : value;

        return (
          file instanceof File &&
          ["image/jpeg", "image/png"].includes((file as File).type)
        );
      }),
    country: Yup.string()
      .required("Country is required")
      .oneOf(countries, "Invalid country. Choose a country from the list"),
  });
};
