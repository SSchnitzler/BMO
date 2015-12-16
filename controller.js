var fpm = require('./Directives/fpm');
var main = require('./Directives/default');

module.exports = function(msg, outputChannel) {
  var workingMsgBody = msg.body.replace('@bmo', '').replace(' ', '');
  var commands = workingMsgBody.split(";");
  
  commands.forEach(function (currentCommand) {
    if (currentCommand ==="ls") {
      main.ls(function(data) {
        outputChannel.sendOutput(msg.medium, data);
      });
    } else if (currentCommand === "fpmstatus") {
      fpm.status(function(data) {
        outputChannel.sendOutput(msg.medium, data);
      });
    } else if (currentCommand === "fpmrestart") {
      fpm.restart(function(data) {
        outputChannel.sendOutput(msg.medium, data);
      });
    } else if (currentCommand === 'help') {
      main.help(function(data) {
        outputChannel.sendOutput(msg.medium, data);
      });
    } else {
      main.default(function(data) {
        outputChannel.sendOutput(msg.medium, data);
      });
    }
  });
}
