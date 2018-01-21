import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import React from 'react';

export default class DatagridBootstrap extends React.Component {
    constructor(){
        super();

        this.state={
        }
        this.handleRowSelect = this.handleRowSelect.bind(this);

    }

    beforeSaveCell(row, cellName, cellValue) {
        // do your stuff...
    }


    handleRowSelect(row, isSelected, e) {
       if(isSelected){
           FlowRouter.go("/view/"+this.props.collection+"/"+this.props.subscription+"/"+row._id);
       }
    }


    enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
    }

    createCustomToolBar = props => {


        return (
            <div style={ { margin: '15px' } }>
                { props.components.btnGroup }
                <div className='col-xs-8 col-sm-4 col-md-4 col-lg-2'>
                    { props.components.searchPanel }
                </div>
            </div>
        );
    }

    jobNameValidator(value, row) {
        // If this function return an object, you got some ability to customize your error message
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        if (!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must be inserted';
            response.notification.title = 'Requested Value';
        } else if (value.length < 10) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must have 10+ characters';
            response.notification.title = 'Invalid Value';
        }
        return response;
    }

    jobStatusValidator(value, row) {
        const nan = isNaN(parseInt(value, 10));
        if (nan) {
            return 'Job Status must be a integer!';
        }
        return true;
    }

    getColumn(){
        let res = [];
        for(let i = 0; i < this.props.columns.length; i ++){
            let key = (i == 0) ? true : false;
            res.push(<TableHeaderColumn isKey={key} dataField={this.props.columns[i]} dataSort={true}>{this.props.columns[i]}</TableHeaderColumn>)
        }
        return res;
    }

    render() {
        const qualityType = {
            0: true,
            1: false,
            2: 'unknown'
        };
        const options = {
            toolBar: this.createCustomToolBar
        };

        const data = this.props.data;

        const selectRow = {
            mode: 'radio', // or checkbox
            onSelect: this.handleRowSelect
        };

        const cellEdit = {
            mode: 'click', // click cell to edit
            blurToSave: true,
            beforeSaveCell: this.beforeSaveCell
        };
        return (
            <BootstrapTable options={options} scrollTop={ 'Bottom' } exportCSV={true} columnFilter={true}  multiColumnSearch={true}  selectRow={ selectRow } search={true} pagination={true} data={data} striped={true} hover={true}>
                {this.getColumn()}
            </BootstrapTable>

        )
    }
}

