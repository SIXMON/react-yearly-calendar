'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  year: _propTypes2.default.number.isRequired,
  onPrevYear: _propTypes2.default.func,
  onNextYear: _propTypes2.default.func,
  goToToday: _propTypes2.default.func,
  showTodayButton: _propTypes2.default.bool
};

var defaultProps = {
  onPrevYear: undefined,
  onNextYear: undefined,
  goToToday: undefined,
  showTodayButton: false
};

var CalendarControls = function CalendarControls(props) {
  var year = props.year,
      showTodayButton = props.showTodayButton,
      goToToday = props.goToToday,
      onPrevYear = props.onPrevYear,
      onNextYear = props.onNextYear;

  var todayButton = void 0;
  if (showTodayButton) {
    todayButton = _react2.default.createElement(
      'div',
      { className: 'control today', onClick: function onClick() {
          return goToToday();
        } },
      'Today'
    );
  }

  return _react2.default.createElement(
    'div',
    { className: 'calendar-controls' },
    _react2.default.createElement(
      'div',
      { className: 'control', onClick: function onClick() {
          return onPrevYear();
        } },
      '\xAB'
    ),
    _react2.default.createElement(
      'div',
      { className: 'current-year' },
      year
    ),
    _react2.default.createElement(
      'div',
      { className: 'control', onClick: function onClick() {
          return onNextYear();
        } },
      '\xBB'
    ),
    todayButton
  );
};

CalendarControls.propTypes = propTypes;
CalendarControls.defaultProps = defaultProps;

exports.default = CalendarControls;