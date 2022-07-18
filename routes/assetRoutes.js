const controllers = require("../controllers");
const router = require("express").Router();

const utils = require("../utils/utils");

router.post(
  "/add-item",
  utils.authenticateToken,
  controllers.asset.post.addNewItem
);

router.post(
  "/get-items",
  utils.authenticateToken,
  controllers.asset.post.getAllItems
);

router.post(
  "/change-item-status",
  utils.authenticateToken,
  controllers.asset.post.changeItemStatus
);

router.post(
  "/delete-item",
  utils.authenticateToken,
  controllers.asset.post.deleteItem
);

router.get("/get-items-global", controllers.asset.post.getAllItemsGlobal);

router.get(
  "/get-item-count",
  utils.authenticateToken,
  controllers.asset.post.getTotalItemCount
);

module.exports = router;
