"use client"

import { useEffect, useState } from "react";
import MerchantFactory from "@/factories/MerchantFactory";
import MerchantClient from "@/clients/MerchantClient";
import MerchantForm from "./MerchantForm";

export default function MerchantPage(param: any) {
    if (!param) return (
        <div>Loading...</div>
    )

    const id = param.params.id
    const isAddMode = id == 0;

    const [merchant, setMerchant] = useState<Merchant | null>(null)

    const getMerchant = async () => {
        if (isAddMode) {
            const factory = new MerchantFactory()
            setMerchant(factory.buildEmptyMerchant())
        } else {
            const client = new MerchantClient()
            setMerchant(await client.get(id))
        }
    }

    useEffect(() => {
        getMerchant()
    }, [])

    return (
        <MerchantForm merchant={merchant} />
    )
}