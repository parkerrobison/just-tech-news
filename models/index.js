const User = require('./User')
const Post = require('./Post')

// create associations
// this association creates a reference for the id column in the User model to link to the corresponding 
// foreign key pair(user_id in the Post model) 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// we create the reverse association here to define the relationship of the Post model to the User.
// the constraint we impose here is that a post can belong to one user. and not many.
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = {
    User,
    Post
};