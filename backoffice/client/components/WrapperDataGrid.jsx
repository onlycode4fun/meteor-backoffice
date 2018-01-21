
import React from 'react';
import DatagridBootstrap from './DatagridBootstrap';
import {columnsAdmin} from "../../both/columnCollection";
import {getFlattenedObject} from "../../both/utils";
import {Button} from 'react-bootstrap';

export default class WrapperDataGrid extends React.Component {
    constructor(props){
        super(props);

        this.state={
            ready: false,
            data: [],
            schema: null,
            columns: [],
            collection: this.props.collection,
            subscription: this.props.subscription
        }
        this.insert = this.insert.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    componentWillMount(){
        this.subscribe(this.state.collection,this.state.subscription);
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.collection){
            this.subscribe(nextProps.collection, nextProps.subscription);
            this.setState({collection: nextProps.collection, subscription: nextProps.subscription});
        }
    }


    subscribe(collection, subscription){
        Meteor.subscribe(subscription, ()=>{
            let data = (collection == "users") ? Meteor.users.find().fetch() : window[collection] ? window[collection].find().fetch() : null;
            if(data){
                for(let i = 0; i < data.length; i ++){
                    data[i] = getFlattenedObject(data[i]);
                }
                let columns = columnsAdmin[collection];
                let schema = (collection == "users") ? Meteor.users.simpleSchema()._schema : window[collection].simpleSchema()._schema;
                this.setState({ready: true, data: data, schema: schema, columns: columns});
            }
        })
    }

    insert(){
        FlowRouter.go("/insert/"+this.state.collection+"/"+this.state.subscription);
    }


    render() {
        if(!this.state.ready){
            return (
                null
            )
        }
        return (
            <div>
            <DatagridBootstrap  collection={this.state.collection} subscription={this.state.subscription} columns={this.state.columns} schema={this.state.schema} data = {this.state.data}/>
                <Button onClick={this.insert}> Insert </Button>
            </div>

        )
    }
}

