import { RegistrationFormComponent } from "@/app/components/registration-form/registration-form.component";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-registration-page",
  imports: [RegistrationFormComponent, RouterLink],
  templateUrl: "./registration-page.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {}
