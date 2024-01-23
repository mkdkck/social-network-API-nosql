const connection = require("../config/connection");
const { Thought, User, Reaction } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");
    // Delete the collections if they exist
    let userCheck = await connection.db
        .listCollections({ name: "users" })
        .toArray();
    if (userCheck.length) {
        await connection.dropCollection("users");
    }

    let thoughtsCheck = await connection.db
        .listCollections({ name: "thoughts" })
        .toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection("thoughts");
    }

    let reactionsCheck = await connection.db
        .listCollections({ name: "reactions" })
        .toArray();
    if (reactionsCheck.length) {
        await connection.dropCollection("reactions");
    }


    try {
        // set base data
        const users = [{
            username: "ColinL",
            email: "colin@gmail.com",
            thoughts: [],
            friends: []
        },
        {
            username: "PeterB",
            email: "peter@hotmial.com",
            thoughts: [],
            friends: []
        },
        {
            username: "LucyK",
            email: "lucy@icloud.com",
            thoughts: [],
            friends: []
        },
        {
            username: "MollyY",
            email: "molly@office.com",
            thoughts: [],
            friends: []
        }];

        const thoughts = [{
            thoughtText: "I want to see a movie",
            username: "",
            reactions: []
        },
        {
            thoughtText: "I can fly",
            username: "",
            reactions: []
        },
        {
            thoughtText: "I can swim",
            username: "",
            reactions: []
        },
        {
            thoughtText: "I want to go on a road trip",
            username: "",
            reactions: []
        }]

        const reactions = [{
            reactionBody: "Great Thinking",
            username: ""
        },
        {
            reactionBody: "No way!",
            username: ""
        },
        {
            reactionBody: "I want to join too",
            username: ""
        },
        {
            reactionBody: "Nice try",
            username: ""
        },
        ]

        // create random user for thoughts
        for (let i = 0; i < thoughts.length; i++) {
            const userIndex = Math.floor(Math.random() * users.length);
            thoughts[i].username = users[userIndex].username
        };

        //assign random reactions to thoughts
        //to get random reactions, maximum 4 in a thought
        function getRandomReactions() {
            const maxReactions = Math.floor(Math.random() * 5);
            const randomReactions = [];

            for (let i = 0; i < maxReactions; i++) {
                //creating random indexs for both user and reaction
                const userIndex = Math.floor(Math.random() * users.length);
                const reactionIndex = Math.floor(Math.random() * reactions.length);
                console.log("userIndex", userIndex)
                console.log("reactionIndex", reactionIndex)

                //when picking a random reaction, apply a random username init
                const randomReaction = {
                    reactionBody: reactions[reactionIndex].reactionBody,
                    username: users[userIndex].username
                };
                //create randomReaction array
                randomReactions.push(randomReaction);
            }

            return randomReactions;
        }
        //  assign reactions array to random thought
        thoughts.forEach(thought => {
            const randomReactions = getRandomReactions();
            console.log(randomReactions)

            thought.reactions = randomReactions;
        });

        //seed thoughts table
        const insertedThoughts = await Thought.insertMany(thoughts);

        //assign thoughts to related users
        users.forEach(user => {
            insertedThoughts.forEach(thought => {
                if (user.username === thought.username) {
                    user.thoughts.push(thought._id);
                }
            });
        });

        //seed users table
        const userdb = await User.insertMany(users)

        //assign random friends to users
        //to get random friends, maximum 3 in a user,not the userself.
        const userId = userdb.map((user) => { return user._id });
        //in order to create random results, using toSpliced to get rid of unwanted numbers, the remaining array is a random needed.
        //first loop(with i) to loop over all users, nested loop (with j) to get random friend array.
        for (let i = 0; i < userId.length; i++) {
            const maxFriends = Math.floor(Math.random() * 4);
            const exclNum = userId.length - maxFriends;
            let randomFriends = userId;

            nonOwnUser = userId.toSpliced(i, 1)
            for (let j = 0; j < exclNum; j++) {
                const friendqty = 3 - j
                const randomIndex = Math.floor(Math.random() * friendqty)
                randomFriends = randomFriends.toSpliced(randomIndex, 1)
            }

            //send to userDB and update
            await User.findOneAndUpdate(
                { _id: userdb[i]._id },
                { $set: { friends: randomFriends } },
                { runValidators: true, new: true }
            )
        }

        console.log('user data created sucessfully')
    } catch (err) {
        console.log(err)
    }
    process.exit();
})