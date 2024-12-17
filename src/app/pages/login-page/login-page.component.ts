import { LoginFormComponent } from "@/app/components/login-form/login-form.component";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login-page",
  imports: [RouterLink, LoginFormComponent],
  templateUrl: "./login-page.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
