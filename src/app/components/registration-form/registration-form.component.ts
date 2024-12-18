import { ValidationErrorsPipe } from "@/app/pipes/validation-errors.pipe";
import { AuthService } from "@/app/services/auth.service";
import { showErrors } from "@/app/utils/show-errors";
import { passwordValidator } from "@/app/validators/password-validator";
import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  inject,
} from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Lock, LucideAngularModule, Mail, User } from "lucide-angular";

@Component({
  selector: "app-registration-form",
  imports: [ReactiveFormsModule, LucideAngularModule, ValidationErrorsPipe],
  templateUrl: "./registration-form.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  readonly I_MAIL = Mail;
  readonly I_LOCK = Lock;
  readonly I_USER = User;

  form = inject(NonNullableFormBuilder).group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: [
      "",
      Validators.required,
      passwordValidator(inject(Auth), inject(EnvironmentInjector)),
    ],
  });

  #auth = inject(AuthService);

  async onSubmit(): Promise<void> {
    if (!this.form.valid) return;

    const { email, password } = this.form.getRawValue();
    await this.#auth.register(email, password);
  }

  async loginWithGoogle(): Promise<void> {
    throw new Error("Not implemented");
  }

  showErrors(control: AbstractControl, isFormSubmitted: boolean): boolean {
    return showErrors(control, isFormSubmitted);
  }
}
