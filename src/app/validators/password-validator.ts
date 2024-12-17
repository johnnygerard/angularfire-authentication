import { environment } from "@/environments/environment";
import { Injector, runInInjectionContext } from "@angular/core";
import {
  Auth,
  PasswordValidationStatus,
  validatePassword,
} from "@angular/fire/auth";
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";

const mockStatus = (password: string): ValidationErrors | null => {
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 128;
  const meetsMinPasswordLength = password.length >= MIN_LENGTH;
  const meetsMaxPasswordLength = password.length <= MAX_LENGTH;

  const status: PasswordValidationStatus = {
    meetsMinPasswordLength,
    meetsMaxPasswordLength,
    isValid: meetsMinPasswordLength && meetsMaxPasswordLength,
    passwordPolicy: {
      customStrengthOptions: {
        minPasswordLength: MIN_LENGTH,
        maxPasswordLength: MAX_LENGTH,
      },
      allowedNonAlphanumericCharacters: "",
      enforcementState: "ENFORCE",
      forceUpgradeOnSignin: false,
    },
  };

  return status.isValid ? null : { weakPassword: status };
};

export const passwordValidator = (
  auth: Auth,
  injector: Injector,
): AsyncValidatorFn => {
  return async (control: AbstractControl): Promise<ValidationErrors | null> => {
    const password = control.value;
    if (typeof password !== "string") return null;

    // Mocking is required because of the following error:
    // FirebaseError: auth/identitytoolkit.getpasswordpolicy-is-not-implemented-in-the-auth-emulator
    if (environment.useEmulators) return mockStatus(password);

    const status = await runInInjectionContext(
      injector,
      async () => await validatePassword(auth, password),
    );

    return status.isValid ? null : { weakPassword: status };
  };
};
