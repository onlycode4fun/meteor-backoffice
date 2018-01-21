import React from 'react';
import DatagridBootstrap from '../components/DatagridBootstrap'
import WraperDataGrid from '../components/WrapperDataGrid'
import {} from '../../both/utils'

export default class Administration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collection : this.props.collection
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.collection != this.state.collection){
            this.setState({collection: nextProps.collection});
        }
    }


    render() {
        return (
            <div>
                <WraperDataGrid collection={this.state.collection} subscription={this.state.collection.toCamelCase()}/>
            </div>
    );
    }
}