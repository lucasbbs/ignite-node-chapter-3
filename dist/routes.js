"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCourse(req, res) {
    CreateCourseService_1.default.execute({
        name: "Javascript",
        // duration: 10,
        educator: "Lucas Breno de S. Noronha Braga"
    });
    CreateCourseService_1.default.execute({
        name: "React",
        duration: 10,
        educator: "Lucas Breno de S. Noronha Braga"
    });
    return res.send("Teste");
}
exports.createCourse = createCourse;
