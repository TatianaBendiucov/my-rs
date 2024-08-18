import { useCallback } from "react";
import * as Yup from "yup";

interface ValidationResolverResult<T> {
  values: T;
  errors: Record<string, { type: string; message: string }>;
}

export const useYupValidationResolver = <T>(validationSchema: Yup.Schema<T>) =>
  useCallback(
    async (data: Partial<T>): Promise<ValidationResolverResult<T>> => {
      try {
        const values = (await validationSchema.validate(data, {
          abortEarly: false,
        })) as T;

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        if (errors instanceof Yup.ValidationError) {
          return {
            values: {} as T,
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path || ""]: {
                  type: currentError.type ?? "validation",
                  message: currentError.message,
                },
              }),
              {},
            ),
          };
        }

        return {
          values: {} as T,
          errors: {},
        };
      }
    },
    [validationSchema],
  );
