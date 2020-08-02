const User = require('./User')
const Post = require('./Post')
const Vote = require('./Vote')
const Comment = require('./Comment')

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

// these are many-to-many associations. These allow Post and User to query eachother in the context of a vote.
// i.e. we can see which users voted on a single post, or which posts a user voted on.

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// these one-to-many associations let us perform aggregated SQL functions between models.

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// model associations for Comment

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

module.exports = {
    User,
    Post,
    Vote,
    Comment
};