import { GlobalOutlined } from "@ant-design/icons"
import logo from '../../assets/logo.svg';
import { Typography, Dropdown, Menu, Button, Layout, Input } from "antd"
import style from './Header.module.css';
import { useHistory } from 'react-router-dom';
import React from "react";

import { useTranslation } from 'react-i18next';
import { changeLanguageActionCreator } from "../../redux/language/languageAction";
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks'; //


export const Header: React.FC = () => {
    const history = useHistory(); // router
    const { t } = useTranslation(); // i18n
    const language = useSelector(state => state.language.language); // store get language
    const languageList = useSelector(state => state.language.languageList);
    const dispatch = useDispatch();// dispatch action

    const handleLanguage = (e: any) => {
        const action = changeLanguageActionCreator(e.key);
        dispatch(action);

    }

    return (<div className={style['app-header']}>
        <div className={style['top-header']}>
            <div className={style.inner}>
                <Typography.Text>{t('header.slogan')}</Typography.Text>
                <Dropdown.Button style={{ marginLeft: 15 }} icon={<GlobalOutlined />} overlay={<Menu onClick={handleLanguage}>
                    {languageList.map(lan => <Menu.Item key={lan.code}>{lan.name}</Menu.Item>)}
                </Menu>}>
                    {language}
                </Dropdown.Button>
                <Button.Group className={style['button-group']}>
                    <Button onClick={() => history.push('register')}>註冊</Button>
                    <Button onClick={() => history.push('signIn')}>登錄</Button>
                </Button.Group>
            </div>
        </div>
        <Layout.Header className={style['main-header']}>
            <span onClick={() => history.push('/')}>
                <img src={logo} alt="" className={style['App-logo']} />
                <Typography.Title level={3} className={style.title}>旅遊網</Typography.Title>
            </span>
            <Input.Search placeholder="請輸入旅遊目的地" className={style['search-input']}
                onSearch={(keywords) => history.push(`/search/${keywords}`)}></Input.Search>
        </Layout.Header>

        <Menu mode={"horizontal"} className={style["main-menu"]}>
            <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
            <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
            <Menu.Item key="3"> {t("header.group")} </Menu.Item>
            <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
            <Menu.Item key="5"> {t("header.private")} </Menu.Item>
            <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
            <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
            <Menu.Item key="8"> {t("header.local")} </Menu.Item>
            <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
            <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
            <Menu.Item key="11"> {t("header.study")} </Menu.Item>
            <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
            <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
            <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
            <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
            <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
        </Menu>
    </div>)


}
