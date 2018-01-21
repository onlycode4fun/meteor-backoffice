import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    let id = Accounts.createUser({
      username: 'admin',
      email: 'admin@backoffice.com',
      password: 'admin',
      profile: {
        //publicly visible fields like firstname goes here
      }
    });
    Roles.addUsersToRoles(id, 'admin')
  }
});
