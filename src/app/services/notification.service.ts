import { Notification } from "@/app/types/notification";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
class NotificationService {
  #notification$ = new Subject<Notification>();
  #nextId = 0;

  get notification$(): Observable<Notification> {
    return this.#notification$.asObservable();
  }

  sendError(message: string): void {
    this.#push({ id: this.#nextId++, message, timeout: 5000, type: "error" });
  }

  sendSuccess(message: string): void {
    this.#push({ id: this.#nextId++, message, timeout: 7000, type: "success" });
  }

  #push(value: Notification): void {
    this.#notification$.next(value);
  }
}
