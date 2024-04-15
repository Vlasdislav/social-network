import React, { useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { Input } from '../../components/Inpput/Input'
import { PasswordInput } from '../../components/PasswordInput/PasswordInput'
import { Button } from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { UserData, useAuthorizeMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage'

export const Authorize = () => {
    const navigate = useNavigate();
    const [authUser, _] = useAuthorizeMutation();
    const [error, setError] = useState('');
    const authorize = async (data: UserData) => {
        try {
            await authUser(data).unwrap();
            navigate("/");
        } catch (errror) {
            const maybeEroror = isErrorWithMessage(error);
            if (maybeEroror) {
                setError(error.data.message);
            } else {
                setError("Неизвестная ошибка");
            }
        }
    }
    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Войдите" style={{ width: "30rem" }}>
                    <Form onFinish={ authorize }>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Пароль"
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Войти
                        </Button>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
                        </Typography.Text>
                        <ErrorMessage message={ error } />
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}
