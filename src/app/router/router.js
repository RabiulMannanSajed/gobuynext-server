import { Router } from "express";
import { UserRoute } from "../modules/users/users.route.js";
import { ProductRoute } from "../modules/product/product.route.js";
import { AuthRoute } from "../modules/auth/auth.route.js";
import { SellInfoRoute } from "../modules/sellInfo/sellInfo.route.js";
import { DashboardAnalyticsRoute } from "../modules/dashboardAnalytices/dashboardAnalytices.route.js";
import { ReviewRoutes } from "../modules/review/review.route.js";
import { brandCategoryRoute } from "../modules/Category/brandCategory.route.js";

const router = Router();

const moduleRouters = [
  {
    path: "/user",
    route: UserRoute,
  },

  {
    path: "/product",
    route: ProductRoute,
  },

  {
    path: "/auth",
    route: AuthRoute,
  },

  {
    path: "/category",
    route: brandCategoryRoute,
  },

  {
    path: "/sell",
    route: SellInfoRoute,
  },

  {
    path: "/review",
    route: ReviewRoutes,
  },

  {
    path: "/dashboardAnalytics",
    route: DashboardAnalyticsRoute,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
