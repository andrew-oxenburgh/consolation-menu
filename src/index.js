"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var consolationMenu = require('./consolationMenu');
var exec = require('child_process').exec;
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var program = require("commander").program;
var yaml = require('js-yaml');
var R = require("ramda");
function runCommand(res) {
    console.log();
    console.log(chalk.grey(res));
    exec(res, function (error, stdout, _stderr) {
        console.log(stdout);
        process.exit();
    });
}
// console.log(JSON.stringify(types, null, 3))
// @ts-ignore
function show(menu) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, consolationMenu(menu)];
                case 1:
                    res = _a.sent();
                    if (res === null) {
                        process.exit();
                    }
                    if (typeof res === 'string') {
                        runCommand(res);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function removeEmptyLines(input) {
    return input.reduce(function (acc, val) {
        if (val.length) {
            acc.push(val);
        }
        return acc;
    }, []);
}
function getConfig(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var filepath, finalInput, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filepath = path.resolve(__dirname, opts.file);
                    finalInput = [];
                    if (!opts.file.endsWith('.txt')) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs.promises.readFile(filepath)];
                case 1:
                    input = _a.sent();
                    input = input.toString().split('\n');
                    input = removeEmptyLines(input);
                    finalInput = R.map(function (val) {
                        return {
                            command: val,
                            key: -1,
                            description: ''
                        };
                    }, input);
                    return [3 /*break*/, 3];
                case 2:
                    if (opts.file.endsWith('.yml') || opts.file.endsWith('.yaml')) {
                        finalInput = yaml.load(fs.readFileSync(filepath, 'utf8'));
                        finalInput = R.map(function (val) {
                            return __assign({ command: '', key: '', description: '' }, val);
                        }, finalInput);
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/, finalInput];
            }
        });
    });
}
function run(program) {
    return __awaiter(this, void 0, void 0, function () {
        var options, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    program.name('console menu')
                        .description('cli to show a list of possible commands')
                        .version('0.0.1')
                        .requiredOption('-f, --file <char>', 'config file')
                        .option('-s, --select <char>', 'run this line');
                    program.parse();
                    options = program.opts();
                    return [4 /*yield*/, getConfig(options)];
                case 1:
                    input = _a.sent();
                    if (options.select) {
                        if (input.length < options.select) {
                            console.log("invalid selection \"".concat(options.select, "\""));
                            process.exit(1);
                        }
                        runCommand(input[options.select]);
                    }
                    return [4 /*yield*/, show(input)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, ''];
            }
        });
    });
}
run(program);
