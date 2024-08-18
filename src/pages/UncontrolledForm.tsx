import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addUser } from "../store/usersSlice";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useValidationSchema } from "../utils/validationSchema";
import { PasswordStrengthIndicator } from "../components/PasswordStrength";

const UncontrolledFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries.list);
  const validationSchema = useValidationSchema();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const goBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = {
      name: nameRef.current?.value ?? "",
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
      confirmPassword: confirmPasswordRef.current?.value ?? "",
      gender: genderRef.current?.value ?? "",
      terms: termsRef.current?.checked ?? false,
      picture: pictureRef.current?.files?.[0],
      country: countryRef.current?.value ?? "",
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          addUser({
            ...formValues,
            picture: reader.result as string,
          }),
        );
      };

      if (formValues.picture) {
        reader.readAsDataURL(formValues.picture);
      }

      setErrors({});
      navigate("/", { state: { newUser: formValues } });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((validationError) => {
          if (validationError.path) {
            newErrors[validationError.path] = validationError.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
        {errors.name && <p className="validation-error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" ref={ageRef} />
        {errors.age && <p className="validation-error">{errors.age}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
        {errors.email && <p className="validation-error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
        {errors.password && (
          <p className="validation-error">{errors.password}</p>
        )}
        <PasswordStrengthIndicator password={passwordRef.current?.value} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
        {errors.confirmPassword && (
          <p className="validation-error">{errors.confirmPassword}</p>
        )}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="validation-error">{errors.gender}</p>}
      </div>
      <div>
        <label htmlFor="terms">Accept Terms & Conditions</label>
        <input type="checkbox" id="terms" ref={termsRef} />
        {errors.terms && <p className="validation-error">{errors.terms}</p>}
      </div>
      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input
          type="file"
          id="picture"
          ref={pictureRef}
          accept="image/png, image/jpeg"
        />
        {errors.picture && <p className="validation-error">{errors.picture}</p>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input id="country" ref={countryRef} list="country-options" />
        <datalist id="country-options">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>
      <button className="btn" onClick={goBack}>
        Go back to home page
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledFormPage;
