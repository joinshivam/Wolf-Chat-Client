import Link from "next/link"
import AuthForm from "../components/AuthForm";
const Login = (prop) => {
    return (
        <div className="auth-login min-h-screen p-8 flex items-center justify-center flex-column bg-gray-100">
            <AuthForm  formType="login"/>
        </div>
    )
}
export default Login;