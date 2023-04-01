"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashPassword(plainPassword) {
    let saltRounds = Number(process.env.SALT_ROUNDS);
    try {
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        const hash = bcrypt_1.default.hashSync(plainPassword, salt);
        return hash;
    }
    catch (error) {
        console.error(error);
    }
}
exports.hashPassword = hashPassword;
function verifyPassword(enteredPassword, hashedPassword) {
    try {
        const result = bcrypt_1.default.compareSync(enteredPassword, hashedPassword);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}
exports.verifyPassword = verifyPassword;
