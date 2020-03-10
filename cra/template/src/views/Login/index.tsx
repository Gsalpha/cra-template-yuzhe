import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import s from './index.module.scss'
import { LockOutlined, UserOutlined, CodeOutlined } from '@ant-design/icons'
import { baseValidate } from '@/lib/validator'
import Sms, { SmsRef } from '@/views/Login/Sms'
import { globalApi } from '@/api/global'
import { AppState, useThunkDispatch } from '@/store'
import { globalEffects } from '@/store/global'
import { useSelector } from 'react-redux'
import { PageLoading } from '@/components/PageLoading'

const { Item, useForm } = Form
const Login = () => {
    const smsButtonRef = useRef<SmsRef>(null)
    const [form] = useForm()
    const thunkDispatch = useThunkDispatch()
    const loading = useSelector((state: AppState) => ({
        login: state.loading.login!,
        authorize: state.loading.authorize!
    }))
    useEffect(() => {
        thunkDispatch(globalEffects.authorize())
            .then(() => {
                window.location.replace('/')
            })
            .catch(() => {})
    }, [thunkDispatch])
    const handleFinish = (values: any) => {
        thunkDispatch(globalEffects.login(values))
    }
    const handleSendSms = () => {
        form.validateFields(['phone']).then(async (values: any) => {
            console.log(values)
            smsButtonRef.current!.start()
            try {
                await globalApi.sendSms(values)
            } catch (e) {
                smsButtonRef.current!.stop()
                notification.error({
                    message: '获取短信验证失败',
                    description: e.message
                })
            }
        })
    }
    return (
        <PageLoading loading={loading.authorize}>
            <div className={s.context}>
                <Form className={s.root} onFinish={handleFinish} form={form}>
                    <div className={s.signIn}>
                        <div className={s.icon}>
                            <LockOutlined
                                style={{ fontSize: 24, color: '#fff' }}
                            />
                        </div>
                        <h1>SPA Boilerplate</h1>
                    </div>
                    <Item
                        name="phone"
                        rules={[
                            baseValidate.required('请输入手机号'),
                            baseValidate.phone()
                        ]}
                    >
                        <Input
                            autoFocus
                            prefix={
                                <UserOutlined
                                    style={{
                                        color: '#fff',
                                        fontSize: 16
                                    }}
                                />
                            }
                            placeholder="请输入手机号"
                            size="large"
                        />
                    </Item>
                    <Item>
                        <Row gutter={8}>
                            <Col span={18}>
                                <Item
                                    noStyle
                                    name="smsCode"
                                    rules={[
                                        baseValidate.required('请输入验证码')
                                    ]}
                                >
                                    <Input
                                        prefix={
                                            <CodeOutlined
                                                style={{
                                                    color: '#fff',
                                                    fontSize: 16
                                                }}
                                            />
                                        }
                                        placeholder="请输入验证码"
                                        size="large"
                                    />
                                </Item>
                            </Col>
                            <Col span={6}>
                                <Sms
                                    ref={smsButtonRef}
                                    onClick={handleSendSms}
                                />
                            </Col>
                        </Row>
                    </Item>
                    <Item className={s.field}>
                        <Button
                            loading={loading.login}
                            type="primary"
                            size="large"
                            htmlType={'submit'}
                            className={s.submit}
                        >
                            登 录
                        </Button>
                    </Item>
                </Form>
            </div>
        </PageLoading>
    )
}
export default Login
