import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { setAuthUser, setIsAuthenticated } from "./../appSlice";
import { googleLogout } from '@react-oauth/google';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  MailOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import logo from '../assets/img/logo.png';

const { Header, Content, Footer } = Layout;

export function ComomnLayout(props: { children: any | null | undefined }) {
  // const [user, setUser] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutGoogle = () => {
    googleLogout();
    dispatch(setIsAuthenticated(false));
    dispatch(setAuthUser(null));
    localStorage.removeItem("user");
    history.push("/");
  };
  const { children } = props;
  let user = useSelector((state: any) => state.app.authUser as any) as any;
  // useEffect(() => {
  //   if (currentUser) {
  //     // localStorage.setItem("user", JSON.stringify(currentUser));
  //     setUser(currentUser);
  //   }
  //   else {
  //     const persistUser = localStorage.getItem("user");
  //     if (persistUser) {
  //       setUser(JSON.parse(persistUser));
  //       dispatch(setIsAuthenticated(persistUser));
  //       dispatch(setAuthUser(persistUser));
  //     } else {
  //       logoutGoogle();
  //     }
  //   }
  // }, currentUser);

  console.log(user)

  return (
    <div className="rm-common">
      <Header>
        {user ?
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Link to="/welcome"><img src={logo} alt="Logo" style={{ marginRight: 8 }} className='rm-logo' /></Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
              <Link to="/reservation">Cart</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/profile">{user && user.fullName}</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logoutGoogle}>
              Logout
            </Menu.Item>
          </Menu> :
          <Link to="/"><img src={logo} alt="Logo" style={{ marginRight: 8 }} className='rm-logo' /></Link>}
      </Header>
      <div className='rm-common-content'>
        {children}
      </div>
      <Footer style={{ textAlign: 'center' }}>National Railway Coorparation ©2023</Footer>
    </div >
  );
};
