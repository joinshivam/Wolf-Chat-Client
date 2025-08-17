'use client';
import Link from "next/link";
const ReturnType = (type) => {
    if (type === "login") {
        return <>
            <form className="max-w-md w-full bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={(e)=>{e.preventDefault();}}>
                <div><h1 className="text-center text-2xl">Signin Here</h1></div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>
                <Link href={'auth/fresh?continue=' + encodeURIComponent("http://localhost:3000/")}>
                    <button className="flex items-center justify-center w-full bg-white border-1 text-green-600 border-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-700 hover:text-white transition-colors" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M5.121 17.804A8 8 0 1112 20a8 8 0 01-6.879-2.196z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M15 11h4m-2-2v4" />
                        </svg>
                        Sign Up
                    </button>
                </Link >

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border-1 border-red-400 text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                        className="w-5 h-5"
                        fill="currentColor"
                    >
                        <path d="M488 261.8c0-17.5-1.5-34.3-4.3-50.6H249v95.7h134.1c-5.8 31.4-23 57.9-49.2 75.8l79.3 61.7c46.3-42.6 74.8-105.4 74.8-182.6z" />
                        <path d="M249 492c66.5 0 122.3-22 163-59.6l-79.3-61.7c-22.2 14.9-50.5 23.7-83.7 23.7-64.3 0-118.8-43.5-138.3-102.1H29.2v64.2C69.4 444.6 153.4 492 249 492z" />
                        <path d="M110.7 292.3c-5.1-14.9-8-30.8-8-47.3s2.9-32.4 8-47.3V133.5H29.2C10.5 174.2 0 219.2 0 265s10.5 90.8 29.2 131.5l81.5-64.2z" />
                        <path d="M249 97.9c35.9 0 68.1 12.4 93.3 36.4l69.9-69.9C371.3 23.5 315.5 0 249 0 153.4 0 69.4 47.4 29.2 133.5l81.5 64.2c19.5-58.6 74-102.1 138.3-102.1z" />
                    </svg>
                    Continue with Google
                </button>

                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border-1 border-blue-400 text-blue-400 font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-5 h-5"
                        fill="currentColor"
                    >
                        <path d="M279.14 288l14.22-92.66h-88.91V129.32c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S293.36 0 268.24 0c-73.15 0-121.17 44.38-121.17 124.72V195.3H86.41V288h60.66v224h92.66V288z" />
                    </svg>
                    Continue with Facebook
                </button>
            </form >
        </>
    }
    if (type === "signup") {
        return (
            <form className="max-w-md w-full bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={(e)=>{e.preventDefault();}}>
                <div><h1 className="text-center text-2xl">Signup Here</h1></div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Register
                </button>
                <Link href="/auth">
                    <button className="flex items-center justify-center w-full bg-white border-1 text-green-600 border-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-700 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M5.121 17.804A8 8 0 1112 20a8 8 0 01-6.879-2.196z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M15 11h4m-2-2v4" />
                        </svg>
                        Signin
                    </button>
                </Link>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border-1 border-red-400 text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                        className="w-5 h-5"
                        fill="currentColor"
                    >
                        <path d="M488 261.8c0-17.5-1.5-34.3-4.3-50.6H249v95.7h134.1c-5.8 31.4-23 57.9-49.2 75.8l79.3 61.7c46.3-42.6 74.8-105.4 74.8-182.6z" />
                        <path d="M249 492c66.5 0 122.3-22 163-59.6l-79.3-61.7c-22.2 14.9-50.5 23.7-83.7 23.7-64.3 0-118.8-43.5-138.3-102.1H29.2v64.2C69.4 444.6 153.4 492 249 492z" />
                        <path d="M110.7 292.3c-5.1-14.9-8-30.8-8-47.3s2.9-32.4 8-47.3V133.5H29.2C10.5 174.2 0 219.2 0 265s10.5 90.8 29.2 131.5l81.5-64.2z" />
                        <path d="M249 97.9c35.9 0 68.1 12.4 93.3 36.4l69.9-69.9C371.3 23.5 315.5 0 249 0 153.4 0 69.4 47.4 29.2 133.5l81.5 64.2c19.5-58.6 74-102.1 138.3-102.1z" />
                    </svg>
                    Continue with Google
                </button>

                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border-1 border-blue-400 text-blue-400 font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-5 h-5"
                        fill="currentColor"
                    >
                        <path d="M279.14 288l14.22-92.66h-88.91V129.32c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S293.36 0 268.24 0c-73.15 0-121.17 44.38-121.17 124.72V195.3H86.41V288h60.66v224h92.66V288z" />
                    </svg>
                    Continue with Facebook
                </button>
            </form>
        )
    }
    if (type === "verify") {
        return (
            <form className="max-w-md w-full bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={(e)=>{e.preventDefault();}}>
                <div><h1 className="text-center text-2xl">OTP Sent : Verify</h1></div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Otp</label>
                    <input
                        type="Enter Otp"
                        placeholder="Enter Otp here" maxLength={6} minLength={1}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Register
                </button>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-gray-500 text-sm"></span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <Link href="/auth">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-white border-1 border-blue-400 text-blue-400 font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 hover:text-white transition-colors"
                    >
                        Back
                    </button>
                </Link>
                <button
                    type="button"
                    className="mt-1 w-full flex items-center justify-center gap-2 bg-white border-1 border-red-400 text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                    Resend Otp
                </button>
            </form>
        )
    }
}
const AuthForm = ({ formType }) => {
    const _url = '/';
    return ReturnType(formType ? formType : "");
}

export default AuthForm;