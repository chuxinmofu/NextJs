'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Image, Card, Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { logo } from "@/utils/defaultIcon";
import { sendPostLogin } from "@/api/sign";
import styles from "./index.module.scss";


const Login = () => {
    const [loginLoading, setLoginLoading] = useState(false);//登录按钮状态
    const [form] = Form.useForm();
    const handleSubmit = useCallback(async () => {
        const { username, password } = await form?.validateFields()
        setLoginLoading(true)
        const response = await sendPostLogin({ username, password });
        console.log(response)
        setLoginLoading(false)
    }, [form])

    return (
        <div className={`${styles.login} flex flex-col justify-center items-center w-full box-border p-[20px] min-h-screen`}>
            <Card className={`border-1 w-[400px] border-[#bfbfbf]`}>
                <div className={`text-center text-[20px] pb-[15px] font-[500]`}>
                    <Image alt='' src={logo?.src} preview={false} height={60}></Image>
                </div>
                <div className="text-center text-[20px] py-[20px] font-[600]">国际化录入平台</div>
                <Form onFinish={handleSubmit} form={form} className="flex flex-col gap-y-4">
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input
                            className="h-[40px] input-bordered"
                            prefix={<UserOutlined />}
                            placeholder="请输入账号"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            className="h-[40px] input-bordered"
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>

                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-end">
                            <a
                                className="text-[#1677ff] cursor-pointer"
                                href="/user/forgetPassword"
                                aria-label="忘记密码链接"
                            >
                                忘记密码
                            </a>
                        </div>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-[40px] text-[14px]"
                            loading={loginLoading}
                            aria-label="登录按钮"
                        >
                            登录
                        </Button>
                    </div>
                </Form>
                <div className={`text-center mt-[10px]`}>
                    还没有账号？
                    <a className="text-[#1677ff] cursor-pointer" href={"/signUp"}>
                        立即注册
                    </a>{" "}
                </div>
            </Card>

        </div>
    );
}

export default Login;
