import { UserLayout } from "../../layouts/userLayout";
import { SignInForm } from "./SignInForm";

export const SignIn: React.FC = () => {
    return (
        <UserLayout>
            <SignInForm></SignInForm>
        </UserLayout>)
}