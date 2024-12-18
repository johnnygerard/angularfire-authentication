import { AppNotification } from "@/app/types/app-notification";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class NotificationService {
  #notification$ = new Subject<AppNotification>();
  #nextId = 0;

  get notification$(): Observable<AppNotification> {
    return this.#notification$.asObservable();
  }

  sendError(message: string): void {
    this.#push({ id: this.#nextId++, message, timeout: 5000, type: "error" });
  }

  sendSuccess(message: string): void {
    this.#push({ id: this.#nextId++, message, timeout: 7000, type: "success" });
  }

  #push(value: AppNotification): void {
    this.#notification$.next(value);
  }
}
