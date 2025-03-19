import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("weather", "routes/weather.tsx"),
  route("companies", "routes/companies.tsx"),
  route("plan", "routes/plan.tsx"),
  route("profile", "routes/user/profile.tsx"),
  route("aichat", "routes/aiChat.tsx"),
  route("careers", "routes/careers/index.tsx"),
  route("careers/details/:id", "routes/careers/career-details.tsx"),
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
  ]),
] satisfies RouteConfig;
