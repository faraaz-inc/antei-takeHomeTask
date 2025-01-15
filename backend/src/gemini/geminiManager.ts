import { GenerativeModel, GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { GeminiOutput, schema } from "./types";
import fs from "fs";

export class GeminiManager {
    private static instance: GeminiManager;
    private genAI: GoogleGenerativeAI;
    private model: GenerativeModel;

    //Singleton pattern
    private constructor() {

        if(!process.env.GEMINI_API_KEY)
            throw new Error("GEMINI_API_KEY is not set");
        
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({
            model: "models/gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        })
    }

    public static getInstance(): GeminiManager {
        if(!GeminiManager.instance) {
            GeminiManager.instance = new GeminiManager();
        }
        return GeminiManager.instance;
    }

    public async generateContent(path: string): Promise<GeminiOutput> {
        try {
            //text prompt for gemini
            const prompt = 'Give details about this resume according to the provided schema. Include all the fields mentioned in the schema. If you cant figure out some details, leave that field as blank, but make sure to include all the fields in the arrays and objects';
            
            const data = {
                inlineData: {
                    data: Buffer.from(fs.readFileSync(path)).toString('base64'),
                    mimeType: "application/pdf"
                }
            }
            //get gemini's response
            const result = await this.model.generateContent([data, prompt]);
            
            //parse the JSON string to object and return
            const resp: GeminiOutput = JSON.parse(result.response.text());
            return resp;
        }
        catch(err) {
            console.error(err);
            throw new Error("Error in generating content");
        }
    }
}