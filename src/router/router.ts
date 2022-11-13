import { createWebHistory, createRouter } from "vue-router";
import LogIn from '../components/LogIn.vue'
import SignUp from '../components/SignUp.vue'
import Lists from '../components/Lists.vue'

const routes = [
  {
    path: "/",
    name: "Login",
    component: LogIn,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/lists",
    name: "Lists",
    component: Lists,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // Redirect if fullPath begins with a hash (ignore hashes later in path)
  if (to.fullPath.substr(0,2) === "/#") {
      const path = to.fullPath.substr(2);
      next(path);
      return;
  }
  next();
});
export default router;