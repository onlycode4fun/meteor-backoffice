import Home from './pages/home';
import {mount} from 'react-mounter';
import MainLayout from './layouts/mainLayout';
import React from 'react';
import Administration from './pages/administration';
import View from './components/view';
import Login from './pages/login';

FlowRouter.triggers.enter([function(context, redirect){
    if(Meteor.userId() && context.path === '/login'){
        redirect('/');
    }else if(!Meteor.userId() && context.path !== '/login' ){
        console.log("loginn");
        redirect('/login');
    }else{
        console.log("nothing");
    }
}]);

FlowRouter.route('/login', {
    action(_params) {
        mount(Login);
    }
});


FlowRouter.route('/', {
    action(_params) {
        mount(MainLayout, {
            content: props => <Home />
        });
    }
});


FlowRouter.route('/admin/user_projects', {
    action(_params) {
        mount(MainLayout, {
            content: props => <Administration collection={"UserProjects"} />
        });
    }
});

FlowRouter.route('/admin/notifications', {
    action(_params) {
        mount(MainLayout, {
            content: props => <Administration collection={"Notifications"} />
        });
    }
});


FlowRouter.route('/admin/:collection', {
    action(_params) {
        mount(MainLayout, {
            content: props => <Administration collection={_params.collection} />
        });
    }
});


FlowRouter.route('/view/:collection/:subscription/:id', {
    action(_params) {
        mount(MainLayout, {
            content: props => <View collection={_params.collection}  subscription={_params.subscription} id={_params.id}/>
        });
    }
});

FlowRouter.route('/insert/:collection/:subscription', {
    action(_params) {
        mount(MainLayout, {
            content: props => <View insert collection={_params.collection}  subscription={_params.subscription}/>
        });
    }
});