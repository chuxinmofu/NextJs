'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Divider, Button, Card, Space, Modal, Form, Input, Typography } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { sendGetFileApi, sendGetFile, sendPostAddNew, sendPostDelete } from "@/api/index";
import { handleParsePathParams, handleFormattedTableData, handleRemoveFirstDotAndBefore } from "@/utils/methodSet"

const { Title, Text } = Typography;
const { confirm } = Modal;
const ListCom = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [fileData, setFileData] = useState([])//仓库原始数据集合
    const [edit, setEdit] = useState(false)
    const [open, setOpen] = useState(false);

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
        const pathPar = handleParsePathParams()?.[1];
        form.validateFields().then(async values => {
            const response = await sendPostAddNew({
                ...values,
                menuKey: pathPar || 'app',
                modalType: edit ? 'edit' : 'add',
            })
            if (response?.code == 0) {
                setOpen(false)
                setEdit(false)
                form?.resetFields()
                handleSendGetFile(pathPar || 'app');
            }
        })
    }, [edit, form, handleSendGetFile])
    const handleCancel = useCallback(() => {
        form?.resetFields()
        setOpen(false);
    }, [form]);
    const handleDelete = useCallback((ele) => {
        const pathPar = handleParsePathParams()?.[1];
        confirm({
            title: '确认删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '操作是不可逆的，请谨慎操作！',
            okText: '确认',
            cancelText: '取消',
            async onOk() {
                const response = await sendPostDelete({
                    menuKey: pathPar || 'app',
                    stringID: handleRemoveFirstDotAndBefore(ele?.stringID)

                })
                if (response?.code == 0) {
                    handleSendGetFile(pathPar || 'app');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }, [handleSendGetFile])
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
                <Button
                    className='text-[#1677ff]'
                    type='link'
                    key='info'
                    onClick={() => handleDelete(record)}
                >
                    删除
                </Button>
                <Divider key='divider' type='vertical' />
                <Button
                    className='text-[#1677ff]'
                    type='link'
                    key='edit'
                    onClick={async () => {
                        form?.setFieldsValue({
                            ...record,
                            stringID: handleRemoveFirstDotAndBefore(record?.stringID)
                        })
                        setEdit(true)
                        setOpen(true)
                    }}>
                    编辑
                </Button>
            </>
        }
    ]


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