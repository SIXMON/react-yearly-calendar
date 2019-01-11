'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMomentProptypes = require('react-moment-proptypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  classes: _propTypes2.default.string,
  dayClicked: _propTypes2.default.func.isRequired,
  dayHovered: _propTypes2.default.func.isRequired,
  day: _reactMomentProptypes.momentObj
};

var defaultProps = {
  classes: '',
  day: null
};

var Day = function (_Component) {
  _inherits(Day, _Component);

  function Day(props) {
    _classCallCheck(this, Day);

    var _this = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    _this.onHover = _this.onHover.bind(_this);
    return _this;
  }

  _createClass(Day, [{
    key: 'onClick',
    value: function onClick() {
      var _props = this.props,
          dayClicked = _props.dayClicked,
          day = _props.day;

      dayClicked(day);
    }
  }, {
    key: 'onHover',
    value: function onHover() {
      var _props2 = this.props,
          dayHovered = _props2.dayHovered,
          day = _props2.day;

      dayHovered(day);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          classes = _props3.classes,
          day = _props3.day;

      return _react2.default.createElement(
        'td',
        { onClick: this.onClick, onMouseEnter: this.onHover, className: classes },
        _react2.default.createElement(
          'span',
          { className: 'day-number' },
          day === null ? '' : day.date()
        )
      );
    }
  }]);

  return Day;
}(_react.Component);

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;

exports.default = Day;