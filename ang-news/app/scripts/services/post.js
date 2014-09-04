/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc service
     * @name angNewsApp.post
     * @description
     * # post
     * Factory in the angNewsApp.
     */
    app.factory("Post", function ($firebase, FIREBASE_URL, User) {
        var reference, posts, Post, userRef;

        reference = new Firebase(FIREBASE_URL + "posts");
        posts = $firebase(reference).$asArray();
        userRef = new Firebase(FIREBASE_URL + "users");

        Post = {
            all: posts,
            create: function (post) {
                var user;

                if (User.signedIn()) {
                    user = User.getCurrent();

                    post.owner = user.username;

                    return posts.$add(post).then(function (ref) {
                        var postId = ref.name();

                        /*jshint camelcase: false */
                        userRef.child(user.md5_hash).child("posts").child(postId).set(postId);
                        /*jshint camelcase: true */

                        return postId;
                    });
                }
            },
            find: function (postId) {
                return $firebase(reference.child(postId)).$asObject();
            },
            remove: function (postId) {
                var userPost, user;

                if (User.signedIn()) {
                    userPost = $firebase(userRef.child("posts")).$asObject();
                    user = User.getCurrent();

                    userPost.$loaded().then(function () {
                        posts.$remove(postId).then(function () {
                            /*jshint camelcase: false */
                            userRef.child(user.md5_hash).child("posts").child(postId.$id).remove();
                            /*jshint camelcase: true */
                        });
                    });
                }
            },
            addComment: function (postId, comment) {
                if (User.signedIn()) {
                    var user = User.getCurrent(), postComments;

                    postComments = $firebase(reference.child(postId).child("comments"));
                    comment.username = user.username;
                    comment.postId = postId;

                    postComments.$push(comment).then(function (data) {
                        userRef.child("comments").child(data.name()).set({
                            id: data.name(),
                            postId: postId
                        });
                    });
                }
            }
        };

        return Post;
    });
}(news));

