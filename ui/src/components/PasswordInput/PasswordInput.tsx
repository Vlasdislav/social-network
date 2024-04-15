import React from 'react';
import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';

type Props = {
    name: string;
    placeholder: string;
    dependencies?: NamePath[];
}

export const PasswordInput = ({
    name,
    placeholder,
    dependencies
}: Props) => {
  return (
    <Form.Item
        name={ name }
        dependencies={ dependencies }
        hasFeedback={ true }
        rules={[{
            required: true,
            message: "Обязательное поле"
        }, ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value) {
                    return Promise.resolve();
                }
                if (name === "confirmPassword") {
                    if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароль должны совпадать"));
                } else {
                    if (value.length < 8) {
                        return Promise.reject(new Error("Пароль должны быть от 8 символов"));
                    }
                    return Promise.resolve();
                }
            }
        })]}
    >
        <Input.Password
            placeholder={ placeholder }
            size="large"
        ></Input.Password>
    </Form.Item>
  )
}
