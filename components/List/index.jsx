'use client'
import React, { useState } from 'react';
import Link from "next/link";

const ListCom = () => {
    const [id, setId] = useState('00001')
    return (
        <Link href={`/list/detail/${id}`}>To Detail</Link>
    )
}
export default ListCom