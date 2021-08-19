import { Spin } from "antd"

export const Loading: React.FC = () => {
    return (<Spin size="large"
        style={{
            width: "100%",
            height: "100vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}></Spin>)
}