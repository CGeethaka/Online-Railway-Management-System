import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "../../appSlice";
import { Row, Col } from 'antd';
import signInButton from '../../assets/img/signin.webp';


export function Login() {
  const axios = require('axios').default;

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:5000/api/v1/auth/user", { withCredentials: true })
      .catch(() => {
        console.log("Not properly authenticated");
        dispatch(setIsAuthenticated(false));
        dispatch(setAuthUser(null));
        history.push("/login/error");
        localStorage.removeItem("user");
      });

    if (response && response.data) {
      console.log("User: ", response.data);
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(response.data));
      history.push("/welcome");
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  };

  const redirectToGoogleSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const googleLoginURL = "http://localhost:5000/api/v1/login/google";
    const windowWidth = 500;
    const windowHeight = 600;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const left = (screenWidth - windowWidth) / 2;
    const top = (screenHeight - windowHeight) / 2;
    const newWindow =
      window.open(googleLoginURL, '_blank', `width=${windowWidth}, height=${windowHeight}, top=${top}, left=${left}`);

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };
  return (
    <div className="rm-login">
      <Row gutter={[16, 16]} justify="center" align="middle" style={{ height: '100%' }}>
        <Col><img src={signInButton} alt="" className="rm-login__google-icn" onClick={redirectToGoogleSSO} />
        </Col>
      </Row>
    </div>
  );
}
