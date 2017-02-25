/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pictures              ->  index
 * POST    /api/pictures              ->  create
 * GET     /api/pictures/:id          ->  show
 * PUT     /api/pictures/:id          ->  upsert
 * PATCH   /api/pictures/:id          ->  patch
 * DELETE  /api/pictures/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _pictures = require('./pictures.model');

var _pictures2 = _interopRequireDefault(_pictures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Picturess
function index(req, res) {
  return _pictures2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Pictures from the DB
function show(req, res) {
  return _pictures2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Pictures in the DB
function create(req, res) {
  return _pictures2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Pictures in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  console.log("RECEIVED REQUEST TO UPDATE PIC");
  console.log("PARAM_ID: " + req.params.id);
  console.log("req.body.countLike: " + req.body.countLike);
  console.log("req.body.likes: " + req.body.likes);
  console.log("BODY:", (0, _stringify2.default)(req.body, undefined, 2));
  return _pictures2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Pictures in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _pictures2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Pictures from the DB
function destroy(req, res) {
  return _pictures2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=pictures.controller.js.map
