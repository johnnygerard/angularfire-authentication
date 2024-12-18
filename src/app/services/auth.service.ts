import { NotificationService } from "@/app/services/notification.service";
import { USER_MESSAGE } from "@/app/types/user-message";
import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  Signal,
  signal,
} from "@angular/core";
import { FirebaseError } from "@angular/fire/app";
import {
  Auth,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
} from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly LOGIN_REDIRECT = "/";
  readonly LOGOUT_REDIRECT = "/";
  readonly REGISTRATION_REDIRECT = "/";

  #user = signal<User | null>(null);
  #auth = inject(Auth);
  #injector = inject(EnvironmentInjector);
  #notifier = inject(NotificationService);
  #router = inject(Router);

  constructor() {
    this.#auth.onAuthStateChanged((user) => {
      this.#user.set(user);
    });
  }

  get user(): Signal<User | null> {
    return this.#user.asReadonly();
  }

  async register(email: string, password: string): Promise<void> {
    await runInInjectionContext(this.#injector, async () => {
      try {
        await createUserWithEmailAndPassword(this.#auth, email, password);
        this.#notifier.sendSuccess(USER_MESSAGE.REGISTRATION_SUCCESS);
        await this.#router.navigateByUrl(this.REGISTRATION_REDIRECT);
      } catch (e) {
        if (
          e instanceof FirebaseError &&
          e.code === AuthErrorCodes.EMAIL_EXISTS
        ) {
          this.#notifier.sendError(USER_MESSAGE.EMAIL_EXISTS);
          return;
        }

        throw new Error("User registration failed", { cause: e });
      }
    });
  }

  async logIn(email: string, password: string): Promise<void> {
    await runInInjectionContext(this.#injector, async () => {
      try {
        await signInWithEmailAndPassword(this.#auth, email, password);
        this.#notifier.sendSuccess(USER_MESSAGE.LOGIN_SUCCESS);
        await this.#router.navigateByUrl(this.LOGIN_REDIRECT);
      } catch (e) {
        throw new Error("User login failed", { cause: e });
      }
    });
  }

  async logOut(): Promise<void> {
    await runInInjectionContext(this.#injector, async () => {
      try {
        await this.#auth.signOut();
        this.#notifier.sendSuccess(USER_MESSAGE.LOGOUT_SUCCESS);
        await this.#router.navigateByUrl(this.LOGOUT_REDIRECT);
      } catch (e) {
        throw new Error("User logout failed", { cause: e });
      }
    });
  }

  async sendVerificationEmail(): Promise<void> {
    await runInInjectionContext(this.#injector, async () => {
      const user = this.user();
      if (user === null) throw new Error("User is not logged in");

      try {
        await sendEmailVerification(user);
      } catch (e) {
        throw new Error("Email verification failed", { cause: e });
      }
    });
  }
}
