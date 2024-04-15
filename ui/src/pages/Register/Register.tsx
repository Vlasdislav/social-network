import React from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { Input } from '../../components/Inpput/Input'
import { PasswordInput } from '../../components/PasswordInput/PasswordInput'
import { Button } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'

export const Register = () => {
    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
                    <Form onFinish={ () => null }>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Имя"
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Пароль"
                        />
                        <PasswordInput
                            name="confirmPassword"
                            placeholder="Повторите пароль"
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Зарегистрироваться
                        </Button>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Есть аккаунт? <Link to={Paths.authorize}>Войдите</Link>
                        </Typography.Text>
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}