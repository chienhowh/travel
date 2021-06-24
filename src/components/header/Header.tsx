import { GlobalOutlined } from "@ant-design/icons"
import logo from '../../assets/logo.svg';
import { Typography, Dropdown, Menu, Button, Layout, Input } from "antd"
import style from './Header.module.css';
import { useHistory, Link } from 'react-router-dom';

export const Header: React.FC = () => {
    const history = useHistory();
    return (<div className={style['app-header']}>
        <div className={style['top-header']}>
            <div className={style.inner}>
                <Typography.Text>讓旅遊更幸福</Typography.Text>
                <Dropdown.Button style={{ marginLeft: 15 }} icon={<GlobalOutlined />} overlay={<Menu>
                    <Menu.Item>中文</Menu.Item>
                    <Menu.Item>英文</Menu.Item>
                </Menu>}>
                    語言
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
            <Input.Search placeholder="請輸入旅遊目的地" className={style['search-input']}></Input.Search>
        </Layout.Header>

        <Menu mode={"horizontal"} className={style["main-menu"]}>
            <Menu.Item key={1}>旅遊首頁</Menu.Item>
            <Menu.Item key={2}>週末遊</Menu.Item>
            <Menu.Item key={3}>跟團遊</Menu.Item>
            <Menu.Item key="4"> 自由行 </Menu.Item>
            <Menu.Item key="5"> 私家團 </Menu.Item>
            <Menu.Item key="6"> 郵輪 </Menu.Item>
            <Menu.Item key="7"> 酒店+景點 </Menu.Item>
            <Menu.Item key="8"> 當地玩樂 </Menu.Item>
            <Menu.Item key="9"> 主題遊 </Menu.Item>
            <Menu.Item key="10"> 訂製遊 </Menu.Item>
            <Menu.Item key="11"> 遊學 </Menu.Item>
            <Menu.Item key="12"> 簽證 </Menu.Item>
            <Menu.Item key="13"> 企業遊 </Menu.Item>
            <Menu.Item key="14"> 高端遊 </Menu.Item>
            <Menu.Item key="15"> 戶外 </Menu.Item>
            <Menu.Item key="16"> 保險 </Menu.Item>
        </Menu>
    </div>)
}