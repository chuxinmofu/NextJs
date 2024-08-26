'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Divider, Button, Card, Space, Modal, Form, Input, Typography } from "antd";
import Link from "next/link";
import { sendGetFileApi, sendGetFile, sendPostAddNew } from "@/api/index";
import { handleParsePathParams } from "@/utils/methodSet"

const { Title, Text } = Typography;
const ListCom = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [fileData, setFileData] = useState([])
    const [edit, setEdit] = useState(false)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
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
            setFileData(handleFormattedTableData(response?.data))
        }
    }, [])
    const handleOk = useCallback(() => {
        form.validateFields().then(async values => {
            const response = await sendPostAddNew({
                ...values,
                menuKey: handleParsePathParams()?.[1] || 'App',
                modalType: edit ? 'edit' : 'add',
                stringID_back: ''
            })
            if (response?.code == 1) {
                setOpen(false)
            }
        })

    }, [fileData])
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

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <Card title='国际化列表'>
            <Space direction='vertical' className='w-full'>
                <Button type='primary' onClick={() => setOpen(true)}>添加</Button>
                <Table columns={columns} dataSource={dataSource} />
            </Space>
            <Modal
                title={<div className='flex flex-row item'> <Title level={5}>{edit ? '编辑' : '新增'}</Title> <Text>模块：{handleParsePathParams()?.[1] || 'App'}</Text></div>}
                open={open}
                centered={true}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                >
                    <Form.Item
                        label="stringID"
                        name={'stringID'}
                        tooltip="请输入唯一ID,不需要输入前缀"
                        rules={
                            [{ required: true, message: '请输入唯一ID' }]
                        }>
                        <Input placeholder="请输入唯一ID" />
                    </Form.Item>
                    <Form.Item
                        label="zhCN"
                        name={'zhCN'}
                        rules={
                            [{ required: true, message: '请输入zhCN中文' }]
                        }>
                        <Input placeholder="请输入zhCN中文" />
                    </Form.Item>
                    <Form.Item
                        label="enUS"
                        name={'enUS'}
                        rules={
                            [{ required: true, message: '请输入zhCN英文' }]
                        }>
                        <Input placeholder="请输入enUS英文" />
                    </Form.Item>
                </Form>
            </Modal>
        </Card >

    )
}
export default ListCom