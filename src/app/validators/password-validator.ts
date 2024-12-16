import { Injector, runInInjectionContext } from "@angular/core";
import { Auth, validatePassword } from "@angular/fire/auth";
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { environment } from "../../environments/environment";

export const passwordValidator = (
  auth: Auth,
  injector: Injector,
): AsyncValidatorFn => {
  return async (control: AbstractControl): Promise<ValidationErrors | null> => {
    const password = control.value;
    if (typeof password !== "string") return null;

    // Mocking is required because of the following error:
    // FirebaseError: auth/identitytoolkit.getpasswordpolicy-is-not-implemented-in-the-auth-emulator
    if (environment.useEmulators) {
      const meetsMinPasswordLength = password.length >= 8;
      return meetsMinPasswordLength
        ? null
        : { password: { meetsMinPasswordLength } };
    }

    const status = await runInInjectionContext(
      injector,
      async () => await validatePassword(auth, password),
    );

    return status.isValid ? null : { password: status };
  };
};
