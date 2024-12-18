import { NavbarComponent } from "@/app/components/navbar/navbar.component";
import { NotificationListComponent } from "@/app/components/notification-list/notification-list.component";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NavbarComponent, NotificationListComponent],
  templateUrl: "./app.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
