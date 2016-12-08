'use babel';

const iPath = require('path');
import ErrorMessageFormatter from './error-message-formatter';

export default class Helper{
  isBufferSelected(editor){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if(!editor.buffer.file){
      var formatter = new ErrorMessageFormatter();
      message = formatter.formatErrorMessage(language.selectMdFile, false);
      atom.notifications.addError(language.error, {
        detail : message,
        dismissable : true
      });
      return false;
    }else{
      return true;
    }
  }
  isBufferSelected(showErrorMessage = false){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if(!atom.workspace.getActivePaneItem() ||
       !atom.workspace.getActivePaneItem().buffer ||
        atom.workspace.getActivePaneItem().buffer.file == null){
      if(showErrorMessage){
        this.showErrorMessage();
      }
      return false;
    }else{
      return this.isSelectedAMarkdownFile(atom.workspace.getActivePaneItem().buffer.file,
                                          showErrorMessage);
    }
  }

  isSelectedAMarkdownFile(file, showErrorMessage){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if(iPath.extname(file.path)=='.md'){
      return true;
    }else{
      if(showErrorMessage){
        this.showErrorMessage();
      }
      return false;
    }
  }
  showErrorMessage(){
    var formatter = new ErrorMessageFormatter();
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    message = formatter.formatErrorMessage(language.selectMdFile, false);
    atom.notifications.addError(language.error, {
      detail : message,
      dismissable : true
    });
  }

  //
  isCursorInTable(){
    var editor = atom.workspace.getActivePaneItem();
    var linesArr = editor.buffer.lines; // all line of buffer
    var cursorRow = editor.cursors[0].getScreenPosition()['row'];
    var beginTable = this.findBeginComment(linesArr, cursorRow, "<!-- BEGIN OF TABLE -->");
    var endTable = this.findEndComment(linesArr, cursorRow, "<!-- END OF TABLE -->");
    if(beginTable != -1 && endTable != -1){

      var tableMd = editor.getTextInBufferRange({start:{column: 1,
                                                         row: beginTable},
                                                 end:{start: 1, row:endTable+1}} )
    }
  }
  //return line number
  findEndComment(lines, cursorRow, str){
    var pos = 0;
    for(var i = cursorRow+1; i < lines.length; i++){
        if(lines[i] == str){
          pos = i;
          break;
        }
    }
    return pos;
  }
  //return line number
  findBeginComment(lines, cursorRow, str){
    var pos = 0;
    for(var i = cursorRow; i >= 0; i--){
        if(lines[i] == str){
          pos = i;
          break;
        }
    }
    return pos;
  }


  generateErrorOutput(errors){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    var errorFormatter  = new ErrorMessageFormatter();
    let fileNames = Object.keys(errors);
    for (let i = 0; i < fileNames.length; i++) {
        let errorsInLines = errors[fileNames[i]];
        for (l = 0; l < errorsInLines.length; l++) {
            var message = '';
            let lines = Object.keys(errorsInLines[l]);
            if(typeof errorsInLines[l] === 'object'){
              for (j = 0; j < lines.length; j++) {
                message += language.line + lines[j] + ': \n' +"    ";
                message += errorsInLines[l][lines[j]];
                console.log("new message text: "+message);
                errorFormatter.formatErrorMessage(message, true) + '\n';
              }
            }else{
             message += errorsInLines[l];
            }
            let fileName = fileNames[i].split("..")[1];
            console.log("fileNames " +fileNames);
            if(!fileName){
              fileName = fileNames[i];
            }
            atom.notifications.addError(language.mistkerlFoundErrorInFile +
                                        fileName, {
              detail : errorFormatter.formatErrorMessage(message, true),
              dismissable : true
            });
        }
      }
  }
}
