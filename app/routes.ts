import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("weather", "routes/weather.tsx"),
  route("companies", "routes/companies.tsx"),
  route("plan", "routes/plan.tsx"),
  route("aichat", "routes/aiChat.tsx"),
  route("careers", "routes/careers.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
] satisfies RouteConfig;
