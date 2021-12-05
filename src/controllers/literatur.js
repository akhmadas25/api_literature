const { literatur, user } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.addLiteratur = async (req, res) => {
  try {
    const { ...data } = req.body;

    const getName = await literatur.findAll();
    const exist = getName.find((item) => req.body.title === item.title);
    if (exist) {
      res.send({
        status: "failed",
        message: "literatur already exist",
      });
    } else {
      const newLiteratur = await literatur.create({
        ...data,
        userId: req.user.id,
        attach: req.files.attach[0].filename,
      });
      res.send({
        status: "success",
        message: "add literatur was successfull!",
        data: newLiteratur,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.getLiteratur = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await literatur.findAll({
      where: {
        id,
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
              "password",
              "picture",
              "address",
            ],
          },
        },
      ],

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.getLiteraturs = async (req, res) => {
  try {
    const data = await literatur.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "status",
              "password",
              "picture",
              "address",
            ],
          },
        },
      ],
      order: [["id", "DESC"]],

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.searchLiteraturs = async (req, res) => {
  try {
    const { title, year } = req.body;
    const data = await literatur.findAll({
      where: {
        title: {
          [Op.substring]: `%${title}%`,
        },
        publication_date: {
          [Op.substring]: `%${year}`,
        },
        status: "verified",
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
              "password",
              "picture",
              "address",
            ],
          },
        },
      ],

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      literaturs: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.getMyLiteratur = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await literatur.findAll({
      where: {
        userId: id,
        status: "verified",
      },

      attributes: {
        exclude: ["createdAt", "updatedAt", "status", "password"],
      },
    });

    res.send({
      status: "success",
      literatur: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await literatur.update(
      {
        status: status,
      },
      {
        where: {
          id,
        },
      }
    );

    res.send({
      status: "success",
      message: status,
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
    });
    console.log(error);
  }
};

exports.editLiteratur = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    await literatur.update(
      {
        ...data,
        attach: req.files.attach[0].filename,
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
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

exports.deleteLiteratur = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await literatur.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "literatur deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};
