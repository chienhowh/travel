import React, { useEffect } from "react";
import { Header, Footer, FilterArea, ProductList } from '../../components';
import styles from './searchpage.module.css';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { getProductSearch } from "../../redux/productSearch/slice";
import { Spin } from "antd";

interface MatchParams {
    keywords: string;
}


export const SearchPage: React.FC = () => {
    const { keywords } = useParams<MatchParams>();// 拿router參數
    const location = useLocation();// router網址
    const dispatch = useDispatch();
    // 拿訊息
    const data = useSelector((state) => state.productSearch.product);
    const loading = useSelector(state => state.productSearch.loading);
    const error = useSelector(state => state.productSearch.error);
    // 分頁訊息
    const pagination = useSelector(state => state.productSearch.pagination);

    const onPageChange = (pageNumber: number | string, pageSize: number | string) => {
        dispatch(getProductSearch({ pageNumber, pageSize, keywords }))
    }

    useEffect(() => {
        // 發送訊息
        dispatch(getProductSearch({ pageNumber: 1, pageSize: 10, keywords }));
    }, [location])// 監聽router變化，有搜索行為，router就會變化

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
        <Header />
        <div className={styles["page-content"]}>
            {/* 篩選 */}
            <div className={styles["product-list-container"]}>
                <FilterArea></FilterArea>
            </div>
            {/* 結果列表 */}
            <div className={styles["product-list-container"]}>
                <ProductList data={data} paging={pagination} onPageChange={onPageChange}></ProductList>
            </div>
        </div>
        <Footer />
    </>)
}