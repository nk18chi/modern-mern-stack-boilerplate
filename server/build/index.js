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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = require("./utils/database");
const apolloServer_1 = require("./utils/apolloServer");
const app = (0, express_1.default)();
const PORT = 4000;
(0, database_1.connectDatabase)();
function startApollo() {
    return __awaiter(this, void 0, void 0, function* () {
        const apolloServer = (0, apolloServer_1.createApolloServer)({});
        yield apolloServer.start();
        apolloServer.applyMiddleware({
            app,
            path: '/graphql',
            cors: {
                origin: '*',
                methods: 'POST',
                preflightContinue: false,
                optionsSuccessStatus: 204,
            },
        });
    });
}
startApollo();
app.use((0, helmet_1.default)({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
}));
app.use((0, cors_1.default)());
app.get('/', (_, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
