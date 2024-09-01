import config from "../config.js";
import { generateDateAndHour, generateRandomCode, TicketMDBService, TicketFSService } from "../services/index.js";
import { errorDictionary } from "../config.js";
import CustomError from "../services/custom.error.class.js";

class TicketDTO {
  constructor() {
  };
  addAutoGenerate = async (ticketData) => {
    for (let i = 0; i <= Object.values(ticketData).length; i++) {
      if (!ticketData.hasOwnProperty("code")) ticketData.code = generateRandomCode();
      if (!ticketData.hasOwnProperty("purchase_datetime")) ticketData.purchase_datetime = generateDateAndHour();
    };
    return ticketData;
  };
};
const DTO = new TicketDTO();

class TicketManagerClass {

  constructor(service) {
    this.service = service
  };
  createTicket = async (ticketData) => {
    try {
      const normalizedData = TicketDTO.addAutoGenerate(ticketData);
      return await this.service.createTicket(normalizedData);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    }
  };
  getTicket = async (tid) => {
    try {
      return await this.service.getTicket(tid);
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    };
  };
  getAllTickets = async () => {
    try {
      return await this.service.getAllTickets();
    } catch (error) {
      throw new CustomError(errorDictionary.UNHANDLED_ERROR, `No fue posible conectarse al servicio; [${error}]`);
    };
  };
};

const service = config.DATA_SOURCE == "MDB" 
? TicketMDBService
: TicketFSService;

const TicketManager = new TicketManagerClass(service);

export default TicketManager;
