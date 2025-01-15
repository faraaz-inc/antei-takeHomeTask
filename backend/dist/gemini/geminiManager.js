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
exports.GeminiManager = void 0;
const generative_ai_1 = require("@google/generative-ai");
const types_1 = require("./types");
const fs_1 = __importDefault(require("fs"));
class GeminiManager {
    //Singleton pattern
    constructor() {
        if (!process.env.GEMINI_API_KEY)
            throw new Error("GEMINI_API_KEY is not set");
        this.genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({
            model: "models/gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: types_1.schema
            }
        });
    }
    static getInstance() {
        if (!GeminiManager.instance)
            GeminiManager.instance = new GeminiManager();
        return GeminiManager.instance;
    }
    generateContent(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //text prompt for gemini
                const prompt = 'Give details about this resume according to the provided schema. Include all the fields mentioned in the schema. If you cant figure out some details, leave that field as blank, but make sure to include all the fields in the arrays and objects';
                const data = {
                    inlineData: {
                        data: Buffer.from(fs_1.default.readFileSync(path)).toString('base64'),
                        mimeType: "application/pdf"
                    }
                };
                //get gemini's response
                const result = yield this.model.generateContent([data, prompt]);
                //parse the JSON string to object and return
                const resp = JSON.parse(result.response.text());
                return resp;
            }
            catch (err) {
                console.error(err);
                throw new Error("Error in generating content");
            }
        });
    }
}
exports.GeminiManager = GeminiManager;
