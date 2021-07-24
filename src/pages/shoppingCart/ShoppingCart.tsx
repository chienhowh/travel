import React, { useEffect } from "react";
import { Col, Row } from 'antd';
import styles from './ShoppingCart.module.css';
import { MainLayout } from '../../layouts/mainLayout';
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { PaymentCard, ProductList } from "../../components";
import { checkout, clearShoppingCart, getShoppingCart } from "../../redux/shoppingCart/slice";
import { useHistory } from "react-router-dom";
export const ShoppingCart: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(s => s.shoppingCart.loading);
    const shoppingCartItems = useSelector(s => s.shoppingCart.items);
    const jwt = useSelector(s => s.user.token) as string;

    useEffect(() => {
        dispatch(getShoppingCart(jwt));
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <MainLayout>
            <Row>
                {/* 商品列 */}
                <Col span={15}>
                    <div className={styles["product-list-container"]}>
                        <ProductList data={shoppingCartItems.map(item => item.touristRoute)} />
                    </div>
                </Col>
                {/* 付款信息 */}
                <Col span={8} offset={1}>

                    <div className={styles["payment-card-container"]}>
                        <PaymentCard
                            loading={loading}
                            originalPrice={shoppingCartItems.map(item => item.originalPrice).reduce((a, b) => a + b, 0)}
                            price={shoppingCartItems.map(item => item.originalPrice * (item.discountPresent ?? 1)).reduce((a, b) => a + b, 0)}
                            onCheckout={() => {
                                if (shoppingCartItems.length <= 0) {
                                    return
                                } else {
                                    dispatch(checkout(jwt));
                                    history.push('/placeOrder')
                                }
                            }}
                            onShoppingCartClear={() => dispatch(clearShoppingCart({ jwt, itemIds: shoppingCartItems.map(item => item.id) }))}
                        />
                    </div>

                </Col>
            </Row>

        </MainLayout>
    )
}