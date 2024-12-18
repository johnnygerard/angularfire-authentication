import { ValidationErrorsPipe } from "@/app/pipes/validation-errors.pipe";
import { AuthService } from "@/app/services/auth.service";
import { showErrors } from "@/app/utils/show-errors";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Lock, LucideAngularModule, Mail } from "lucide-angular";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, ValidationErrorsPipe],
  templateUrl: "./login-form.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  readonly I_MAIL = Mail;
  readonly I_LOCK = Lock;

  form = inject(NonNullableFormBuilder).group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  #auth = inject(AuthService);

  async onSubmit(): Promise<void> {
    if (!this.form.valid) return;

    const { email, password } = this.form.getRawValue();
    await this.#auth.logIn(email, password);
  }

  async loginWithGoogle(): Promise<void> {
    throw new Error("Not implemented");
  }

  showErrors(control: AbstractControl, isFormSubmitted: boolean): boolean {
    return showErrors(control, isFormSubmitted);
  }
}
