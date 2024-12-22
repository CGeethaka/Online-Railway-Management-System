import { Row, Col } from 'antd';

export function Error() {
    return (<>
        <Row>
            <Col sm={8} offset={sm ? 8 : 0}>
                <p>Error loging in. Please try again later!</p>
            </Col>
        </Row>
    </>)

};
