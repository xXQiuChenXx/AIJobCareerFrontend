import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("training", "routes/training.tsx"),
  route("plan", "routes/plan.tsx"),
  route("aichat", "routes/aiChat.tsx"),
  route("careers", "routes/careers/index.tsx"),
  route("notifications", "routes/notifications/index.tsx"),
  route("notifications/:id", "routes/notifications/notification.tsx"),
  route("company/:id", "routes/company/company-profile.tsx"),
  route("careers/details/:id", "routes/careers/career-details.tsx"),
  route("careers/apply/:id", "routes/applications/application.tsx"),
  route("profile/:id", "routes/user/user-profile.tsx"),
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
  ]),
] satisfies RouteConfig;
