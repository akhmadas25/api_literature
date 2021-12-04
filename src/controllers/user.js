const { user } = require("../../models");

exports.updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { ...data } = req.body;
    await user.update(
      {
        ...data,
        picture: req.files.picture[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send({
      message: "profile successfully updated!",
    });
  } catch (error) {
    res.send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await user.findAll({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    res.send({
      status: "success",
      profile: data,
    });
  } catch (error) {
    console.log(error);
  }
};
