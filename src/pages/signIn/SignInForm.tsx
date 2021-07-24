import { Button, Checkbox, Form, Input } from "antd";
import { useSelector } from "../../redux/hooks";
import style from './SignInForm.module.css';
import { useDispatch } from 'react-redux';
import { signIn } from "../../redux/user/slice";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

export const SignInForm: React.FC = () => {
    const token = useSelector(s => s.user.token);
    const loading = useSelector(s => s.user.loading);
    const dispatch = useDispatch();
    const history = useHistory();




    const onFinish = (values: any) => {
        console.log('Success:', values);
        // 表單合格摳登錄api
        dispatch(signIn({ email: values.username, password: values.password }));
        console.log('test');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        // token變化就看有沒有拿到jwt，有值代表登錄成功
        if (token !== null) {
            history.push('/')
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (
        <Form
            name="basic"
            layout={'vertical'}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={style['register-form']}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};