import { LoginComponent } from "./login.component";
import { ProfileComponent } from "./profile.component";
import { UserResolver } from "./user-resolver.service";

export const userRoutes = [
    { path: 'profile', component: ProfileComponent, resolve: { UserResolver } },
    { path: 'login', component: LoginComponent }
]