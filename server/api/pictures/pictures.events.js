/**
 * Pictures model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _pictures = require('./pictures.model');

var _pictures2 = _interopRequireDefault(_pictures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PicturesEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PicturesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _pictures2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PicturesEvents.emit(event + ':' + doc._id, doc);
    PicturesEvents.emit(event, doc);
  };
}

exports.default = PicturesEvents;
//# sourceMappingURL=pictures.events.js.map
