import config from "../config.js";
import { UserMDBService, UserFSService } from "../services/index.js";
import { errorDictionary } from "../config.js";
import CustomError from "../services/custom.error.class.js";

class UserDTOCLass {
  constructor() {
  };
  removeSensitive = async (user) => {
    try {
      const { password, email, phoneNumber, ...filteredUser } = user;
      return filteredUser;
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `Error de ejecución DTO; [${error}]`);
    }
  };
};

const DTO = new UserDTOCLass();

// Clase para controlar los métodos referentes a los usuarios.
class UserManagerClass {
  constructor(service) {
    this.service = service;
  };
  isRegistered = async (focusRoute, returnObject, req, res) => {
    try {
      return await this.service.isRegistered(focusRoute, returnObject, req, res);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  isRegisteredwToken = async (focusRoute, returnObject, req, res) => {
    try {
      return await this.service.isRegisteredwToken(focusRoute, returnObject, req, res);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  }
  findUser = async (emailValue) => {
    try {
      return await this.service.findUser(emailValue);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  findFilteredUser = async (emailValue) => {
    try {
      const foundUser = await this.service.findUser(emailValue);
      const filteredUser = await DTO.removeSensitive(foundUser);
      return filteredUser;
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  addUser = async (user) => {
    try {
      return await this.service.addUser(user);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  updateUser = async (filter, update, options) => {
    try {
      return await this.service.updateUser(filter, update, options);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  deleteUser = async (filter) => {
    try {
      return await this.service.deleteUser(filter);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  paginateUsers = async (...filters) => {
    try {
      return await this.service.paginateUsers(...filters);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
};

// Métodos a utilizar:
// isRegistered (focusRoute, returnObject, req, res)
// findUser (emailValue)
// addUser (user)
// updateUser (filter, update, options)
// deleteUser (filter)
// paginateUsers (...filters)


const service = config.DATA_SOURCE == "MDB" 
? UserMDBService
: UserFSService;

const UserManager = new UserManagerClass(service);

export default UserManager;

