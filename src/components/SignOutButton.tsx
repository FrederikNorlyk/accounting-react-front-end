import { Disclosure, Menu } from "@headlessui/react";
import { signOut } from 'next-auth/react'

interface SignOutButtonParams {
    isMenuItem: boolean
}

export default function SignOutButton(params: SignOutButtonParams) {
    console.log(params);

    if (params.isMenuItem) {
        return (
            <Menu.Item key="signOut">
                <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => signOut()}>
                    Sign out
                </button>
            </Menu.Item>
        )
    }

    return (
        <Disclosure.Button key="signOut" onClick={() => signOut()} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
            Sign out
        </Disclosure.Button>
    );
}