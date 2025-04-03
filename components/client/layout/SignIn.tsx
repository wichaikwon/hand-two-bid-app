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
  const [isLogin, setIsLogin] = useState(true)
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
    console.log(isLogin ? "Login submitted:" : "Register submitted:", formData)
    // Add your authentication logic here
  }

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col">
        <div className="flex justify-center rounded-md bg-slate-500 p-4">
          <span className="text-4xl text-white">{t(`layout.navbar.sign_in.header`)}</span>
        </div>
        <div className="flex justify-between gap-10 rounded-b-md bg-white p-4">
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-2xl font-bold">{t(`layout.navbar.sign_in.login`)}</span>
            <span className="text-sm text-gray-500">{t(`layout.navbar.sign_in.username`)}</span>
            <input
              className="rounded-full border bg-white p-2"
              placeholder={t(`layout.navbar.sign_in.placeholder_username`)}
            />
            <span className="text-sm text-gray-500">{t(`layout.navbar.sign_in.password`)}</span>
            <input
              className="rounded-full border bg-white p-2"
              placeholder={t(`layout.navbar.sign_in.placeholder_password`)}
            />
            <span>
              <input type="checkbox" name="rememberMe" onChange={handleChange} />{" "}
              {t(`layout.navbar.sign_in.remember_me`)}
            </span>
            <button
              type="submit"
              className="rounded-full bg-slate-500 p-2 text-white hover:bg-slate-600"
            >
              {t(`layout.navbar.sign_in.login`)}
            </button>
            <span className="flex flex-col">
              {t(`layout.navbar.sign_in.forgot_password`)}{" "}
              <Link href="/reset-password" className="text-blue-500 underline">
                {t(`layout.navbar.sign_in.reset_password`)}
              </Link>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-2xl font-bold">{t(`layout.navbar.register.header`)}</span>
            <span className="text-sm text-gray-500">{t(`layout.navbar.register.username`)}</span>
            <input
              className="rounded-full border bg-white p-2"
              placeholder={t(`layout.navbar.register.placeholder_username`)}
            />
            <span className="text-sm text-gray-500">{t(`layout.navbar.register.email`)}</span>
            <input
              className="rounded-full border bg-white p-2"
              placeholder={t(`layout.navbar.register.placeholder_email`)}
            />
            <span className="text-sm text-gray-500">{t(`layout.navbar.register.password`)}</span>
            <input
              className="rounded-full border bg-white p-2"
              placeholder={t(`layout.navbar.register.placeholder_password`)}
            />
            <span className="text-sm text-gray-500">{t(`layout.navbar.register.re-password`)}</span>
            <input
              className="rounded-full border bg-white p-2"
              placeholder={t(`layout.navbar.register.placeholder_re-password`)}
            />

            <button
              type="submit"
              className="rounded-full bg-slate-500 p-2 text-white hover:bg-slate-600"
            >
              {t(`layout.navbar.register.register`)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn
