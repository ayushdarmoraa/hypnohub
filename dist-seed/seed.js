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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var audio_1 = __importDefault(require("./src/models/audio"));
var db_1 = __importDefault(require("./src/lib/db"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.local' });
var MONGODB_URI = process.env.MONGODB_URI;
var sampleAudios = [
    {
        title: "Deep Sleep Hypnosis",
        description: "A gentle and soothing hypnosis session designed to help you fall into a deep, restful sleep. Perfect for those struggling with insomnia or restless nights.",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
        duration: 1800, // 30 minutes
        category: "sleep",
        tags: ["sleep", "relaxation", "insomnia", "bedtime"],
        thumbnailUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400",
        isPublic: true,
        uploadedBy: "MindReboot Lab",
        playCount: 1247,
        likes: 89,
        uploadedAt: new Date(), // Added missing fields
        updatedAt: new Date(), // Added missing fields
    },
    {
        title: "Anxiety Relief & Calm",
        description: "Overcome anxiety and stress with this powerful hypnosis session. Learn to release tension and find your inner peace in just 25 minutes.",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
        duration: 1500, // 25 minutes
        category: "anxiety",
        tags: ["anxiety", "stress", "calm", "peace", "relaxation"],
        thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        isPublic: true,
        uploadedBy: "MindReboot Lab",
        playCount: 2156,
        likes: 134,
        uploadedAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Confidence Boost",
        description: "Build unshakeable confidence and self-esteem with this empowering hypnosis session. Transform your self-talk and embrace your true potential.",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
        duration: 2100, // 35 minutes
        category: "confidence",
        tags: ["confidence", "self-esteem", "empowerment", "success"],
        thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        isPublic: true,
        uploadedBy: "MindReboot Lab",
        playCount: 1834,
        likes: 156,
        uploadedAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Focus & Concentration",
        description: "Enhance your mental clarity and focus with this specialized hypnosis session. Perfect for students, professionals, and anyone looking to improve concentration.",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
        duration: 1200, // 20 minutes
        category: "focus",
        tags: ["focus", "concentration", "productivity", "mental clarity"],
        thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
        isPublic: true,
        uploadedBy: "MindReboot Lab",
        playCount: 987,
        likes: 67,
        uploadedAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Stress Release",
        description: "Let go of daily stress and tension with this deeply relaxing hypnosis session. Feel refreshed, renewed, and ready to face any challenge.",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
        duration: 1800, // 30 minutes
        category: "stress",
        tags: ["stress", "tension", "relaxation", "renewal"],
        thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
        isPublic: true,
        uploadedBy: "MindReboot Lab",
        playCount: 1456,
        likes: 98,
        uploadedAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Morning Motivation",
        description: "Start your day with energy and purpose. This uplifting hypnosis session will help you feel motivated, focused, and ready to achieve your goals.",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
        duration: 900, // 15 minutes
        category: "confidence",
        tags: ["motivation", "morning", "energy", "goals", "success"],
        thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        isPublic: true,
        uploadedBy: "MindReboot Lab",
        playCount: 2341,
        likes: 187,
        uploadedAt: new Date(),
        updatedAt: new Date(),
    }
];
function seedAudios() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 7]);
                    return [4 /*yield*/, (0, db_1.default)()];
                case 1:
                    _a.sent(); // Ensure connection is established
                    console.log('MongoDB connected for seeding');
                    // Clear existing audios
                    return [4 /*yield*/, audio_1.default.deleteMany({})];
                case 2:
                    // Clear existing audios
                    _a.sent();
                    // Insert sample audios
                    return [4 /*yield*/, audio_1.default.insertMany(sampleAudios)];
                case 3:
                    // Insert sample audios
                    _a.sent();
                    console.log("\u2705 Successfully seeded ".concat(sampleAudios.length, " sample audios"));
                    return [3 /*break*/, 7];
                case 4:
                    error_1 = _a.sent();
                    console.error('❌ Error seeding audios:', error_1);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, mongoose_1.default.disconnect()];
                case 6:
                    _a.sent();
                    console.log('MongoDB disconnected after seeding');
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
seedAudios();
