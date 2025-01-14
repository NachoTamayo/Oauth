"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSound = getSound;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const PlayHT = __importStar(require("playht"));
PlayHT.init({
    userId: (_a = process.env.PLAY_HT_USERID) !== null && _a !== void 0 ? _a : "",
    apiKey: (_b = process.env.PLAY_HT_APIKEY) !== null && _b !== void 0 ? _b : "",
    defaultVoiceEngine: "Play3.0-mini",
    defaultVoiceId: "s3://voice-cloning-zero-shot/f6594c50-e59b-492c-bac2-047d57f8bdd8/susanadvertisingsaad/manifest.json",
});
function getSound(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const sanitizedText = text.replace(/[^a-z0-9_\-]/gi, "_");
        const soundsDir = path_1.default.join(__dirname, "..", "public", "sounds");
        if (!fs_1.default.existsSync(soundsDir)) {
            fs_1.default.mkdirSync(soundsDir, { recursive: true });
        }
        const filePath = path_1.default.join(soundsDir, `${sanitizedText}.mp3`);
        const writeStream = fs_1.default.createWriteStream(filePath);
        const stream = yield PlayHT.stream(text, { voiceEngine: "Play3.0-mini" });
        return new Promise((resolve, reject) => {
            stream
                .pipe(writeStream)
                .on("finish", () => resolve(`/sounds/${sanitizedText}.mp3`))
                .on("error", reject);
        });
    });
}
