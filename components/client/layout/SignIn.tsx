import { useState } from "react"
import Link from "next/link"
import { t } from "i18next"

type FormData = {
  username: string
  email: string
  password: string
  rememberMe: boolean
  accountType: "customer" | "vendor"
}

type SignInProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const SignIn: React.FC<SignInProps> = ({ isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
    accountType: "customer",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(activeTab === "login" ? "Login submitted:" : "Register submitted:", formData)
    // Add your authentication logic here
  }

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`fixed inset-0 z-50 flex items-center justify-center  bg-black/50 transition-opacity duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className=" w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex flex-col rounded-md bg-slate-50 shadow-md">
          <div className="flex justify-center rounded-t-md bg-slate-500 p-4">
            <span className="text-4xl text-white">{t(`layout.navbar.sign_in.header`)}</span>
          </div>
          
          <div className="flex border-b border-slate-300">
            <button
              className={`flex-1 py-3 font-medium ${activeTab === "login" ? "bg-white text-blue-600" : "bg-slate-100 text-slate-600"}`}
              onClick={() => setActiveTab("login")}
            >
              {t(`layout.navbar.sign_in.login`)}
            </button>
            <button
              className={`flex-1 py-3 font-medium ${activeTab === "register" ? "bg-white text-blue-600" : "bg-slate-100 text-slate-600"}`}
              onClick={() => setActiveTab("register")}
            >
              {t(`layout.navbar.register.header`)}
            </button>
          </div>

          <div className="p-6">
            {activeTab === "login" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label>{t(`layout.navbar.sign_in.username`)}</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="rounded-md p-2 bg-white shadow-sm border border-slate-200"
                    placeholder={t(`layout.navbar.sign_in.placeholder_username`)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>{t(`layout.navbar.sign_in.password`)}</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-md p-2 bg-white shadow-sm border border-slate-200"
                    placeholder={t(`layout.navbar.sign_in.placeholder_password`)}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberMe">{t(`layout.navbar.sign_in.remember_me`)}</label>
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors"
                > 
                  {t(`layout.navbar.sign_in.login`)}
                </button>

                <Link 
                  href="/forgot-password" 
                  className="text-center text-blue-500 hover:underline text-sm"
                >
                  {t(`layout.navbar.sign_in.forgot_password`)}
                </Link>
              </form>
            )}

            {activeTab === "register" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label>{t(`layout.navbar.register.username`)}</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="rounded-md p-2 bg-white shadow-sm border border-slate-200"
                    placeholder={t(`layout.navbar.register.placeholder_username`)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>{t(`layout.navbar.register.email`)}</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-md p-2 bg-white shadow-sm border border-slate-200"
                    placeholder={t(`layout.navbar.register.placeholder_email`)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>{t(`layout.navbar.register.password`)}</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-md p-2 bg-white shadow-sm border border-slate-200"
                    placeholder={t(`layout.navbar.register.placeholder_password`)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>{t(`layout.navbar.register.re-password`)}</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    className="rounded-md p-2 bg-white shadow-sm border border-slate-200"
                    placeholder={t(`layout.navbar.register.placeholder_re-password`)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="font-medium">Account Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="accountType"
                        value="customer"
                        checked={formData.accountType === "customer"}
                        onChange={handleChange}
                      />
                      Customer
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="accountType"
                        value="vendor"
                        checked={formData.accountType === "vendor"}
                        onChange={handleChange}
                      />
                      Vendor
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors mt-2"
                >
                  {t(`layout.navbar.register.register`)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn