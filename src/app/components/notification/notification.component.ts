import { AppNotification } from "@/app/types/app-notification";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-notification",
  imports: [],
  templateUrl: "./notification.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  notification = input.required<AppNotification>();
}
