'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Divider, Button, Card, Space } from "antd";
import Link from "next/link";
import { sendGetFileApi, sendGetFile, sendPostAddNew } from "@/api/index";
import { handleParsePathParams } from "@/utils/methodSet"


const ListCom = () => {
    const [dataSource, setDataSource] = useState([])
    const [fileData, setFileData] = useState([])
    const handleFormattedTableData = (object = {}) => {
        return Object.entries(object).map(([key, element]) => {
            const { zhCN, enUS } = element || {};
            return {
                key,
                stringID: key,
                zhCN: zhCN || undefined,
                enUS: enUS || undefined,
            };
        });
    }
    const handleSendGetFile = useCallback(async (ele) => {
        const response = await sendGetFileApi(ele);
        if (response?.code == 0) {
            setDataSource(handleFormattedTableData(response.data))
        }
    }, [])
    const handleSendFile = useCallback(async () => {
        const response = await sendGetFile()
        if (response?.code == 0) {
            setFileData(response?.data)
        }
    }, [])
    const handleAddNewFile = useCallback(async () => {
        const response = await sendPostAddNew()
        if (response?.code == 0) {
            handleSendFile()
        }
    }, [handleSendFile])
    useEffect(() => {
        const pathPar = handleParsePathParams()?.[1];
        if (pathPar) {
            handleSendGetFile(pathPar);
        } else {
            handleSendGetFile('app');
        }
    }, [handleSendGetFile]);
    useEffect(() => {
        handleSendFile()
    }, [handleSendFile])

    const columns = [
        {
            title: "KeyName",
            width: 200,
            dataIndex: "stringID",
            key: "stringID",
        },
        {
            title: "中文名称",
            width: 200,
            dataIndex: "zhCN",
            key: "zhCN",
        },
        {
            title: "EnglishName",
            width: 200,
            dataIndex: "enUS",
            key: "enUS",
        },
        {
            title: "模块",
            width: 200,
            render: (_, record) => (record?.key ?? '').split(".")[0] || 'defaultValue'
        },
        {
            title: "操作",
            width: 200,
            render: (_, record) => <>
                <Link className='text-[#1677ff]' href={`/list/detail/${record?.key}`} key='info'>详情</Link>
                <Divider key='divider' type='vertical' />
                <Link className='text-[#1677ff]' href={`/list/detail/${record?.key}`} key='edit'>编辑</Link>
            </>
        }
    ]
    return (
        <Card title='国际化列表'>
            <Space direction='vertical' className='w-full'>
                <Button type='primary' onClick={() => { handleAddNewFile() }}>添加</Button>
                <Table columns={columns} dataSource={dataSource} />
            </Space>
        </Card>

    )
}
export default ListCom