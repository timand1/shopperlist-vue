import { createWebHashHistory, createRouter } from "vue-router";
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
    path: "/#/signUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/#/lists",
    name: "Lists",
    component: Lists,
  },
  { path: '/*', component: LogIn }
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;