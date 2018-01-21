
Meteor.publish('notificationsByUser', function(_id, limit: 0) {
    return Notifications.find({userIdTo: _id},{limit: limit,sort: {created: -1}});
});


Meteor.publish('notifications', function() {
    return Notifications.find();
});