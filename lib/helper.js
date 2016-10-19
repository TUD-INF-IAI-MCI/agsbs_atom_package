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
  isBufferSelected(){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if (!atom.workspace.getActivePaneItem()) {
      this.showErrorMessage();
      return false;
    }
    if(!atom.workspace.getActivePaneItem().buffer){
      this.showErrorMessage();
      return false;
    }else{
      return this.isSelectedAMarkdownFile(atom.workspace.getActivePaneItem().buffer.file);
    }
  }

  isSelectedAMarkdownFile(file){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if(iPath.extname(file.path)=='.md'){
      return true;
    }else{
      this.showErrorMessage();
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
}
