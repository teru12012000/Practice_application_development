"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const members_1 = require("./router/members");
const Post_1 = require("./router/Post");
const app = (0, express_1.default)();
const PORT = 5050;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/member", members_1.router);
app.use("/post", Post_1.post_router);
app.listen(PORT, () => {
    console.log(`Server is runnning. port number is ${PORT}`);
});
