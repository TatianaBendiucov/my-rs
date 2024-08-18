import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addUser } from "../store/usersSlice";
import { UserFormValues } from "../types/user";
import { useValidationSchema } from "../utils/validationSchema";
import { useYupValidationResolver } from "../utils/yupResolver";
import { useNavigate } from "react-router-dom";
import { PasswordStrengthIndicator } from "../components/PasswordStrength";

const ControlledFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = useValidationSchema();
  const countries = useSelector((state: RootState) => state.countries.list);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<UserFormValues>({
    resolver: useYupValidationResolver(validationSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      terms: false,
      country: "",
    },
  });

  const goBack = () => {
    navigate("/");
  };

  const onSubmit = (data: UserFormValues) => {
    const picture = data.picture[0];
    const pictureFile = data.picture?.[0];
    if (pictureFile) {
      console.log("File:", pictureFile);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        addUser({
          ...data,
          picture: reader.result as string,
        }),
      );
    };

    if (picture) {
      reader.readAsDataURL(picture);
    }
    navigate("/", { state: { newUser: true } });
  };

  const password = watch("password");
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input type="text" id="name" {...field}/>}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="form-control">
        <label htmlFor="age">Age</label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => <input type="number" id="age" {...field} value={field.value || ''}/>}
        />
        {errors.age && <p className="error">{errors.age.message}</p>}
      </div>

      <div className="form-control">
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input type="email" id="email" {...field} />}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div className="form-control">
        <label htmlFor="password">Password <PasswordStrengthIndicator password={password} /></label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input type="password" id="password" {...field}/>
          )}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}        
      </div>

      <div className="form-control">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input type="password" id="confirmPassword" {...field}/>
          )}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="gender">Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <select id="gender" {...field}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
        />
        {errors.gender && <p className="error">{errors.gender.message}</p>}
      </div>

      <div className="form-control">
        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <div>
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                id="terms"
              />
              <label htmlFor="terms">Accept Terms & Conditions</label>
            </div>
          )}
        />
        {errors.terms && <p className="error">{errors.terms.message}</p>}
      </div>

      <div className="form-control">
        <label htmlFor="picture">Upload Picture</label>
        <Controller
          name="picture"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              id="picture"
              onChange={(e) => field.onChange(e.target.files)}
              accept="image/png, image/jpeg"
            />
          )}
        />
        {errors.picture && <p className="error">{errors.picture.message}</p>}
      </div>

      <div className="form-control">
        <label htmlFor="country">Country</label>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <input
                type="text"
                id="country"
                list="country-options"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
              <datalist id="country-options">
                {countries.map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>
            </>
          )}
        />
        {errors.country && <p className="error">{errors.country.message}</p>}
      </div>

      <button className="btn" onClick={goBack}>
        Go back to home page
      </button>
      <button
        className="btn"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default ControlledFormPage;
