var commandListBasic = ["this", "room", "code", "help"];
var roomCommands=["--join", "--new"];
var roomCommands=["--set"];
var commandsAdvanced = ["!help", "!leave"]
var isReadyToChat=false;
var isCodeSet=false;
var isRoomSet=false;
var roomCode="";
var codeValue="";
var user = "root@localhost:~$";
var user2= "root@someoneelse:~$";
var commandHistory = [];
var commandIndex = -1;

function currentBrowser() {
  var is_chrome = navigator.userAgent.indexOf("Chrome") > -1;
  var is_explorer = navigator.userAgent.indexOf("MSIE") > -1;
  var is_firefox = navigator.userAgent.indexOf("Firefox") > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_edge = navigator.userAgent.indexOf("Edge") > -1;
  var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
  if (is_chrome && is_safari && is_edge) {
    is_chrome = false;
    is_safari = false;
  } else if (is_chrome && is_safari) {
    is_safari = false;
  } else if (is_chrome && is_opera) {
    is_chrome = false;
  }
  if (is_chrome) {
    return "Chrome";
  } else if (is_explorer) {
    return "Internet Explorer";
  } else if (is_firefox) {
    return "Firefox";
  } else if (is_safari) {
    return "Safari";
  } else if (is_edge) {
    return "Edge";
  } else if (is_opera) {
    return "Opera";
  } else {
    return "Browser";
  }
}

$(document).ready(function () {
  $("#terminal").on("click", function () {
    $("#terminalInput").focus();
  });

  function addError(message){
    $("#terminalOutput").append("<p class='error'>"+message+"</p>");
  }

  function addMessage(message){
    $("#terminalOutput").append("<p>"+message+"</p>");
  }

  function addAnotherResponse(username, message, roomCode){
    $("#terminalOutput").append(
      `${username}@${roomCode} ${message}<br>`
    );
  }

  function handleRoomCommand(secondary, tertiary){
    replaceInput();
    if(!secondary){
      addError("Please enter a room attribute");
      addInput();
      return;
    }
    switch(secondary){
      case "--join":
        if(isRoomSet){
          addError("Room already Joined");
          break;
        }
        if(!tertiary){
          addError("Please enter a room id");
          break;
        }
        //check TODO
        roomCode=tertiary;
        isRoomSet=true;
        addMessage("Room "+ roomCode + "Joined");
        break;
      case "--new":
        if(isRoomSet){
          addError("Please leave that room first");
          break;
        }
        var newRoomCode="jashdka";
        roomCode=newRoomCode;
        isRoomSet=true;
        addMessage("Room "+ roomCode + "Joined");
        break;
      default:
        addError("Invalid room command");
        break;
    }
    addInput();
  }

  function sendCommand(input) {
    var command = input.split(" ")[0];
    var secondary = input.split(" ")[1];
    var tertiary = input.split(" ")[2];
    if(isReadyToChat===false){
      if (
        commandListBasic.indexOf(command) === -1 &&
        command != "continue" &&
        command
      ) {
        replaceInput();
        $("#terminalOutput").append(
          'Invalid command "' + command + '"<br>type "help" for more options<br>'
        );
        addInput();
      }
      switch (command) {
        case "this":
          replaceInput();
          addAnotherResponse();
          addInput();
          break;
        case "room":
          handleRoomCommand(secondary, tertiary);
          break;
        case "code":
          
          break;
        case "help":
          printHelp(commandListBasic);
          break;        
      }
    }
  }

  function replaceInput() {
    var value = $("#terminalInput").val();
    $("#terminalInput").remove();
    $("#terminalOutput").append(value + "<br>");
  }

  function addInput() {
    $("#terminalOutput").append(
      user + ' <input id="terminalInput" spellcheck="false"></input>'
    );

    setTimeout(function () {
      $("#terminalInput").focus();
    }, 10);

    $("#terminalInput").keydown(function (e) {
      var command = $("#terminalInput").val();
      if (e.keyCode == 13) {
        sendCommand(command);
        commandHistory.unshift(command);
        commandIndex = -1;
      } else if (e.keyCode == 9) {
        e.preventDefault();
        autoCompleteInput(command);
      } else if (e.keyCode == 38 && commandIndex != commandHistory.length - 1) {
        e.preventDefault();
        commandIndex++;
        $("#terminalInput").val(commandHistory[commandIndex]);
      } else if (e.keyCode == 40 && commandIndex > -1) {
        e.preventDefault();
        $("#terminalInput").val(commandHistory[commandIndex]);
        commandIndex--;
      } else if (e.keyCode == 67 && e.ctrlKey) {
        $("#terminalInput").val(command + "^C");
        replaceInput();
        addInput();
      }
    });
  }

    function printHelp(list) {
      replaceInput();
      list.forEach(function (result) {
        $("#terminalOutput").append(result + '<br>');
      });
      addInput();
    }

  addInput();
});

