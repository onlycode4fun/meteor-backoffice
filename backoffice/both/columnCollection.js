export const columnsAdmin = {
    users : [
        "_id", "username", "emails.0.address", "profile.active"
    ],
    UserProjects : [
        "_id", "description", "state", "type", "user_id", "work_type", "created"
    ],
    Notifications : [
        "_id" , "userIdTo", "msg", "created"
    ]

};