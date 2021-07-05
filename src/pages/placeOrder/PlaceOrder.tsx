import React from "react";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from 'antd';
import { PaymentForm, CheckOutCard } from '../../components';
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrder: React.FC = () => {
    const dispatch = useDispatch();
    const loading = useSelector(s => s.order.loading);
    const order = useSelector(s => s.order.currentOrder);
    const jwt = useSelector(s => s.user.token) as string;
    console.log(order);
    
    return <MainLayout>
        <Row>
            <Col span={12}>
                <PaymentForm></PaymentForm>
            </Col>
            <Col span={12}>
                <CheckOutCard loading={loading} order={order} onCheckout={() => {
                    dispatch(placeOrder({ jwt, orderId: order.id }))
                }}></CheckOutCard>
            </Col>
        </Row>
    </MainLayout>
}