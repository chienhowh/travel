
import { useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Header, Footer, ProductIntro, ProductComments } from '../../components';
import axios from 'axios';
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu } from 'antd';
import styles from './Detailpage.module.css';
import { commentMockData } from './mockup';
import { useSelector } from '../../redux/hooks';
import { productDetail } from '../../redux/productdetail/slice';
import { useDispatch } from 'react-redux';
interface MatchParams {
    touristRouteId: string;
}

const { RangePicker } = DatePicker;

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    const { touristRouteId } = useParams<MatchParams>();
    // const [error, setError] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [product, setProduct] = useState<any>(null);
    const error = useSelector(state => state.productDetail.error);
    const loading = useSelector(state => state.productDetail.loading);
    const product = useSelector(state => state.productDetail.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(productDetail.actions.fetchStart())//actions是actioncreator
            try {
                const { data } = await axios.get(`http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`);
               dispatch(productDetail.actions.fetchSuccess(data));

            } catch (error) {
                dispatch(productDetail.actions.fetchFail(error.message));
            }
        }

        fetchData();
    },  // eslint-disable-next-line
        []);

    /** fetch data 保護 */
    if (loading) {
        return (<Spin size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
            }}></Spin>)
    }
    if (error) {
        return <div>網站出錯：{error}</div>
    }
    /** fetch data end */

    return (<>
        <Header></Header>
        <div className={styles['page-content']}>
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
                            pictures={product.touristRoutePictures.map((p: any) => p.url)}></ProductIntro>
                    </Col>
                    <Col span={11}><RangePicker /></Col>
                </Row>
            </div>
            {/* 導航 */}
            <Anchor>
                <Menu mode="horizontal">
                    <Menu.Item key="1">
                        <Anchor.Link href="#features" title="產品特色"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Anchor.Link href="#fees" title="費用"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Anchor.Link href="#notes" title="預訂須知"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Anchor.Link href="#comments" title="用戶評價"></Anchor.Link>
                    </Menu.Item>
                </Menu>
            </Anchor>
            {/* 產品特色 */}
            <div id="features" className={styles['product-intro-container']} >
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        產品特色
                    </Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
            </div>
            {/* 產品費用 */}
            <div id="fees" className={styles['product-intro-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        產品費用
                    </Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
            </div>
            {/* 產品備註 */}
            <div id="notes" className={styles['product-intro-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        產品備註
                    </Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
            </div>
            {/* 評價 */}
            <div id="comments" className={styles['product-intro-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        用戶評價
                    </Typography.Title>
                </Divider>
                <div className={styles['page-content']}>
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
                                    pictures={product.touristRoutePictures.map((p: any) => p.url)}></ProductIntro>
                            </Col>
                            <Col span={11}><RangePicker /></Col>
                        </Row>
                    </div>
                    {/* 導航 */}
                    <Anchor>
                        <Menu mode="horizontal">
                            <Menu.Item key="1">
                                <Anchor.Link href="#features" title="產品特色"></Anchor.Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Anchor.Link href="#fees" title="費用"></Anchor.Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Anchor.Link href="#notes" title="預定須知"></Anchor.Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Anchor.Link href="#comments" title="用戶評價"></Anchor.Link>
                            </Menu.Item>
                        </Menu>
                    </Anchor>
                    {/* 產品特色 */}
                    <div id="features" className={styles['product-intro-container']} >
                        <Divider orientation={'center'}>
                            <Typography.Title level={3}>
                                產品特色
                            </Typography.Title>
                        </Divider>
                        <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
                    </div>
                    {/* 產品費用 */}
                    <div id="fees" className={styles['product-intro-container']}>
                        <Divider orientation={'center'}>
                            <Typography.Title level={3}>
                                產品費用
                            </Typography.Title>
                        </Divider>
                        <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
                    </div>
                    {/* 產品備註 */}
                    <div id="notes" className={styles['product-intro-container']}>
                        <Divider orientation={'center'}>
                            <Typography.Title level={3}>
                                產品備註
                            </Typography.Title>
                        </Divider>
                        <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
                    </div>
                    {/* 評價 */}
                    <div id="comments" className={styles['product-intro-container']}>
                        <Divider orientation={'center'}>
                            <Typography.Title level={3}>
                                用戶評價
                            </Typography.Title>
                        </Divider>
                        <div style={{ margin: 40 }}>
                            <ProductComments data={commentMockData}></ProductComments>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <Footer></Footer>
    </>)
}