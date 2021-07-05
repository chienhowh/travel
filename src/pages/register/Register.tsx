import { UserLayout } from "../../layouts/userLayout";
import { RegisterForm } from "./RegisterForm";


export const Register: React.FC = () => {
    return (<>
        <UserLayout>
            <RegisterForm />
        </UserLayout>
    </>)
}