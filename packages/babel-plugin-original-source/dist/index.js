"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var t = _interopRequireWildcard(require("@babel/types"));

var _generator = _interopRequireDefault(require("@babel/generator"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = (0, _helperPluginUtils.declare)(function (api) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  api.assertVersion(7);
  var imports = {};
  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(idPath) {
        var node = idPath.node;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = node.specifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var specifier = _step.value;

            if (t.isImportDefaultSpecifier(specifier)) {
              imports[specifier.local.name] = "const {default: ".concat(specifier.local.name, "} = await import(\"").concat(node.source.value, "\");"); // imports[specifier.local.name] = generate(node).code;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      },
      CallExpression: function CallExpression(idPath) {
        var node = idPath.node;

        if (t.isIdentifier(node.callee, {
          name: "render"
        })) {
          var identifiers = new Set();
          (0, _traverse.default)(node.arguments[0], {
            JSXIdentifier: function JSXIdentifier(path) {
              if (path.isJSXIdentifier()) {
                identifiers.add(path.node.name);
              }
            }
          }, idPath.scope, idPath);
          var usedImports = [];
          usedImports.push.apply(usedImports, _toConsumableArray(_toConsumableArray(identifiers).map(function (name) {
            return imports[name];
          }))); // if (t.isJSXElement(node.arguments[0])) {
          //     usedImports.push(...[...identifiers].map(name => imports[name]));
          // } else if (t.isArrowFunctionExpression(node.arguments[0])) {
          //     const {body} = node.arguments[0];
          //     if (t.isBlockStatement(body)) {
          //         const innerBody = body.body;
          //         if (innerBody.length === 0) {
          //             throw new Error("callback must return a value");
          //         } else {
          //             const last = innerBody.pop();
          //             if (!t.isReturnStatement(last)) {
          //                 throw new Error("callback must end with a return statement");
          //             }
          //             lines.push(...[...identifiers].map(name => imports[name]));
          //             lines.push(...innerBody.map(child => generate(child).code));
          //             lines.push(`const container = document.getElementById("container");`);
          //             lines.push(`ReactDOM.render(${generate(last.argument).code}, container, callback);`);
          //             node.arguments[0] = t.stringLiteral(lines.join("\n"));
          //         }
          //     } else if (t.isJSXElement) {
          //         lines.push(...[...identifiers].map(name => imports[name]));
          //         lines.push(`const container = document.getElementById("container");`);
          //         lines.push(`ReactDOM.render(${generate(body).code}, container, callback);`);
          //         node.arguments[0] = t.stringLiteral(lines.join("\n"));
          //     }
          // }

          node.arguments[0] = t.objectExpression([t.objectProperty(t.identifier("code"), t.stringLiteral((0, _generator.default)(node.arguments[0]).code)), t.objectProperty(t.identifier("imports"), t.arrayExpression(usedImports.map(function (x) {
            return t.stringLiteral(x);
          })))]);
        }
      }
    }
  };
});

exports.default = _default;