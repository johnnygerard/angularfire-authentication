import { Pipe, PipeTransform } from "@angular/core";
import { PasswordValidationStatus } from "@angular/fire/auth";
import { ValidationErrors } from "@angular/forms";

const transformValidationStatus = (
  status: PasswordValidationStatus,
): string => {
  const { minPasswordLength, maxPasswordLength } =
    status.passwordPolicy.customStrengthOptions;

  // Note that `status.x === false` is not equivalent to `!status.x` in this context.
  if (status.containsUppercaseLetter === false)
    return "Password must contain at least one uppercase letter";

  if (status.containsLowercaseLetter === false)
    return "Password must contain at least one lowercase letter";

  if (status.containsNumericCharacter === false)
    return "Password must contain at least one number";

  if (status.containsNonAlphanumericCharacter === false)
    return "Password must contain at least one special character";

  if (status.meetsMinPasswordLength === false)
    return `Password must be at least ${minPasswordLength} characters long`;

  if (status.meetsMaxPasswordLength === false)
    return `Password must be at most ${maxPasswordLength} characters long`;

  throw new Error("Validation error not found");
};

@Pipe({
  name: "validationErrors",
})
export class ValidationErrorsPipe implements PipeTransform {
  transform(errors: ValidationErrors): string {
    if (errors["required"]) return "This field is required";
    if (errors["email"]) return "Invalid email address";
    if (errors["weakPassword"])
      return transformValidationStatus(errors["weakPassword"]);

    throw new Error("Unexpected error");
  }
}
