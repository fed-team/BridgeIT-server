import { Role } from '@models'

const index = async (req, res) => {
    const roles = await Role.find({});
    res.status(200).json(roles);
};

const add = async (req, res) => {
    const newRole = new Role(req.value.body);
    const role = await newRole.save();
    res.status(201).json(role);
};

const get = async (req, res) => {
    const { id } = req.value.params;
    const role = await Role.findById(id);
    res.status(200).json(role);
};

const replace = async (req, res) => {
    const { id } = req.value.params;
    const newRole = req.value.body;
    await Role.findByIdAndUpdate(id, newRole);
    res.status(200).json({ success: true });
};

const update = async (req, res) => {
    const { id } = req.value.params;
    const newRole = req.value.body;
    await Role.findByIdAndUpdate(id, newRole);
    res.status(200).json({ success: true });
};

const remove = async (req, res) => {
    const { id } = req.value.params;
    await Role.findByIdAndRemove(id);
    res.status(202).json({ success: true });
};

const switchActivity = async (req, res) => {
    const { id } = req.value.params;
    const { desiredAction } = req.params;

    await Role.findByIdAndUpdate(id, {isActive: desiredAction === "activate"});
    res.status(200).json( {success: true} );
};


export default { index, get, update, add, replace, remove, switchActivity };