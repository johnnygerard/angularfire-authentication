import { AppNotification } from "@/app/types/app-notification";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { AlertCircle, CheckCircle, LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-notification",
  imports: [LucideAngularModule],
  templateUrl: "./notification.component.html",
  host: { class: "block" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  readonly I_CHECK_CIRCLE = CheckCircle;
  readonly I_ALERT_CIRCLE = AlertCircle;

  message = input.required<AppNotification["message"]>();
  type = input.required<AppNotification["type"]>();
}
