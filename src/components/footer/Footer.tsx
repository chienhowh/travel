import { Layout, Typography } from "antd";
import React from "react";

export const Footer: React.FC = () => {
    return (<Layout.Footer>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
            版權所有
        </Typography.Title>
    </Layout.Footer>)
}