import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "angularfire-authentication",
        appId: "1:922614773049:web:36ccaf0879fe4f163d24e8",
        storageBucket: "angularfire-authentication.firebasestorage.app",
        apiKey: "AIzaSyBJd0EwwuZzciybBqvcqn6TsWGbTCVauuc",
        authDomain: "angularfire-authentication.firebaseapp.com",
        messagingSenderId: "922614773049",
      }),
    ),
    provideAuth(() => getAuth()),
  ],
};
