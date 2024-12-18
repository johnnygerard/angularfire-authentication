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
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  #googleIdP = new GoogleAuthProvider();
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
        console.error(e);

        if (
          e instanceof FirebaseError &&
          e.code === AuthErrorCodes.EMAIL_EXISTS
        ) {
          this.#notifier.sendError(USER_MESSAGE.EMAIL_EXISTS);
          return;
        }

        this.#notifier.sendError(USER_MESSAGE.REGISTRATION_FAILED);
      }
    });
  }

  async registerWithGoogle(): Promise<void> {
    await runInInjectionContext(this.#injector, async () => {
      try {
        await signInWithPopup(this.#auth, this.#googleIdP);
        this.#notifier.sendSuccess(USER_MESSAGE.REGISTRATION_SUCCESS);
        await this.#router.navigateByUrl(this.REGISTRATION_REDIRECT);
      } catch (e) {
        console.error(e);
        this.#notifier.sendError(USER_MESSAGE.REGISTRATION_FAILED);
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
        console.error(e);

        if (
          e instanceof FirebaseError &&
          e.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
        ) {
          this.#notifier.sendError(USER_MESSAGE.INVALID_LOGIN_CREDENTIALS);
          return;
        }

        this.#notifier.sendError(USER_MESSAGE.LOGIN_FAILED);
      }
    });
  }

  async logInWithGoogle(): Promise<void> {
    await runInInjectionContext(this.#injector, async () => {
      try {
        await signInWithPopup(this.#auth, this.#googleIdP);
        this.#notifier.sendSuccess(USER_MESSAGE.LOGIN_SUCCESS);
        await this.#router.navigateByUrl(this.LOGIN_REDIRECT);
      } catch (e) {
        console.error(e);
        this.#notifier.sendError(USER_MESSAGE.LOGIN_FAILED);
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
        console.error(e);
        this.#notifier.sendError(USER_MESSAGE.LOGOUT_FAILED);
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
        console.error(e);
        this.#notifier.sendError(USER_MESSAGE.EMAIL_VERIFICATION_FAILED);
      }
    });
  }
}
