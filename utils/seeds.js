const connection = require("../config/connection");
const { Thought, User } = require("../models");

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

    try {
        const users = [{
            username: "ColinL",
            email: "colin@gmail.com"
        },
        {
            username: "PeterB",
            email: "peter@hotmial.com"
        },
        {
            username: "LucyK",
            email: "lucy@icloud.com"
        },
        {
            username: "MollyY",
            email: "molly@office.com"
        }];

        const thoughts = [{
            thoughtText: "I want to see a movie",
            username: ""
        },
        {
            thoughtText: "I can fly",
            username: ""
        },
        {
            thoughtText: "I can swim",
            username: ""
        },
        {
            thoughtText: "I want to go on a road trip",
            username: ""
        }]

        for (let i = 0; i < thoughts.length; i++) {
            const userIndex = Math.floor(Math.random() * users.length);
            thoughts[i].username = users[userIndex].username
        };

        console.log(thoughts)

        await User.insertMany(users)
        await Thought.insertMany(thoughts)

        console.log('user data created sucessfully')
    } catch (err) {
        console.log(err)
    }
    process.exit();
})