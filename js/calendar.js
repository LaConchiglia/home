var app = angular.module("calendarApp", []);
app.controller("CalendarCtrl", function () {
  var today = new Date();
  var selectedDay1 = new Date(2021, 05, 28, 0, 0, 0, 0);
  var selectedDay2 = new Date(2021, 08, 03, 0, 0, 0, 0);
  var selectedDay3 = new Date(2021, 08, 20, 0, 0, 0, 0);

  this.days = {
    long: it
      ? [
          "Domenica",
          "Lunedì",
          "Martedì",
          "Mercoledì",
          "Giovedì",
          "Venerdì",
          "Sabato",
        ]
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
    short: it
      ? ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  };
  this.months = it
    ? [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ]
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
  var firstweekRemainder;

  console.log(it);

  this.todayDate = today.getDate();
  this.todayDay = today.getDay();
  this.todayMonth = today.getMonth();
  this.todayYear = today.getFullYear();
  this.todayDayName = this.days.long[this.todayDay];
  this.todayMonthName = this.months[this.todayMonth];

  console.log(this.today);
  console.log(this.todayDate);

  var lastDay = new Date(this.todayYear, this.todayMonth + 1, 0);

  this.lastDayDate = lastDay.getDate();
  var colorsOfTheMonths = [
    "#8fd4e3",
    "#9ae3d3",
    "#8ee3a2",
    "#a4e38c",
    "#d3e38b",
    "#e3e08a",
    "#e3b87c",
    "#e39171",
    "#e34c4c",
    "#e34d89",
    "#d04fe3",
    "#575be3",
  ];
  this.monthColor = colorsOfTheMonths[this.todayMonth];
  this.selectedDate = today;
  this.selectedDateMonth = this.selectedDate.getMonth();
  this.selectedDateMonthName = this.months[this.selectedDateMonth];
  this.selectedDateDay = this.selectedDate.getDay();
  this.selectedDateDayName = this.days.long[this.selectedDateDay];

  this.currentMonth = {
    month: "",
    year: "",
    monthName: "",
    date: today,
    dates: [],
    firstDate: null,
    lastDate: null,
  };

  this.offsetWeekStart = function (date, dates) {
    var dateMonth = date.getMonth();
    var dateYear = date.getFullYear();
    var firstDayDate = new Date(dateYear, dateMonth, 1);
    var dayPosition = firstDayDate.getDay();
    var i = 0;
    for (i; i < dayPosition; i++) {
      dates.push({
        date: "",
        show: false,
      });
    }
    return dates;
  };

  this.CreateMonth = function (date, lastDay) {
    this.currentMonth.date = date;
    this.currentMonth.year = date.getFullYear();
    this.currentMonth.dates = [];
    this.currentMonth.dates = this.offsetWeekStart(
      date,
      this.currentMonth.dates
    );
    this.currentMonth.month = date.getMonth();
    this.currentMonth.monthName = this.months[date.getMonth()];
    this.monthColor = colorsOfTheMonths[this.currentMonth.month];

    var i = 1;
    for (i; i <= lastDay; i++) {
      var newDate = new Date(date.getFullYear(), date.getMonth(), i);
      if (
        this.compareDates(newDate, today) &&
        this.compareDates(newDate, this.selectedDate)
      ) {
        this.currentMonth.dates.push({
          date: newDate,
          today: true,
          selected: true,
          id: "id" + i,
          show: true,
        });
      } else if (this.compareDates(newDate, today)) {
        this.currentMonth.dates.push({
          date: newDate,
          today: true,
          selected: false,
          id: "id" + i,
          show: true,
        });
      } else if (
        this.compareDates(newDate, selectedDay1) ||
        this.compareDates(newDate, selectedDay2) ||
        this.compareDates(newDate, selectedDay3)
      ) {
        this.currentMonth.dates.push({
          date: newDate,
          today: false,
          selected: true,
          id: "id" + i,
          show: true,
        });
      } else {
        this.currentMonth.dates.push({
          date: newDate,
          today: false,
          selected: false,
          id: "id" + i,
          show: true,
        });
      }
    }
    return;
  };

  this.findDateIndex = function (id) {
    var i = 0;
    var length = this.currentMonth.dates.length;
    for (i; i < length; i++) {
      var newId = this.currentMonth.dates[i].id;
      if (newId === id) {
        return i;
      }
    }
    return;
  };

  this.compareDates = function (date1, date2) {
    var month1 = date1.getMonth();
    var month2 = date2.getMonth();
    var actualDate1 = date1.getDate();
    var actualDate2 = date2.getDate();
    var year1 = date1.getFullYear();
    var year2 = date2.getFullYear();
    if (month1 === month2 && year1 === year2 && actualDate1 === actualDate2) {
      return true;
    } else {
      return false;
    }
  };

  this.SelectDate = function (id, status) {
    if (status) {
      var index = this.findDateIndex(id);
      var length = this.currentMonth.dates.length;
      var i = 0;
      for (i; i < length; i++) {
        this.currentMonth.dates[i].selected = false;
      }
      this.currentMonth.dates[index].selected = true;
      this.selectedDate = this.currentMonth.dates[index].date;
      this.selectedDateMonth = this.selectedDate.getMonth();
      this.selectedDateMonthName = this.months[this.selectedDateMonth];
      this.selectedDateDay = this.selectedDate.getDay();
      this.selectedDateDayName = this.days.long[this.selectedDateDay];
    }
    return;
  };

  this.nextMonth = function (date) {
    if (date.getMonth() === 11) {
      var newMonthDate = new Date(date.getFullYear() + 1, 0, 1);
      var newMonthLastDay = new Date(date.getFullYear() + 1, 1, 0);
      var newMonthLastDayDate = newMonthLastDay.getDate();
      this.CreateMonth(newMonthDate, newMonthLastDayDate);
      return;
    } else {
      var newMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      if (date.getMonth() === 10) {
        var newMonthLastDay = new Date(date.getFullYear() + 1, 0, 0);
      } else {
        var newMonthLastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 2,
          0
        );
      }
      var newMonthLastDayDate = newMonthLastDay.getDate();
      this.CreateMonth(newMonthDate, newMonthLastDayDate);
      return;
    }
  };

  this.previousMonth = function (date) {
    if (date.getMonth() === 0) {
      var newMonthDate = new Date(date.getFullYear() - 1, 11, 1);
      var newMonthLastDay = new Date(date.getFullYear(), 0, 0);
    } else {
      var newMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      var newMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    }
    var newMonthLastDayDate = newMonthLastDay.getDate();
    this.CreateMonth(newMonthDate, newMonthLastDayDate);
    return;
  };

  this.CreateMonth(today, this.lastDayDate);
});
