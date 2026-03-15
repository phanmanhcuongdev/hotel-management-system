export default function LoginPage() {


    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            {/* Top Navigation Bar */}
            <header
                className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10">
                <div className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                    <div className="size-8 bg-primary-600 text-white flex items-center justify-center rounded-lg">
                        <span className="material-symbols-outlined">apartment</span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-tight">Hotel Management</h2>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-[20px]">help</span>
                        <span>Support</span>
                    </button>
                </div>
            </header>
            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[440px]">
                    {/* Login Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {/* Card Header/Brand Image */}
                        <div className="h-32 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary-600/10 flex items-center justify-center">
                                <span  className="material-symbols-outlined text-primary-600 opacity-20"
                                       style={{ fontSize: "60px", lineHeight: 1 }} >hotel</span>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-10 pt-4">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Welcome back</h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">Sign in to manage your
                                    property</p>
                            </div>
                            {/* Error State Message (Hidden by default, shown for UI demonstration) */}
                            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
                                <span
                                    className="material-symbols-outlined text-red-600 dark:text-red-400 text-[20px]">error</span>
                                <p className="text-sm text-red-700 dark:text-red-300 font-medium">Invalid email or
                                    password</p>
                            </div>
                            <form className="space-y-5">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email or Username</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
                                        <input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" placeholder="admin@hotel.com" type="email"/>
                                    </div>
                                </div>
                                {/* Password Input */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                                        <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot password?</a>
                                    </div>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                                        <input className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" placeholder="••••••••" type="password"/>
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" type="button">
                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Remember Me */}
                                <div className="flex items-center gap-2">
                                    <input className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary transition-all" id="remember" type="checkbox"/>
                                    <label className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer" htmlFor="remember">Remember this device</label>
                                </div>
                                {/* Login Button (Loading State Shown) */}
                                <button
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
                                    type="submit"
                                >
                                    <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                                    <span>Signing in...</span>
                                </button>
                                {/*
                                <!-- Alternative Button (Normal State) -->
<!--
                        <button type="submit" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm">
                            <span>Login to Dashboard</span>
                        </button>
                        -->
                                */}
                            </form>
                        </div>
                    </div>
                    {/*  Footer Links  */}
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                            © 2024 Hotel Management System. All rights reserved.
                        </p>
                        <div
                            className="flex justify-center gap-6 text-xs font-medium text-slate-400 dark:text-slate-600">
                            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                            <a className="hover:text-primary transition-colors" href="#">Contact Support</a>
                        </div>
                    </div>
                </div>
            </main>
            {/* Background Pattern Decoration */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-40 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}