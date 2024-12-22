import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Col, Divider, Row, Space } from 'antd';
import reserveImage from '../../assets/img/reserve.jpg';
import trackImage from '../../assets/img/track.jpg';
import userImage from '../../assets/img/userprofile.png';
import trainsImage from '../../assets/img/trains.jpg';
import bookingsImage from '../../assets/img/bookings.jpg';
import financeImage from '../../assets/img/finance.jpg';
import usersImage from '../../assets/img/users.jpg';

const { Meta } = Card;

export function Welcome() {
  let user = useSelector((state: any) => state.app.authUser as any) as any;
  console.log(user.isAdmin)
  return (
    <div className="rm-welcome">
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16, offset: 4 }} className="rm-blocks">
          <Link to="/reservation">
            <Card
              hoverable
              cover={<img alt="example" src={reserveImage} />}
            >
              <Meta title="Reserve Seats" description="Reserve your train seats." />
            </Card>
          </Link>
          <Link to="/tracking">
            <Card
              hoverable
              cover={<img alt="example" src={trackImage} />}
            >
              <Meta title="Track Your Train" description="Track the locaiton of your train." />
            </Card>
          </Link>
          <Link to="/profile">
            <Card
              hoverable
              cover={<img alt="example" src={userImage} />}
            >
              <Meta title="User Profile" description="Maintain your profile." />
            </Card>
          </Link>
        </Col>
      </Row>

      {user.isAdmin && user.isAdmin === 1 ?
        <>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16, offset: 4 }}>
              <Divider orientation="left" style={{ margin: "30px 0" }}>Administrator</Divider>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16, offset: 4 }} className="rm-blocks">
              <Link to="/admin/trains">
                <Card
                  hoverable
                  cover={<img alt="users" src={usersImage} />}
                >
                  <Meta title="Users" description="Manage users of the system." />
                </Card>
              </Link>
              <Link to="/tracking">
                <Card
                  hoverable
                  cover={<img alt="trains" src={trainsImage} />}
                >
                  <Meta title="Trains" description="Add, update train details." />
                </Card>
              </Link>
              <Link to="/tracking">
                <Card
                  hoverable
                  cover={<img alt="bookings" src={bookingsImage} />}
                >
                  <Meta title="Bookings" description="Monitor the seat bookings." />
                </Card>
              </Link>
              <Link to="/tracking">
                <Card
                  hoverable
                  cover={<img alt="finance" src={financeImage} />}
                >
                  <Meta title="Accounts and Reports" description="Evaluate financial status." />
                </Card>
              </Link>
            </Col>
          </Row>
        </>
        : <></>}
    </div>);
}
