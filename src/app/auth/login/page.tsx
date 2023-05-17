"use client";

import { signIn } from "next-auth/react";
import { useRef } from "react";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {

    const url = "http://localhost:8000/token/";

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({username: userName.current, password: pass.current}),
      headers: { "Content-Type": "application/json" }
    })
    const json = await res.json()

    if (!res.ok || !json) {
      return null
    }

    localStorage.setItem("token", json.token)

    await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className={"flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"}>
      {searchParams?.message && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{searchParams?.message}</p>}
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <input type="text" onChange={(e: any) => (userName.current = e.target.value)} />
        <input type="password" onChange={(e: any) => (pass.current = e.target.value)} />
        <button onClick={onSubmit}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;