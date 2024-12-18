import { NotificationService } from "@/app/services/notification.service";
import { USER_MESSAGE } from "@/app/types/user-message";
import { ErrorHandler, inject } from "@angular/core";

/**
 * Handle uncaught client-side errors.
 */
export class GlobalErrorHandler implements ErrorHandler {
  #notifier = inject(NotificationService);

  handleError(e: unknown): void {
    console.error(e);
    this.#notifier.sendError(USER_MESSAGE.UNKNOWN_ERROR);
  }
}
