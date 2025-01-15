"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./api/routes"));
const PORT = 3000;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
