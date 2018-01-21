import React from 'react'
import {Form, Field} from 'simple-react-form'
import {Button} from 'react-bootstrap'
import 'simple-react-form-material-ui'
import DatePicker from 'simple-react-form-material-ui/lib/date-picker'
import Text from 'simple-react-form-material-ui/lib/text'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {columnsAdmin} from "../../both/columnCollection";
import 'simple-react-form-material-ui/lib/styles'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
export default class PostsCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schema: null,
            columns: null,
            object: null,
            mode: null
        };
        this._unmounting = false;
        this.remove = this.remove.bind(this);
    }

    componentWillMount(){
        let mode = this.props.insert ? "insert" : "view";
        !this._unmounting && this.setState({mode: mode});
        Meteor.subscribe(this.props.subscription, ()=>{
            let columns = columnsAdmin[this.props.collection];
            let schema = (this.props.collection == "users") ? Meteor.users.simpleSchema()._schema : window[this.props.collection].simpleSchema()._schema;
            !this._unmounting && this.setState({ready: true, schema: schema, columns: columns},()=>{
                if(!this.props.insert){
                    this.getObject();
                }
            });
        });
    }

    componentWillReceiveProps(nextProps){
        let mode = nextProps.insert ? "insert" : "view";
        if(mode != this.state.mode){
            this._unmounting && this.setState({mode: mode});
        }
    }

    remove(){
        let collection = (this.props.collection == "users") ? Meteor.users : window[this.props.collection];
        collection.remove(this.props.id);
        FlowRouter.go("/admin/"+this.props.collection)
    }
    getObject(){
        let id = this.props.id;
        let object = (this.props.collection == "users") ? Meteor.users.findOne({_id: id}): window[this.props.collection].findOne({_id: id});
        !this._unmounting && this.setState({object: object})
    }

    componentWillUnmount(){
        this._unmounting = true;
    }

    buildForm(){
        let res = [];
        if(this.state.mode != "insert") {
            let object = this.state.object;

            if (object) {
                res.push(<Form state={this.state.changes} onChange={changes => this.setState({changes:changes})}
                    collection={(this.props.collection == "users") ? Meteor.users : window[this.props.collection]}
                    type='update'
                    ref='form'
                    logErrors
                    doc={object}/>);
            }
        }else{
            res.push(<Form key={"key"} state={this.state.changes} onChange={(changes) =>{this.setState({changes:changes})}}
                collection={(this.props.collection == "users") ? Meteor.users : window[this.props.collection]}
                type='insert'
                ref='form'
                logErrors
                onSuccess={(docId) => FlowRouter.go("/view/"+this.props.collection+"/"+this.props.subscription+"/"+docId)}/>)
        }
        return res;
    }
    render() {
        if(this.state.mode != "insert"){
            return (

                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        {this.buildForm()}
                        <Button onClick={() => this.refs.form.submit()}> Save </Button>
                        <Button onClick={this.remove}> Delete </Button>
                        <p>
                            <b>Current State:</b>
                        </p>
                        <pre>
          {JSON.stringify(this.state.changes, null, 2)}
        </pre>
                    </div>
                </MuiThemeProvider>

            )
        }else{
            return (
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        {this.buildForm()}
                        <Button onClick={() => this.refs.form.submit()}> Save </Button>
                        <Button onClick={this.remove}> Delete </Button>
                        <p>
                            <b>Current State:</b>
                        </p>
                        <pre>
          {JSON.stringify(this.state.changes, null, 2)}
        </pre>
                    </div>
                </MuiThemeProvider>
                )
        }

    }
}