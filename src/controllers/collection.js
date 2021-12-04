const { collection, literatur, user } = require("../../models");

exports.addCollection = async (req, res) => {
  try {
    const { ...data } = req.body;
    const { literaturId } = req.body;
    const getCollection = await collection.findAll({
      where: {
        userId: req.user.id,
      },
    });
    const exist = getCollection.find(
      (item) => literaturId == item.literaturId
    );
    if (!exist) {
      const response = await collection.create({
        ...data,
        userId: req.user.id,
      });
      res.send({
        status: "success",
        message: "successfull add literatur to bookmark",
        data: response,
      });
    } else {
      res.status(400).send({
        status: "failed",
        message: "already have this collection",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.getCollection = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await collection.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "status",
              "picture",
              "password",
            ],
          },
        },
        {
          model: literatur,
          as: "literatur",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      collection: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.getDetailCollection = async (req, res) => {
  try {
    const id = req.user.id;
    const literaturId = req.params.id;
    const data = await collection.findAll({
      where: {
        userId: id,
        literaturId: literaturId,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "status",
              "picture",
              "password",
            ],
          },
        },
        {
          model: literatur,
          as: "literatur",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      collection: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await collection.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "collection deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};
