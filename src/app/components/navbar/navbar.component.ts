import { AuthService } from "@/app/services/auth.service";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { House, LogOut, LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-navbar",
  imports: [LucideAngularModule, RouterLink],
  templateUrl: "./navbar.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly I_HOUSE = House;
  readonly I_LOG_OUT = LogOut;
  #auth = inject(AuthService);
  user = this.#auth.user;

  async logOut(): Promise<void> {
    await this.#auth.logOut();
  }
}
