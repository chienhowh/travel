
import { Menu } from 'antd';
import { sideMenuList } from './mockdata';
import style from './SideMenu.module.css';
import uuid from 'react-uuid';
import { tify } from 'chinese-conv';

export const SideMenu: React.FC = () => {
    return (<Menu mode='vertical' className={style['side-menu']}>
        {sideMenuList.map((menu) =>
            <Menu.SubMenu key={uuid()} title={tify(menu.title)}>
                {menu.subMenu.map((submenu) =>
                    <Menu.SubMenu key={uuid()} title={tify(submenu.title)}>
                        {submenu.subMenu.map((ssmenu, ssindex) =>
                            <Menu.Item key={uuid()} >
                                <span>{tify(ssmenu)}</span>
                            </Menu.Item>
                        )}
                    </Menu.SubMenu>
                )}
            </Menu.SubMenu>
        )}
    </Menu>);
}