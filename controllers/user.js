import {
    User
} from '../models'

const index = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

const add = async (req, res) => {
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
};

const get = async (req, res) => {
    const {
        id
    } = req.value.params;
    const user = await User.findById(id);
    res.status(200).json(user);
};

const replace = async (req, res) => {
    const {
        id
    } = req.value.params;
    const newUser = req.value.body;
    await User.findByIdAndUpdate(id, newUser);
    res.status(200).json({
        success: true
    });
};

const update = async (req, res) => {
    const {
        id
    } = req.value.params;
    const newUser = req.value.body;
    await User.findByIdAndUpdate(id, newUser);
    res.status(200).json({
        success: true
    });
};

const switchActivity = async (req, res) => {
    const {
        id
    } = req.value.params;
    const {
        desiredAction
    } = req.params;

    await User.findByIdAndUpdate(id, {
        isActive: desiredAction === "activate"
    });
    res.status(200).json({
        success: true
    });
};
const deleteUser = async (req, res) => {
    const {
        id
    } = req.params;

    await User.deleteOne({
        _id: id,
    });
    res.status(200).json({
        success: true
    });
};

export default {
    index,
    get,
    update,
    add,
    replace,
    switchActivity,
    deleteUser
};