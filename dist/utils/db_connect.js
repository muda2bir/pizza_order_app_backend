"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_connect = void 0;
const index_1 = require("../sequelize/index");
function db_connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield index_1.sequelize.authenticate();
            console.log("Connected to the database successfully!");
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.db_connect = db_connect;
