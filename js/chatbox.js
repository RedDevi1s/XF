$(function() {
  // You can add Users inside JSON users section
  var _json = {
    users: ["Gupi Gain", "Bagha Bain", "Hirak Raja"],
    chats: [
      {
        from: "Gupi Gain",
        msg: "Mora Dujonai Rajar Jamai!",
        time: "1533263925814",
        action: ""
      },
      {
        from: "Bagha Bain",
        msg: "Jamai!",
        time: "1533263925814",
        action: ""
      },
      {
        from: "Gupi Gain",
        msg: "Mora Khai Dai Ghuri Firi!",
        time: "1533263925814",
        action: ""
      },
      {
        from: "Gupi Gain",
        msg: "Aha ki Moder Chiri!",
        time: "1533263925814",
        action: ""
      }
    ]
  };

  init();
  function init() {
    renderData();
  }
  function renderData() {
    var _now = $.now();
    getDateTime(_now);
    _json.users.forEach(function(user) {
      var userID = user.replace(/ /g, "_");
      var parentString =
        '<div class="chatbox" id="' +
        userID +
        '">' +
        '<div class="chats">' +
        "<ul></ul>" +
        "</div>" +
        '<div class="sendBox">' +
        '<input type="text" placeholder="enter next line ' +
        user.split(" ")[0] +
        '...">' +
        "</div>";
      $("#viewport").append(parentString);
      _json.chats.forEach(function(chat) {
        var _cl;
        chat.from === user ? (_cl = "you") : (_cl = "him");
        var dataString =
          "<li>" +
          '<div class="msg ' +
          _cl +
          '">' +
          '<span class="partner">' +
          chat.from +
          "</span>" +
          chat.msg +
          '<span class="time">' +
          getDateTime(chat.time) +
          "</span>" +
          "</div></li>";
        $("#viewport #" + userID + " .chats>ul").append(dataString);
      });
    });
  }
  function getDateTime(t) {
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var d = new Date(t / 1000),
      month = month[d.getMonth()],
      day = d.getDate().toString(),
      hour = d.getHours().toString(),
      min = d.getMinutes().toString();
    day.length < 2 ? (day = "0" + day) : "";
    hour.length < 2 ? (hour = "0" + hour) : "";
    min.length < 2 ? (min = "0" + min) : "";
    var res = "" + month + " " + day + " " + hour + ":" + min;
    return res;
  }
  $("#viewport .sendBox>input").keypress(function(e) {
    var _id = $(this)
      .closest(".chatbox")
      .attr("id");
    pendingRender(_id);
    if (e.which == 13) {
      var msgFrom;
      _json.users.forEach(function(user) {
        if (user.replace(/ /g, "_") === _id) msgFrom = user;
      });
      var msg = $("#" + _id + " .sendBox>input").val();
      msg = msg.replace(/\"/g, '\\"');
      var t = $.now();
      $("#" + _id + " .sendBox>input").val("");
      if (msg.replace(/\s/g, "") !== "") {
        var temp = {
          from: msgFrom,
          msg: msg,
          time: t.toString(),
          action: ""
        };
        _json.chats.push(temp);
        console.log(_json);
        newMsgRender(temp);
      } else {
        $("#viewport .chats ul>li.pending").remove();
      }
    }
  });
  function newMsgRender(data) {
    $("#viewport .chats ul>li.pending").remove();
    _json.users.forEach(function(user) {
      var checkID = user.replace(/ /g, "_");
      var _cl = "";
      data.from === user ? (_cl = "you") : (_cl = "him");
      $("#viewport .chatbox#" + checkID + " .chats ul").append(
        '<li><div class="msg ' +
          _cl +
          '">' +
          '<span class="partner">' +
          data.from +
          "</span>" +
          data.msg +
          '<span class="time">' +
          getDateTime(data.time) +
          "</span>" +
          "</div>" +
          "</li>"
      );
    });
  }

  function pendingRender(typingUser) {
    var pending =
      '<li class="pending">' +
      '<div class="msg load">' +
      '<div class="dot"></div>' +
      '<div class="dot"></div>' +
      '<div class="dot"></div>' +
      "</div>" +
      "</li>";
    _json.users.forEach(function(user) {
      user = user.replace(/ /g, "_");
      if (user !== typingUser) {
        if (!$("#" + user + " .chats ul>li").hasClass("pending"))
          $("#" + user + " .chats ul").append(pending);
      }
    });
  }
  $("#viewport .sendBox>input").focusout(function() {
    $("#viewport .chats ul>li.pending").remove();
  });
});
