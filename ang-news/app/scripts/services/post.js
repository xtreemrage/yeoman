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
                    user = User.findByUsername(User.getCurrent());

                    post.owner = user.$id;

                    return posts.$add(post).then(function (ref) {
                        var postId = ref.name();

                        userRef.child(user.$id).child("posts").child(postId).set(postId);

                        return postId;
                    });
                }
            },
            find: function (postId) {
                return $firebase(reference.child(postId)).$asObject();
            },
            remove: function (postIndex, postId) {
                var userPost, user, parsedIndex;

                if (User.signedIn()) {
                    userPost = $firebase(userRef.child("posts")).$asObject();
                    user = User.getCurrent();
                    parsedIndex = parseInt(postIndex, 10);

                    userPost.$loaded().then(function () {
                        posts.$remove(parsedIndex).then(function () {
                            userRef.child(user.$id).child("posts").child(postId).remove();
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
            },
            deleteComment: function (post, comment, commentId) {
                if (User.signedIn()) {
                    var postComments;

                    postComments = $firebase(reference.child(post.$id).child("comments"));

                    postComments.$remove(commentId).then(function () {
                        userRef.child("comments").child(commentId).remove();
                    });
                }
            }
        };

        return Post;
    });
}(news));

