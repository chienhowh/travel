
import { useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { ProductIntro, ProductComments, Loading } from '../../components';
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Button } from 'antd';
import styles from './Detailpage.module.css';
import { commentMockData } from './mockup';
import { useSelector } from '../../redux/hooks';
import { getProductDetail } from '../../redux/productdetail/slice';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../../layouts/mainLayout';
import { addShoppingCart } from '../../redux/shoppingCart/slice';
import { ShoppingCartOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';
import { productInfo } from '../../dumbdata/productdetail';


interface MatchParams {
    touristRouteId: string;
}

const { RangePicker } = DatePicker;

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    const dispatch = useDispatch();

    const { touristRouteId } = useParams<MatchParams>();
    const error = useSelector(state => state.productDetail.error);
    const loading = useSelector(state => state.productDetail.loading);
    const product = useSelector(state => state.productDetail.product);

    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);
    const jwt = useSelector(s => s.user.token) as string;

    useEffect(() => {
        dispatch(getProductDetail(touristRouteId))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** fetch data 保護 */
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div>網站出錯：{error}</div>
    }
    /** fetch data end */

    return (<>
        <MainLayout>
            {/* 簡介 */}
            <div className={styles['product-intro-container']}>
                <Row>
                    <Col span={13}>
                        <ProductIntro title={product.title}
                            shortDescription={product.description}
                            price={product.originalPrice}
                            coupons={product.coupons}
                            points={product.points}
                            discount={product.price}
                            rating={product.rating}
                            key={uuid()}
                            pictures={product.touristRoutePictures.map((p: any) => p.url)}></ProductIntro>
                    </Col>
                    <Col span={11}>
                        <Button
                            style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                            type="primary"
                            danger
                            loading={shoppingCartLoading}
                            onClick={() => {
                                dispatch(
                                    addShoppingCart({ jwt, touristRouteId: product.id })
                                );
                            }}
                        >
                            <ShoppingCartOutlined />
                            放入購物車
                        </Button>
                        <RangePicker /></Col>
                </Row>
            </div>
            {/* 導航 */}
            <Anchor className={styles['product-detail-anchor']}>
                <Anchor.Link href="#features" title="產品特色"></Anchor.Link>
                <Anchor.Link href="#fees" title="費用"></Anchor.Link>
                <Anchor.Link href="#notes" title="預訂須知"></Anchor.Link>
                <Anchor.Link href="#comments" title="用戶評價"></Anchor.Link>
            </Anchor>
            {/* 產品特色 */}
            <div id="features" className={styles['product-detail-container']} >
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        產品特色
                    </Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{ __html: productInfo.feature }} style={{ margin: 50 }}></div>
            </div>
            {/* 產品費用 */}
            <div id="fees" className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        產品費用
                    </Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{ __html: productInfo.fee }} style={{ margin: 50 }}></div>
            </div>
            {/* 產品備註 */}
            <div id="notes" className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        產品備註
                    </Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{ __html: productInfo.reminder }} style={{ margin: 50 }}></div>
            </div>
            {/* 評價 */}
            <div id="comments" className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        用戶評價
                    </Typography.Title>
                </Divider>
                <div style={{ margin: 40 }}>
                    <ProductComments data={commentMockData}></ProductComments>
                </div>
            </div>
        </MainLayout>
    </>)
}