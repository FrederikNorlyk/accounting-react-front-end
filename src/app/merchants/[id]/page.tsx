"use client"

import { useEffect, useState } from "react";
import MerchantFactory from "@/factories/MerchantFactory";
import MerchantClient from "@/clients/MerchantClient";
import MerchantForm from "./MerchantForm";
import { useRouter } from "next/navigation";

export default function MerchantPage(param: any) {
    if (!param) return (
        <div>Loading...</div>
    )

    const router = useRouter()
    const id = param.params.id
    const isAddMode = id == 0;

    const [merchant, setMerchant] = useState<Merchant | null>(null)

    const getMerchant = async () => {
        if (isAddMode) {
            const factory = new MerchantFactory()
            setMerchant(factory.buildEmptyMerchant())
        } else {
            const client = new MerchantClient()
            const result = await client.get(id)
            if (result.getRecord()) {
                setMerchant(result.getRecord())
            }
        }
    }

    useEffect(() => {
        getMerchant()
    }, [])

    const onCancel = () => {
        router.push('/merchants')
    }

    const onSubmitSuccess = () => {
        router.push('/merchants')
    }

    return (
        <MerchantForm merchant={merchant} onSubmitSuccess={onSubmitSuccess} onCancel={onCancel} />
    )
}