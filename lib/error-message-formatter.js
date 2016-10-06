'use babel';

export default class ErrorMessageFormatter{
  constructor(serializedState) {

  }

  formatErrorMessage(message, intentText){
    var formattedMessage = "";
    var pos = message.indexOf(':');
    var lineBreak = "\n";
    var textIntent = "";
    if(intentText){
      textIntent += " ".repeat(pos + 1);
    }
    var words = message.split(" ");
    var line = "";
    for(var i = 0; i < words.length; i++){
      if(line.length <= 62){
          if(i == 0){
            line += words[i];
          }else{
            line += " " +words[i];
          }
      }else{
        formattedMessage += line + lineBreak + textIntent;
        // a new line
        line = words[i];
      }
    }
    formattedMessage += line;
    return formattedMessage;
  }

}
