'use client'
import React from 'react';
import { Card, Button, Space } from "antd";

export default function ListTemplate({ children }) {
    return (
        <>
            <Card title='国际化列表'>
                <Space direction='vertical' className='w-full'>
                    <Button type='primary'>添加</Button>
                    {children}
                </Space>
            </Card>

        </>
    );
}
