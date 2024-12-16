import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ArrowLeft, Home, LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-not-found-page",
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: "./not-found-page.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  readonly I_HOME = Home;
  readonly I_ARROW_LEFT = ArrowLeft;

  goBack(): void {
    window.history.back();
  }
}
