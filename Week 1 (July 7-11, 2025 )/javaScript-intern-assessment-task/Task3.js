function fetchUserProfile(userId) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (userId > 0) {
                resolve({ id: userId, name: "User " + userId, email: "user" + userId + "@example.com" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, Math.random() * 1000 + 500);
    });
}

function fetchUserPosts(userId) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([
                { id: 1, title: "Post 1", likes: 10 },
                { id: 2, title: "Post 2", likes: 25 }
            ]);
        }, Math.random() * 1000 + 300);
    });
}

function fetchUserFriends(userId) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(["Friend 1", "Friend 2", "Friend 3"]);
        }, Math.random() * 1000 + 200);
    });
}

async function getUserData(userId) {
    try {
        var profile = await fetchUserProfile(userId);
        return profile;
    } catch (err) {
        console.log("Error:", err.message);
    }
}

async function getManyUsers(ids) {
    var results = [];
    for (var i = 0; i < ids.length; i++) {
        var user = await getUserData(ids[i]);
        results.push(user);
    }
    return results;
}

async function getCompleteUserProfile(userId) {
    function getData(promise) {
        return new Promise((resolve, reject) => {
            var timer = setTimeout(() => {
                reject(new Error("Request took too long"));
            }, 2000);
            promise.then((res) => {
                clearTimeout(timer);
                resolve(res);
            }).catch((err) => {
                clearTimeout(timer);
                reject(err);
            });
        });
    }

    try {
        var profile = await getData(fetchUserProfile(userId));
        var posts = await getData(fetchUserPosts(userId));
        var friends = await getData(fetchUserFriends(userId));

        var totalLikes = 0;
        for (var i = 0; i < posts.length; i++) {
            totalLikes += posts[i].likes;
        }

        return {
            profile: profile,
            posts: posts,
            friends: friends,
            totalLikes: totalLikes
        };
    } catch (err) {
        console.log("Error:", err.message);
    }
}

async function getAllUsersFull(ids) {
    var results = [];
    for (var i = 0; i < ids.length; i++) {
        var user = await getCompleteUserProfile(ids[i]);
        results.push(user);
    }

    results.sort(function (a, b) {
        return b.totalLikes - a.totalLikes;
    });

    return results;
}

getUserData(1).then((data) => {
    console.log("Single Profile:", data);
});;

getManyUsers([1, 2, 3]).then((data) => {
    console.log("Multiple Profiles:", data);
});

getCompleteUserProfile(1).then((data) => {
    console.log("Complete Profile of User 1:", data);
});

getAllUsersFull([1, 2, 3]).then((data) => {
    console.log("All Users Sorted by Likes:", data);
});
