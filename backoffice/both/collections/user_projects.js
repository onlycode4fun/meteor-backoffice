
UserProjects = new Mongo.Collection("user_projects");
import {Meteor} from 'meteor/meteor'
import Text from 'simple-react-form-material-ui/lib/text'
import ObjectIu from 'simple-react-form-material-ui/lib/object'
import ArrayIu from 'simple-react-form-material-ui/lib/array'
import Select from 'simple-react-form-material-ui/lib/select'
import DatePicker from 'simple-react-form-material-ui/lib/date-picker'
SimpleSchema.extendOptions({
    srf: Match.Optional(Object)
})

let Schemas = {};
UserProjects.allow({
    insert: function (userId) {
        return userId && Roles.userIsInRole(userId, "admin");
    },
    update: function (userId, doc, fields, modifier) {
        return userId && Roles.userIsInRole(userId, "admin");
    },
    remove: function (userId, doc) {
        return userId && Roles.userIsInRole(userId, "admin");
    }
});


Schemas.UserProjects = new SimpleSchema({
    created: {
        type: Date,
        defaultValue: new Date(),
        srf: {
            type: DatePicker,
            formatDate: (date) => moment(date).format('LL')
        }
    },
    user_id:{
        type: String,
    },
    state: {
        type: String,
        srf:{
            type: Select,
            options: [
                {
                    label: 'Activo', value: 'active'
                },
                {
                    label: 'Inactivo', value: 'inactive'
                }
            ]
        }
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    
});

UserProjects.attachSchema(Schemas.UserProjects);