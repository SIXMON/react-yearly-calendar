'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactMomentProptypes = require('react-moment-proptypes');

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  year: _propTypes2.default.number.isRequired,
  month: _propTypes2.default.number.isRequired,
  forceFullWeeks: _propTypes2.default.bool.isRequired,
  showWeekSeparators: _propTypes2.default.bool.isRequired,
  selectedDay: _reactMomentProptypes.momentObj.isRequired,
  firstDayOfWeek: _propTypes2.default.number.isRequired,
  selectingRange: _propTypes2.default.arrayOf(_reactMomentProptypes.momentObj),
  selectRange: _propTypes2.default.bool.isRequired,
  selectedRange: _propTypes2.default.arrayOf(_reactMomentProptypes.momentObj),
  customClasses: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
  dayClicked: _propTypes2.default.func.isRequired,
  dayHovered: _propTypes2.default.func.isRequired
};

var defaultProps = {
  selectingRange: undefined,
  selectedRange: undefined,
  customClasses: undefined
};

var Month = function (_Component) {
  _inherits(Month, _Component);

  function Month(props) {
    _classCallCheck(this, Month);

    var _this = _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Month, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectingRange !== undefined) {
        this.setState({
          selectingRangeStart: nextProps.selectingRange[0].month(),
          selectingRangeEnd: nextProps.selectingRange[1].month()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          month = _props.month,
          selectingRange = _props.selectingRange,
          selectedRange = _props.selectedRange;
      var _state = this.state,
          selectingRangeStart = _state.selectingRangeStart,
          selectingRangeEnd = _state.selectingRangeEnd;

      // full repaint for some global-affecting rendering props

      if (this.props.year !== nextProps.year || this.props.forceFullWeeks !== nextProps.forceFullWeeks || this.props.showWeekSeparators !== nextProps.showWeekSeparators || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.selectRange !== nextProps.selectRange || this.props.customClasses !== nextProps.customClasses || this.props.selectRange && selectingRange === undefined && nextProps.selectingRange === undefined) {
        return true;
      }

      // if we get to this point and we are in 'selectRange' mode then it's likely that we have a change in selectingRange
      if (this.props.selectRange) {
        if (selectingRange === undefined) {
          var _oldRangeStart = selectedRange[0].month();
          var _oldRangeEnd = selectedRange[1].month();
          if (_oldRangeStart > _oldRangeEnd) {
            var _ref = [_oldRangeEnd, _oldRangeStart];
            _oldRangeStart = _ref[0];
            _oldRangeEnd = _ref[1];
          }

          var _newRangeStart = nextProps.selectingRange[0].month();
          var _newRangeEnd = nextProps.selectingRange[1].month();
          if (_newRangeStart > _newRangeEnd) {
            var _ref2 = [_newRangeEnd, _newRangeStart];
            _newRangeStart = _ref2[0];
            _newRangeEnd = _ref2[1];
          }

          // first time it's called, repaint months in old selectedRange and next selectingRange
          return _oldRangeStart <= month && month <= _oldRangeEnd || _newRangeStart <= month && month <= _newRangeEnd;
        } else if (nextProps.selectingRange === undefined) {
          // last time it's called, repaint months in previous selectingRange
          var _oldRangeStart2 = selectingRangeStart;
          var _oldRangeEnd2 = selectingRangeEnd;
          if (_oldRangeStart2 > _oldRangeEnd2) {
            var _ref3 = [_oldRangeEnd2, _oldRangeStart2];
            _oldRangeStart2 = _ref3[0];
            _oldRangeEnd2 = _ref3[1];
          }

          var _newRangeStart2 = nextProps.selectedRange[0].month();
          var _newRangeEnd2 = nextProps.selectedRange[1].month();
          if (_newRangeStart2 > _newRangeEnd2) {
            var _ref4 = [_newRangeEnd2, _newRangeStart2];
            _newRangeStart2 = _ref4[0];
            _newRangeEnd2 = _ref4[1];
          }

          // called on day hovering changed
          return _oldRangeStart2 <= month && month <= _oldRangeEnd2 || _newRangeStart2 <= month && month <= _newRangeEnd2;
        }
        // called on day hovering changed
        var oldRangeStart = selectingRangeStart;
        var oldRangeEnd = selectingRangeEnd;
        if (oldRangeStart > oldRangeEnd) {
          ;

          var _ref5 = [oldRangeEnd, oldRangeStart];
          oldRangeStart = _ref5[0];
          oldRangeEnd = _ref5[1];
        }var newRangeStart = nextProps.selectingRange[0].month();
        var newRangeEnd = nextProps.selectingRange[1].month();
        if (newRangeStart > newRangeEnd) {
          var _ref6 = [newRangeEnd, newRangeStart];
          newRangeStart = _ref6[0];
          newRangeEnd = _ref6[1];
        }

        return oldRangeStart <= month && month <= oldRangeEnd || newRangeStart <= month && month <= newRangeEnd;
      } else if (this.props.selectedDay.month() === month || nextProps.selectedDay.month() === month) {
        // single selectedDay changed: repaint months where selectedDay was and where will be
        return true;
      }

      return false;
    }
  }, {
    key: 'dayClicked',
    value: function dayClicked(day, classes) {
      var dayClicked = this.props.dayClicked;

      dayClicked(day, classes);
    }
  }, {
    key: 'dayHovered',
    value: function dayHovered(day) {
      var _props2 = this.props,
          selectRange = _props2.selectRange,
          dayHovered = _props2.dayHovered;

      if (selectRange) {
        dayHovered(day);
      }
    }
  }, {
    key: 'renderMonthDays',
    value: function renderMonthDays() {
      var _this2 = this;

      var _props3 = this.props,
          year = _props3.year,
          month = _props3.month,
          forceFullWeeks = _props3.forceFullWeeks,
          showWeekSeparators = _props3.showWeekSeparators,
          selectedDay = _props3.selectedDay,
          firstDayOfWeek = _props3.firstDayOfWeek,
          selectingRange = _props3.selectingRange,
          selectRange = _props3.selectRange,
          selectedRange = _props3.selectedRange,
          customClasses = _props3.customClasses;
      // NOTE For some wierd reason, moment index month from 0, so we substract 1 to get the correct month

      var monthStart = (0, _moment2.default)([year, month - 1, 1]); // current day

      // number of days to insert before the first of the month to correctly align the weekdays
      var prevMonthDaysCount = monthStart.weekday();
      while (prevMonthDaysCount < firstDayOfWeek) {
        prevMonthDaysCount += 7;
      }
      // days in month
      var numberOfDays = monthStart.daysInMonth();
      // insert days at the end to match up 37 (max number of days in a month + 6)
      // or 42 (if user prefers seeing the week closing with Sunday)
      var totalDays = forceFullWeeks ? 42 : 37;

      // day-generating loop
      var days = [];
      (0, _utils.range)(firstDayOfWeek + 1, totalDays + firstDayOfWeek + 1).forEach(function (i) {
        var day = (0, _moment2.default)([year, month - 1, i - prevMonthDaysCount]);

        // pick appropriate classes
        var classes = [];
        if (i <= prevMonthDaysCount) {
          classes.push('prev-month');
        } else if (i > numberOfDays + prevMonthDaysCount) {
          classes.push('next-month');
        } else {
          if (selectRange) {
            // selectingRange is used while user is selecting a range
            // (has clicked on start day, and is hovering end day - but not yet clicked)
            var start = (selectingRange || selectedRange)[0];
            var end = (selectingRange || selectedRange)[1];

            // validate range
            if (end.isBefore(start)) {
              var _ref7 = selectingRange || selectedRange;

              var _ref8 = _slicedToArray(_ref7, 2);

              end = _ref8[0];
              start = _ref8[1];
            }

            if (day.isBetween(start, end, 'day', '[]')) {
              classes.push('range');
            }

            if (day.isSame(start, 'day')) {
              classes.push('range-left');
            }

            if (day.isSame(end, 'day')) {
              classes.push('range-right');
            }
          } else if (day.isSame(selectedDay, 'day')) {
            classes.push('selected');
          }

          // call here customClasses function to avoid giving improper classes to prev/next month
          if (customClasses instanceof Function) {
            classes.push(customClasses(day));
          }
        }

        if ((i - 1) % 7 === 0) {
          // sunday
          classes.push('bolder');
        }

        if (customClasses) {
          Object.keys(customClasses).forEach(function (k) {
            var obj = customClasses[k];
            // Order here is important! Everything is instance of Object in js
            if (typeof obj === 'string') {
              if (obj.indexOf(day.format('ddd')) > -1) {
                classes.push(k);
              }
            } else if (obj instanceof Array) {
              obj.forEach(function (d) {
                if (day.format('YYYY-MM-DD') === d) classes.push(k);
              });
            } else if (obj instanceof Function) {
              if (obj(day)) {
                classes.push(k);
              }
            } else if (obj.start && obj.end) {
              var startDate = (0, _moment2.default)(obj.start, 'YYYY-MM-DD').add(-1, 'days');
              var endDate = (0, _moment2.default)(obj.end, 'YYYY-MM-DD').add(1, 'days');
              if (day.isBetween(startDate, endDate)) {
                classes.push(k);
              }
            }
          });
        }

        if (showWeekSeparators) {
          if ((i - 1) % 7 === firstDayOfWeek && days.length) {
            // push week separator
            days.push(_react2.default.createElement('td', { className: 'week-separator', key: 'seperator-' + i }));
          }
        }
        days.push(_react2.default.createElement(_Day2.default, {
          key: 'day-' + i,
          day: day.isValid() ? day : null,
          classes: classes.join(' '),
          dayClicked: function dayClicked(d) {
            return _this2.dayClicked(d, classes.join(' '));
          },
          dayHovered: function dayHovered(d) {
            return _this2.dayHovered(d);
          }
        }));
      });

      return days;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          month = _props4.month,
          year = _props4.year;


      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { className: 'month-name' },
          (0, _moment2.default)([year, month - 1, 1]).format('MMM')
        ),
        this.renderMonthDays()
      );
    }
  }]);

  return Month;
}(_react.Component);

Month.propTypes = propTypes;
Month.defaultProps = defaultProps;

exports.default = Month;