import { Router } from "express";
import multer from "multer";
import { GeminiManager } from "../gemini/geminiManager";
import { StorageManager } from "../store/storageManager";

const router = Router();
const upload = multer({ dest: "../uploads/" });

router.post("/upload-cv", upload.single("file"), async(req, res) => {
    try {
        if(!req.file) {
            res.status(400).send("No file uploaded");
            return;
        }
        //get file path
        const filePath = req.file.path;

        //get gemini's response
        const response = await GeminiManager.getInstance().generateContent(filePath);
        //push the current response to storage
        StorageManager.getInstance().addCandidate(response);
        //return the response
        res.json(response);
    }
    catch(err) {

    }
});

router.get("/candidates", async(req, res) => {
    //get all candidates from storage
    const candidates = StorageManager.getInstance().getCandidates();
    res.json(candidates);
});

export default router;