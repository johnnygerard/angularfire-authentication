import { NotificationComponent } from "@/app/components/notification/notification.component";
import { NotificationService } from "@/app/services/notification.service";
import { AppNotification } from "@/app/types/app-notification";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-notification-list",
  imports: [NotificationComponent],
  templateUrl: "./notification-list.component.html",
  host: { class: "fixed top-4 right-1/2 translate-x-1/2 z-50" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationListComponent {
  notificationList = signal<AppNotification[]>([]);
  visibleList = computed(() => this.notificationList().slice(0, 3).reverse());
  #notifier = inject(NotificationService);

  constructor() {
    this.#notifier.notification$
      .pipe(takeUntilDestroyed())
      .subscribe((notification) => {
        this.notificationList.update((list) => [...list, notification]);
        setTimeout(() => {
          this.notificationList.update((list) =>
            list.filter((n) => n !== notification),
          );
        }, notification.timeout);
      });
  }
}
