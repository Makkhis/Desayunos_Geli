const UserModel = require("../../models/User.js");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(status.BAD_REQUEST)
        .json({ error: "Todos los campos son obligatorios." });
    }

    UserModel.create({ name, email, password });

    return res.json({
      mensaje: "Registered user",
      user: { name, email, password },
    });
  } catch (exception) {
    return exception.message;
  }
};

const deleteUser = async (req, res) => {
  try{
      const { email } = req.params;
      const { name, phone_number, password, status } = req.body;

      const user = await UserModel.findOne({ where: {email}});
      if(!user){
          return res.status(StatusCodes.NOT_FOUND).json({ error: "User cannot be found "});
      }

      await user.destroy();
      return res.status(StatusCodes.OK).json({ message: "User deleted correctly ", user});
      
  } catch{
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }


}

const readUser = async (req, res) => {
  try{
      const { email } = req.params;
      const user = await UserModel.findOne({ where: {email}});

      if(!user){
          return res.status(StatusCodes.NOT_FOUND).json({ error: "User cannot be found "});
      }

      
      return res.status(StatusCodes.OK).json({ user });
      
  } catch{
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }


}


const updateUser = async (req, res) => {
  try{
      const { email } = req.params;
      const { name,newEmail, phone_number, password, status } = req.body;

      const user = await UserModel.findOne({ where: { email }});
      if(!user){
          return res.status(StatusCodes.NOT_FOUND).json({ error: "User cannot be found"});     
      }

      if(name) user.name = name;
      if(newEmail) user.email = newEmail;
      if(phone_number) user.phone_number = phone_number;
      if(password) user.password = password;
      if(status) user.status = status;


      await user.save();

      return res.status(StatusCodes.OK).json({ message: "User updated correctly ", user})

  } catch {

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });

  }
}

module.exports = { register, deleteUser, updateUser, readUser };