"use client";

import { UserClient } from "@/clients/UserClient";
import Spinner from "@/components/Spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function LoginPage() {
  const username = useRef("");
  const password = useRef("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  
  const onSubmit = async (e: any) => {
    e.preventDefault()
    
    const buttonName = e.nativeEvent.submitter.name

    setLoading(true)
    setErrorMessage(null)

    if (buttonName === 'register') {
      const client = new UserClient()
      
      var response
      try {
        response = await client.register(username.current, password.current)
      } catch (error) {
        setErrorMessage("Could not connect to API")
        setLoading(false)
        return
      }

      const json = await response.json();

      if (response.status != 201) {
        if (json.username?.length == 1) {
          setErrorMessage(json.username[0])
        } else {
          setErrorMessage("Could not create user")
        }

        setLoading(false)
        return
      }
    }

    login()
  };

  const login = async () => {
    if (!isLoading) {
      setLoading(true)
    }

    const response = await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });

    setLoading(false)

    if (response?.status != 200) {
      if (response?.error == 'CredentialsSignin') {
        setErrorMessage('Invalid user or password');
      } else if (response?.error == 'fetch failed') {
        setErrorMessage('Could not connect to API');
      } else {
        setErrorMessage(response?.error as string);
      }
      return
    }

    router.push('/expenses')
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                User
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={(e: any) => (username.current = e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e: any) => (password.current = e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {errorMessage && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{errorMessage}</p>}
            {isLoading && <Spinner />}

            <div>
              <button
                type="submit"
                name="login"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div>
              <button
                type="submit"
                name="register"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 disabled:bg-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Create new user
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};