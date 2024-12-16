import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Lock, LucideAngularModule, Mail, User } from "lucide-angular";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-registration-form",
  imports: [ReactiveFormsModule, LucideAngularModule],
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
    password: ["", Validators.required],
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
}
