import React from "react";
import styles from './MainLayout.module.css';
import { Header, Footer } from '../../components';

export const MainLayout: React.FC = ({ children }) => (
    <>
    <Header/>
    {/* 頁面內容 */}
    <div className={styles['page-content']}>
        {children}
    </div>
    <Footer/>
    </>
)