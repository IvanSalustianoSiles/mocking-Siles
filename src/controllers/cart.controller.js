import config from "../config.js";
import { CartFSService, CartMDBService } from "../services/index.js";
import { errorDictionary } from "../config.js";
import CustomError from "../services/custom.error.class.js";

class CartManagerClass {
  
  constructor(service) {
    this.carts = [];
    this.service = service;
  };
  createCart = async () => {
    try {
      return await this.service.createCart();
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  addProduct = async (pid, cid) => {
    try {
      return await this.service.addProduct(pid, cid);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  deleteProduct = async (pid, cid) => {
    try {
      return await this.service.deleteProduct(pid, cid);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  getCartById = async (cid) => {
    try {
      return await this.service.getCartById(cid);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  updateCartById = async (cid, preUpdatedData) => {
    try {
      return await this.service.updateCartById(cid, preUpdatedData);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  updateQuantity = async (pid, cid, objectQuantity) => {
    try {
      return await this.service.updateQuantity(pid, cid, objectQuantity);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  deleteAllProducts = async (cid) => {
    try {
      return await this.service.deleteAllProducts(cid);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  getProductsOfACart = async (cid) => {
    try {
      return await this.service.getProductsOfACart(cid);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  getAllCarts = async () => {
    try {
      return await this.service.getAllCarts();
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
};

const service = config.DATA_SOURCE == "MDB" 
? CartMDBService
: CartFSService;

const CartManager = new CartManagerClass(service);

export default CartManager;
