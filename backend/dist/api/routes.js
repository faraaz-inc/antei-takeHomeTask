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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const geminiManager_1 = require("../gemini/geminiManager");
const storageManager_1 = require("../store/storageManager");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/upload-cv", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).send("No file uploaded");
            return;
        }
        //get file path
        const filePath = req.file.path;
        //get gemini's response
        const response = yield geminiManager_1.GeminiManager.getInstance().generateContent(filePath);
        //push the current response to storage
        storageManager_1.StorageManager.getInstance().addCandidate(response);
        //return the response
        res.json(response);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error in processing the file");
    }
}));
router.get("/candidates", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get all candidates from storage
    const candidates = storageManager_1.StorageManager.getInstance().getCandidates();
    res.json(candidates);
}));
exports.default = router;
