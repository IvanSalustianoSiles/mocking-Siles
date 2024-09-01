import { Router } from "express";
import { uploader } from "../services/index.js";
import { ProductManager } from "../controllers/index.js";
import { verifyMDBID, catchCall, handlePolicies, generateFakeProducts } from "../services/index.js";
import { errorDictionary } from "../config.js";
import CustomError from "../services/custom.error.class.js";

let toSendObject = {};
const router = Router();

// Routes

router.get("/", async (req, res) => {
  try {
    toSendObject = await ProductManager.getAllProducts(
      req.query.limit,
      req.query.page,
      req.query.query,
      req.query.sort,
      req.query.available,
      "/api/products"
    );
    if (!toSendObject) throw new CustomError(errorDictionary.GENERAL_FOUND_ERROR, "Productos");
    res.send(toSendObject);
  } catch (error) {
    throw new CustomError(errorDictionary.UNHANDLED_ERROR, `${error}`);
  }
});
router.get("/:pid", handlePolicies(["ADMIN"]), verifyMDBID(["pid"]), async (req, res) => {
  try {
      if (!req.params.pid) throw new CustomError(errorDictionary.FOUND_ID_ERROR, `${req.params.pid}`);
      toSendObject = await ProductManager.getProductById(req.params.pid);
      if (!toSendObject) throw new CustomError(errorDictionary.GENERAL_FOUND_ERROR, "Producto");
      res.status(200).send(toSendObject);
  } catch (error) {
    throw new CustomError(errorDictionary.UNHANDLED_ERROR, `${error}`);
  }
});
router.post("/", handlePolicies(["ADMIN"]), uploader.single("thumbnail"), async (req, res) => {
  try {
    toSendObject = await ProductManager.addProducts({
      ...req.body,
      thumbnail: req.file.filename,
      status: true,
    });
    if (!toSendObject) throw new CustomError(errorDictionary.ADD_DATA_ERROR, "productos");
    res.send(toSendObject);
    
  } catch (error) {
    throw new CustomError(errorDictionary.UNHANDLED_ERROR, `${error}`);
  }
});
router.put("/:pid", handlePolicies(["ADMIN"]), verifyMDBID(["pid"]), async (req, res) => {
  try {
    const { pid } = req.params;
    toSendObject = await ProductManager.updateProductById(pid, req.body);
    if (!toSendObject) throw new CustomError(errorDictionary.UPDATE_DATA_ERROR, `Producto`);
    res.send(toSendObject);
  } catch (error) {
    throw new CustomError(errorDictionary.UNHANDLED_ERROR, `${error}`);
  }
});
router.delete("/:pid", handlePolicies(["ADMIN"]), verifyMDBID(["pid"]), async (req, res) => {
  try {
    const { pid } = req.params;
    toSendObject = await ProductManager.deleteProductById(pid);
    if (!toSendObject) throw new CustomError(errorDictionary.DELETE_DATA_ERROR, `Producto`);
    res.send(toSendObject);
  } catch (error) {
    throw new CustomError(errorDictionary.UNHANDLED_ERROR, `${error}`);
  }
});
catchCall(router, "productos");

export default router;
