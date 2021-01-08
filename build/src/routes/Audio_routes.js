"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAudio = void 0;
var express_1 = require("express");
var audioMidd_1 = require("../middlewares/audioMidd");
var route = express_1.Router();
exports.routeAudio = route;
route.get('/audio', audioMidd_1.AudioMidd.checkAudio);
route.get('/audio/:id', audioMidd_1.AudioMidd.CheckoneAudio);
//# sourceMappingURL=Audio_routes.js.map