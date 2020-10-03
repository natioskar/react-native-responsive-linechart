"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
var deepmerge_1 = __importDefault(require("deepmerge"));
var React = __importStar(require("react"));
var react_native_svg_1 = require("react-native-svg");
var ChartContext_1 = __importDefault(require("./ChartContext"));
var Line_utils_1 = require("./Line.utils");
var utils_1 = require("./utils");
var Line = function (props) {
    var _a = React.useContext(ChartContext_1.default), contextData = _a.data, dimensions = _a.dimensions, viewportDomain = _a.viewportDomain, viewportOrigin = _a.viewportOrigin, domain = _a.domain, lastTouch = _a.lastTouch;
    var _b = React.useState(undefined), tooltipIndex = _b[0], setTooltipIndex = _b[1];
    var _c = deepmerge_1.default(defaultProps, props), _d = _c.theme, stroke = _d.stroke, scatter = _d.scatter, tooltipComponent = _c.tooltipComponent, _e = _c.data, data = _e === void 0 ? contextData : _e, tension = _c.tension, smoothing = _c.smoothing, onTooltipSelect = _c.onTooltipSelect, _f = _c.onTooltipSelectEnd, onTooltipSelectEnd = _f === void 0 ? function () { } : _f;
    if (!dimensions) {
        return null;
    }
    React.useEffect(function () {
        var scaledPoints = utils_1.scalePointsToDimensions(data, viewportDomain, dimensions);
        var newIndex = Line_utils_1.calculateTooltipIndex(scaledPoints, lastTouch);
        if (tooltipIndex !== undefined && newIndex === undefined && !lastTouch) {
            onTooltipSelectEnd();
        }
        if (newIndex !== tooltipIndex) {
            setTooltipIndex(newIndex);
            if (typeof onTooltipSelect === 'function' && typeof newIndex === 'number' && data.length > newIndex) {
                onTooltipSelect(data[newIndex], newIndex);
            }
        }
    }, [data, viewportDomain, domain, dimensions, lastTouch]);
    var scaledPoints = utils_1.scalePointsToDimensions(data, viewportDomain, dimensions);
    var points = Line_utils_1.adjustPointsForThickStroke(scaledPoints, stroke);
    var path = utils_1.svgPath(points, smoothing, tension);
    return (React.createElement(React.Fragment, null,
        React.createElement(react_native_svg_1.Svg, { width: dimensions.width, height: dimensions.height },
            React.createElement(react_native_svg_1.G, { translateX: viewportOrigin.x, translateY: viewportOrigin.y },
                React.createElement(react_native_svg_1.Path, { d: path, fill: "none", strokeLinecap: "round", stroke: stroke.color, strokeWidth: stroke.width, strokeOpacity: stroke.opacity }),
                points.map(function (p, i) {
                    var shape = i === tooltipIndex ? deepmerge_1.default(scatter.default, scatter.selected) : scatter.default;
                    if (shape.width === 0 && shape.height === 0) {
                        return null;
                    }
                    return (React.createElement(react_native_svg_1.Rect, { key: JSON.stringify(p), x: p.x - shape.width / 2 + shape.dx, y: p.y - shape.height / 2 - shape.dy, rx: shape.rx, fill: shape.color, opacity: shape.opacity, height: shape.height, width: shape.width }));
                }))),
        tooltipIndex !== undefined &&
            tooltipComponent &&
            React.cloneElement(tooltipComponent, { value: data[tooltipIndex], position: scaledPoints[tooltipIndex] })));
};
exports.Line = Line;
var defaultProps = {
    theme: {
        stroke: {
            color: 'black',
            width: 1,
            opacity: 1,
        },
        scatter: {
            default: {
                width: 0,
                height: 0,
                dx: 0,
                dy: 0,
                rx: 0,
                color: 'black',
            },
            selected: {},
        },
    },
    tension: 0.3,
    smoothing: 'none',
};
