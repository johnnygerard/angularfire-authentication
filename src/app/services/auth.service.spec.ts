import { TestBed } from "@angular/core/testing";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import { faker } from "@faker-js/faker";
import { firebaseConfig } from "../firebase.config";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => {
          const auth = getAuth();
          connectAuthEmulator(auth, "http://localhost:9099", {
            disableWarnings: true,
          });
          return auth;
        }),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it("should work", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    expect(service.user()).toBeNull();

    await service.register(email, password);
    const user = service.user();
    if (user === null) throw new Error("User is null");
    expect(user.email).toBe(email.toLowerCase());

    await service.logIn(email, password);
    expect(service.user()).toBeTruthy();

    await service.logOut();
    expect(service.user()).toBeNull();
  });
});
