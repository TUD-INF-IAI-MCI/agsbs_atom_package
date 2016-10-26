'use babel';

export default class ErrorMessageFormatter{
  constructor(serializedState) {

  }

  formatErrorMessage(msg, intentText){
    var formattedMessage = "";
    var message = msg.toString();
    var lineBreak = "\n";
    var textIntent = "    ";
    var words = message.split(" ");
    var line = "";
    for(var i = 0; i < words.length; i++){
      var word = words[i];
      if(line.length + textIntent.length + word.length <= 62){
          if(i == 0){
            line += word;
          }else{
            line += " " +word;
          }
      }else{
        formattedMessage += line + lineBreak + textIntent;
        // a new line
        line = word;
      }
    }
    formattedMessage += line;
    return formattedMessage;
  }

}
