import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { RegistrationFormComponent } from "../../components/registration-form/registration-form.component";

@Component({
  selector: "app-registration-page",
  imports: [RegistrationFormComponent, RouterLink],
  templateUrl: "./registration-page.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {}
