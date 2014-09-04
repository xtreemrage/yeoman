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
        var reference, posts, Post;

        reference = new Firebase(FIREBASE_URL + "posts");
        posts = $firebase(reference).$asArray();

        Post = {
            all: posts,
            create: function (post) {
                var user;

                if (User.signedIn()) {
                    user = User.getCurrent();

                    post.owner = user.username;

                    return posts.$add(post).then(function () {
                        var postId = reference.name();

                        user.$child("posts").$child(postId).$set(postId);

                        return postId;
                    });
                }
            },
            find: function (postId) {
                return $firebase(reference.child(postId)).$asObject();
            },
            remove: function (postId) {
                var post;

                if (User.signedIn()) {
                    post = Post.find(postId);

                    post.$on("loaded", function () {
                        var user = User.findByUsername(post.owner);

                        posts.$remove(postId).then(function () {
                            user.$child("posts").$remove(postId);
                        });
                    });
                }
            }
        };

        return Post;
    });
}(news));

