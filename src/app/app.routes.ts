import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: async () =>
      (await import("@/app/pages/home-page/home-page.component"))
        .HomePageComponent,
    title: "Auth Demo",
  },
  {
    path: "register",
    loadComponent: async () =>
      (
        await import(
          "@/app/pages/registration-page/registration-page.component"
        )
      ).RegistrationPageComponent,
    title: "Register",
  },
  {
    path: "sign-in",
    loadComponent: async () =>
      (await import("@/app/pages/login-page/login-page.component"))
        .LoginPageComponent,
    title: "Sign In",
  },
  {
    path: "**",
    loadComponent: async () =>
      (await import("@/app/pages/not-found-page/not-found-page.component"))
        .NotFoundPageComponent,
    title: "Not Found",
  },
];
