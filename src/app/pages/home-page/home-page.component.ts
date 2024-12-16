import { AuthService } from "@/app/services/auth.service";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  Layout,
  LogIn,
  LucideAngularModule,
  UserPlus,
  Users,
} from "lucide-angular";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: "./home-page.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly I_LAYOUT = Layout;
  readonly I_USERS = Users;
  readonly I_LOG_IN = LogIn;
  readonly I_USER_PLUS = UserPlus;

  #auth = inject(AuthService);
  user = this.#auth.user;
}
