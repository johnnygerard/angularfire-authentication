import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  imports: [RouterLink],
  templateUrl: "./navbar.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  #auth = inject(AuthService);
  user = this.#auth.user;

  async logOut(): Promise<void> {
    await this.#auth.logOut();
  }
}
