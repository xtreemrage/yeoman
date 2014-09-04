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

                        userRef.child("posts").child(postId).set(postId);

                        return postId;
                    });
                }
            },
            find: function (postId) {
                return $firebase(reference.child(postId)).$asObject();
            },
            remove: function (postId) {
                var userPost;

                if (User.signedIn()) {
                    userPost = $firebase(userRef.child("posts")).$asObject();

                    userPost.$loaded().then(function () {
                        posts.$remove(postId).then(function () {
                            userRef.child("posts").child(postId.$id).remove();
                        });
                    });
                }
            },
            addComment: function (postId, comment) {
                if (User.signedIn()) {
                    var user = User.getCurrent();

                    comment.username = user.username;
                    comment.postId = postId;

                    posts.$child(postId).$child("comments").$add(comment).then(function (reference) {
                        User.$child("comments").$child(reference.name()).$set({
                            id: reference.name,
                            postId: postId
                        });
                    });
                }
            }
        };

        return Post;
    });
}(news));

