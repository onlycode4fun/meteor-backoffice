Meteor.publish('userProjects', function() {
    return UserProjects.find({});
});

Meteor.publish('userProjectsByUser', function(userId) {
    return UserProjects.find({user_id: userId});
});

Meteor.publish('userProjectsById', function(_id) {
    return UserProjects.find({_id: _id});
});