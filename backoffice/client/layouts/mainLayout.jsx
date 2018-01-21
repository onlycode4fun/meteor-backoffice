
import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap'
import Navbar from '../components/navbar';

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Navbar/>
                    <Col sm={12} md={12}>{this.props.content()}</Col>

                </Row>
            </Grid>

        );
    }
}