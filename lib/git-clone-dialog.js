'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Git from './git-commands';

const iPath = require('path');

export default class GitCloneDialog extends DialogView {
  
  constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
		const viewManager = agsbs.viewManager;
    
    super(serializedState);
    
    this.dialogHeadline.innerHTML = language.cloneExistingRepo;
    
    const gitCloneForm = document.createElement('form');
		gitCloneForm.setAttribute('method','post');
    
    const gitContainer = document.createElement('div');
    gitContainer.classList.add('git_container');
      // repoName input
    const gitUserName = this.viewManager.addTextInput(gitCloneForm, 'git_user', language.gitUser);
    gitUserName.addEventListener('input', function() {
      toggleSubmitButton();
		});
    // repoName input
    const gitRepoName = this.viewManager.addTextInput(gitCloneForm, 'git_repo_name', language.repoName);    
    gitRepoName.addEventListener('input', function() {
      toggleSubmitButton();
		});
    const cloneSubmit = document.createElement('input');
    cloneSubmit.setAttribute('type', 'submit');
    cloneSubmit.setAttribute('value', language.clone);
    viewManager.disableButton(cloneSubmit);
    gitCloneForm.appendChild(gitContainer);
    gitCloneForm.appendChild(cloneSubmit);
    
    gitCloneForm.addEventListener('submit', function() {
      const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
      const git = agsbs.git;
      var userName = gitUserName.value;
      var repoName = gitRepoName.value.toLowerCase();
      git.clone(userName, repoName);
      viewManager.closeDialog();
		});
    
    
    this.dialogContent.appendChild(gitCloneForm);

  
    function toggleSubmitButton(){
      if(gitRepoName.value &&  gitUserName.value){
        viewManager.enableButton(cloneSubmit);
      }else{
        viewManager.disableButton(cloneSubmit);
      }
    }
  }
}