'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';

export default class WarningPagenumDiaglog extends DialogView{

  constructor(serializedState){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
  	const language = agsbs.language;
    const viewManager = agsbs.viewManager;
    const editor = agsbs.editorFunctions;

    super(serializedState);

    this.dialogHeadline.innerHTML = language.warningPagenumbering;
    this.text = document.createElement('p');
    this.text.innerHTML = language.textAutoCorrection;
    this.dialogContent.appendChild(this.text);

    //Buttons
    // Abort-Button
    const abortButton = document.createElement('input');
		abortButton.setAttribute('type', 'button');
		abortButton.setAttribute('value',language.abort);
    this.dialogContent.appendChild(abortButton);
    abortButton.addEventListener('click', function(event) {
      activePanels = atom.workspace.getModalPanels();
      activePanels.forEach(function (currentValue, index, originalArray){
        if(currentValue.visible){
          viewManager.toggleDialog(currentValue);
          console.log("show list with wrom");
        }
      });
    });
    const correctButton = document.createElement('input');
		correctButton.setAttribute('type', 'button');
		correctButton.setAttribute('value',language.correct);
		this.dialogContent.appendChild(correctButton);
    correctButton.addEventListener('click', function(event) {
      activePanels = atom.workspace.getModalPanels();
      activePanels.forEach(function (currentValue, index, originalArray){
        if(currentValue.visible){
          viewManager.toggleDialog(currentValue);
          console.log("Autocorrect page numbering");
        }
    });

  }
}
