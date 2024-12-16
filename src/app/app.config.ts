import { routes } from "@/app/app.routes";
import { firebaseConfig } from "@/app/firebase.config";
import { environment } from "@/environments/environment";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { provideRouter } from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();

      if (environment.useEmulators)
        connectAuthEmulator(auth, "http://localhost:9099", {
          disableWarnings: true,
        });

      return auth;
    }),
  ],
};
