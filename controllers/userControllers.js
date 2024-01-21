const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
    async getUsers(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriendToUser(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriendFromUser(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    }
}