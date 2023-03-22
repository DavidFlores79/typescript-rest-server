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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getusers = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const getusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.default.findAll();
    res.json({
        msg: 'getusers',
        users
    });
});
exports.getusers = getusers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_model_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: `Usuario con id ${id} no encontrado.`
            });
        }
        res.json({
            ok: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const userExists = yield users_model_1.default.findOne({
            where: { email: body.email }
        });
        if (userExists) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con email ${body.email} ya existe en la BD.`
            });
        }
        const user = yield users_model_1.default.create(body);
        // await user.save();
        res.json({
            ok: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield users_model_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con id ${id} no existe en la BD.`
            });
        }
        yield user.update(body);
        res.json({
            ok: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_model_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con id ${id} no existe en la BD.`
            });
        }
        // await user.destroy();
        yield user.update({ status: false });
        res.json({
            ok: true,
            msg: `Usuario con id ${id} ha sido eliminado.`
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map