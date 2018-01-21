import Text from 'simple-react-form-material-ui/lib/text'
import ObjectIu from 'simple-react-form-material-ui/lib/object'
import ArrayIu from 'simple-react-form-material-ui/lib/array'
import Select from 'simple-react-form-material-ui/lib/select'
import DatePicker from 'simple-react-form-material-ui/lib/date-picker'
Notifications = new Mongo.Collection("notifications");

let Schemas = {};
SimpleSchema.extendOptions({
    srf: Match.Optional(Object)
})

Notifications.allow({
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
Schemas.Notifications = new SimpleSchema({
    userIdTo: {
        type: String,
        label: "id Usuario"
    },

    type:{
        type: String,
        label: "tipo de la notificacion",
        optional:true,
        srf:{
            type: Select,
            options: [
                {
                    label: 'Borrador', value: 'draft'
                },
                {
                    label: 'Publicado', value: 'published'
                },{
                    label: 'Aprobado', value: 'ok'
                }
            ]
        }
    },

    msg: {
        type: String,
        label: "msg"
    },
    created: {
        type: Date,
        autoValue: function() {
            return new Date();
        },
        srf: {
            type: DatePicker,
            formatDate: (date) => moment(date).format('LL')
        }
    },
});

Notifications.attachSchema(Schemas.Notifications);