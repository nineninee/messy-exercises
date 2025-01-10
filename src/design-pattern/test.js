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
var Test;
(function (Test) {
    var _this = this;
    // 创建 readline 接口
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    var iter = rl[Symbol.asyncIterator]();
    var readline = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, iter.next()];
            case 1: return [2 /*return*/, (_a.sent()).value];
        }
    }); }); };
    // 备忘录
    var Memento = /** @class */ (function () {
        function Memento(value) {
            this.value = value;
        }
        Memento.prototype.getValue = function () {
            return this.value;
        };
        return Memento;
    }());
    // 发起人
    var Counter = /** @class */ (function () {
        function Counter(value) {
            this.undoStack = [];
            this.redoStack = [];
            this.value = value;
        }
        Counter.prototype.increment = function () {
            this.redoStack.length = 0;
            this.undoStack.push(new Memento(this.value));
            this.value++;
        };
        Counter.prototype.decrement = function () {
            this.redoStack.length = 0;
            this.undoStack.push(new Memento(this.value));
            this.value--;
        };
        Counter.prototype.undo = function () {
            if (this.undoStack.length > 0) {
                this.redoStack.push(new Memento(this.value));
                this.value = this.undoStack.pop().getValue();
            }
        };
        Counter.prototype.redo = function () {
            if (this.redoStack.length > 0) {
                this.undoStack.push(new Memento(this.value));
                this.value = this.redoStack.pop().getValue();
            }
        };
        Counter.prototype.getValue = function () {
            return this.value;
        };
        return Counter;
    }());
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var counter, line, operation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    counter = new Counter(0);
                    _a.label = 1;
                case 1: return [4 /*yield*/, readline()];
                case 2:
                    if (!(line = _a.sent())) return [3 /*break*/, 3];
                    operation = line;
                    switch (operation) {
                        case "Increment":
                            counter.increment();
                            break;
                        case "Decrement":
                            counter.decrement();
                            break;
                        case "Undo":
                            counter.undo();
                            break;
                        case "Redo":
                            counter.redo();
                            break;
                    }
                    console.log(counter.getValue());
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    }); })();
})(Test || (Test = {}));
