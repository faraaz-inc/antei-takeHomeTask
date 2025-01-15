"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageManager = void 0;
//Singleton class to store the candidates
//can use a database here
class StorageManager {
    //Singleton pattern
    constructor() {
        this.candidates = [];
    }
    static getInstance() {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager();
        }
        return StorageManager.instance;
    }
    //method to add a new candidate
    addCandidate(candidate) {
        this.candidates.push(candidate);
    }
    //method to get all candidates
    getCandidates() {
        return this.candidates;
    }
}
exports.StorageManager = StorageManager;
