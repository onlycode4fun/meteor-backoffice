export default function AllowOperations(userId, doc, fields, modifier){
    return userId && Roles.userIsInRole(userId, "admin");
}