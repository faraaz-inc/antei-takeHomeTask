import { GeminiOutput } from "../gemini/types";

//Singleton class to store the candidates
//can use a database here
export class StorageManager {
    public static instance: StorageManager;
    private candidates: GeminiOutput[];

    //Singleton pattern
    private constructor() {
        this.candidates = [];
    }

    public static getInstance(): StorageManager {
        if(!StorageManager.instance) {
            StorageManager.instance = new StorageManager();
        }
        return StorageManager.instance;
    }

    //method to add a new candidate
    public addCandidate(candidate: GeminiOutput) {
        this.candidates.push(candidate);
    }
    //method to get all candidates
    public getCandidates(): GeminiOutput[] {
        return this.candidates;
    }
}