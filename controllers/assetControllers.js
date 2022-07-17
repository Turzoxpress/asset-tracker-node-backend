const mongoose = require("mongoose");

const dbConn = require("../db/database");
const userModel = require("../models/userModel");
const assetModel = require("../models/assetModel");

const bcrypt = require("bcryptjs");

const utils = require("../utils/utils");

module.exports = {
  get: {},
  post: {
    addNewItem: async (req, res, next) => {
      const name = req.body.name;
      const description = req.body.description;

      const owner_id = req.user._id;
      const owner_name = req.user.name;

      const borrower_name = req.body.borrower_name;
      const status = "borrowed";

      const created_at = utils.getCurrentDate();
      const modified_at = utils.getCurrentDate();

      assetModel
        .create({
          name,
          description,
          owner_id,
          owner_name,
          borrower_name,
          status,
          created_at,
          modified_at,
        })
        .then((result) => {
          return res.json({
            status: 200,
            message: "Item added successfully!",
            data: result,
          });
        })
        .catch((err) => {
          return res.json({
            status: 500,
            message: "Error" + err,
          });
        });
    },

    getAllItems: async (req, res, next) => {
      const id = req.user._id;
      const status = req.body.status;
      assetModel
        // .find({ status: { $ne: "deleted" } })
        .find({ owner_id: mongoose.Types.ObjectId(id), status: status })
        .then((result) => {
          return res.json({
            status: 200,
            count: result.length,
            data: result,
          });
        })
        .catch((err) => {
          return res.json({
            status: 500,
            message: "Erro" + err,
          });
        });
    },

    changeItemStatus: async (req, res, next) => {
      const id = req.user._id;

      const item_id = req.body.item_id;
      const status = req.body.status;
      assetModel
        // .find({ status: { $ne: "deleted" } })
        //.find({ owner_id: mongoose.Types.ObjectId(id), status: status })
        .updateOne(
          {
            _id: mongoose.Types.ObjectId(item_id),
            owner_id: mongoose.Types.ObjectId(id),
          },
          {
            $set: {
              status: status,
            },
          }
        )
        .then((result) => {
          return res.json({
            status: 200,
            message: "Item status changed succeessfully",
          });
        })
        .catch((err) => {
          return res.json({
            status: 500,
            message: "Erro" + err,
          });
        });
    },

    deleteItem: async (req, res, next) => {
      const owner_id = req.user._id;
      const item_id = req.body.item_id;
      assetModel
        // .find({ status: { $ne: "deleted" } })
        //.find({ owner_id: mongoose.Types.ObjectId(id), status: status })
        //.updateOne({owner_id: mongoose.Types.ObjectId(id)},
        .deleteOne({
          _id: mongoose.Types.ObjectId(item_id),
          owner_id: owner_id,
        })
        .then((result) => {
          return res.json({
            status: 200,
            message: "Item deleted!",
          });
        })
        .catch((err) => {
          return res.json({
            status: 500,
            message: "Erro" + err,
          });
        });
    },

    getAllItemsGlobal: async (req, res, next) => {
      // const id = req.user._id;
      //const status = req.body.status;
      assetModel
        // .find({ status: { $ne: "deleted" } })
        //.find({ owner_id: mongoose.Types.ObjectId(id), status: status })
        .find({ status: "borrowed" })
        .then((result) => {
          return res.json({
            status: 200,
            count: result.length,
            data: result,
          });
        })
        .catch((err) => {
          return res.json({
            status: 500,
            message: "Erro" + err,
          });
        });
    },

    // getTotalTaskCount: async (req, res, next) => {
    //   toDoModel
    //     .find()
    //     .then((result) => {
    //       //---------"created", "working", "completed", "deleted"
    //       let created = 0;
    //       let working = 0;
    //       let completed = 0;
    //       let deleted = 0;
    //       for (let i = 0; i < result.length; i++) {
    //         if (result[i].status === "created") {
    //           created += 1;
    //         } else if (result[i].status === "working") {
    //           working += 1;
    //         } else if (result[i].status === "completed") {
    //           completed += 1;
    //         } else if (result[i].status === "deleted") {
    //           deleted += 1;
    //         }
    //       }

    //       let total = created + working + completed + deleted;

    //       return res.json({
    //         status: 200,
    //         data: {
    //           total: total,
    //           created: created,
    //           working: working,
    //           completed: completed,
    //           deleted: deleted,
    //         },
    //       });
    //     })
    //     .catch((err) => {
    //       return res.json({
    //         status: 500,
    //         message: "Error" + err,
    //       });
    //     });
    // },

    // getAllTasks: async (req, res, next) => {
    //   toDoModel
    //     .find({ status: { $ne: "deleted" } })
    //     .then((result) => {
    //       return res.json({
    //         status: 200,
    //         count: result.length,
    //         data: result,
    //       });
    //     })
    //     .catch((err) => {
    //       return res.json({
    //         status: 500,
    //         message: "Erro" + err,
    //       });
    //     });
    // },
    // getAllTasksStatus: async (req, res, next) => {
    //   const status = req.params.status;
    //   // if (status === "deleted") {
    //   //   return res.json({
    //   //     status: 200,
    //   //     message:
    //   //       "Sorry! You do not have permission to view this type of data!",
    //   //   });
    //   // }

    //   const options = {
    //     // sort in descending (-1) order by rating
    //     //sort : { rating: -1 },
    //     // omit the first two documents
    //     sort: { modified_at: -1 },
    //     // skip: limit * pageNo,
    //     // limit: limit,
    //   };

    //   toDoModel
    //     .find({ status: status }, null, options)
    //     // .find()
    //     .then((result) => {
    //       return res.json({
    //         status: 200,
    //         count: result.length,
    //         data: result,
    //       });
    //     })
    //     .catch((err) => {
    //       return res.json({
    //         status: 500,
    //         message: "Erro" + err,
    //       });
    //     });
    // },
    // changeTaskStatus: async (req, res, next) => {
    //   const id = req.body.id;
    //   const status = req.body.status;
    //   const modified_by = req.body.modified_by;

    //   toDoModel
    //     .updateOne(
    //       { _id: mongoose.Types.ObjectId(id) },
    //       {
    //         $set: {
    //           status: status,
    //           modified_by: modified_by,
    //           modified_at: utils.getCurrentDate(),
    //         },
    //       }
    //     )
    //     .then((result) => {
    //       return res.json({
    //         status: 200,
    //         message: "Task modified successfully!",
    //         data: result,
    //       });
    //     })
    //     .catch((err) => {
    //       return res.json({
    //         status: 500,
    //         message: "Erro" + err,
    //       });
    //     });
    // },

    // deleteTask: async (req, res, next) => {
    //   const id = req.body.id;
    //   const modified_by = req.body.modified_by;

    //   toDoModel
    //     .updateOne(
    //       { _id: mongoose.Types.ObjectId(id) },
    //       {
    //         $set: {
    //           status: "deleted",
    //           modified_by: modified_by,
    //         },
    //       }
    //     )
    //     .then((result) => {
    //       return res.json({
    //         status: 200,
    //         message: "Task deleted successfully!",
    //         data: result,
    //       });
    //     })
    //     .catch((err) => {
    //       return res.json({
    //         status: 500,
    //         message: "Erro" + err,
    //       });
    //     });

    //   //   toDoModel
    //   //     .deleteOne({ _id: mongoose.Types.ObjectId(id) })
    //   //     .then((result) => {
    //   //       return res.json({
    //   //         status: 200,
    //   //         message: "Deleted successfully!",
    //   //         data: result,
    //   //       });
    //   //     })
    //   //     .catch((err) => {
    //   //       return res.json({
    //   //         status: 500,
    //   //         message: "Erro" + err,
    //   //       });
    //   //     });
    // },
  },
};
