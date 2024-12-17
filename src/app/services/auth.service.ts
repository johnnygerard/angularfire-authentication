import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  Signal,
  signal,
} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
} from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  #user = signal<User | null>(null);
  #auth = inject(Auth);
  #injector = inject(EnvironmentInjector);

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
      } catch (e) {
        throw new Error("User registration failed", { cause: e });
      }
    });
  }

  async logIn(email: string, password: string): Promise<void> {
    await runInInjectionContext(this.#injector, async () => {
      try {
        await signInWithEmailAndPassword(this.#auth, email, password);
      } catch (e) {
        throw new Error("User login failed", { cause: e });
      }
    });
  }

  async logOut(): Promise<void> {
    await runInInjectionContext(this.#injector, async () => {
      try {
        await this.#auth.signOut();
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
