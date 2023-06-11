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
  const numberFormatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

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
              Total amount: {numberFormatter.format(merchant.totalAmount)}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">&nbsp;</p>
          {merchant.numberOfExpenses == 1 ?
            <p className="mt-1 text-xs leading-5 text-gray-500">{merchant.numberOfExpenses} expense</p>
            :
            <p className="mt-1 text-xs leading-5 text-gray-500">{merchant.numberOfExpenses} expenses</p>
          }
        </div>
      </Link>
    </li>
  );
}
