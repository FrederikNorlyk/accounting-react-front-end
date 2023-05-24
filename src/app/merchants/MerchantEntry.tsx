import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface MerchantEntryProp {
  merchant: Merchant;
}

export default function MerchantEntry(props: MerchantEntryProp) {
  const merchant = props.merchant;
  const pathname = usePathname();
  const href = pathname + "/" + merchant.id;

  return (
    <li key={merchant.id}>
      <Link
        href={href}
        className="round flex cursor-pointer justify-between px-3 py-3 hover:rounded hover:bg-slate-200"
      >
        <div className="flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {merchant.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Total amount: 00.00
            </p>
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">&nbsp;</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">From 01/01/23 to 31/01/23</p>
        </div>
      </Link>
    </li>
  );
}
