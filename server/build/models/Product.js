"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: String,
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Users' },
}, {
    collection: 'Products',
    timestamps: true,
});
exports.Product = mongoose_1.default.model('Products', ProductSchema);
