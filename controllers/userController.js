let users = [];
let idCounter = 0;

const createUser = (req, res,next) => 
    {
    console.log("testing");
    const { name, email, phone } = req.body;
    const newUser = {
        id: idCounter++,
        name,
        email,
        phone
    };
    users.push(newUser);
    res.status(200).json(newUser);
};
//get all
const getUsers = (req, res) => {
    res.status(200).json(users);
}

// get users by id
const getUsersById = (req, res) => {
    const user = users.find(u => u.id == req.param.id)
}
export {createUser,getUsers,getUsersById}