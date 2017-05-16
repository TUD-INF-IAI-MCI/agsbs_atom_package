'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';

/**
* Class that creates a dialog for insert textboxes
* @author Jens Voegler
*/

export default class InsertTextboxDialog extends DialogView {

	constructor(serializedState) {

    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    const viewManager = agsbs.viewManager;
    const editor = agsbs.editorFunctions;

    //get this.element and its child dialogContent from superclass
    super(serializedState);
		this.viewManager = viewManager;
    this.dialogHeadline.innerHTML = language.insertTextbox;
    const insertTextboxForm = document.createElement('form');
		insertTextboxForm.classList.add('insert_graphic_form');
		insertTextboxForm.setAttribute('method','post');


    const headerCheckboxContainer = document.createElement('div');
		headerCheckboxContainer.classList.add('table_head_checkbox_container')
    const textFrameCheckbox = viewManager.addCheckbox(headerCheckboxContainer, 'is_text_frame', language.textFrameCheckbox);
		textFrameCheckbox.setAttribute('tabindex', 1);
		this.textFrameCheckbox = textFrameCheckbox;
		let main = this;
    textFrameCheckbox.addEventListener('change', function() {
			main.changeSubmitEnabled();
      if(textBoxCheckbox.checked){
        textBoxCheckbox.checked = !textBoxCheckbox.checked;
      }else if(annotationCheckbox.checked){
				annotationCheckbox.checked = !annotationCheckbox.checked;
				selectTextboxColor.disabled = !selectTextboxColor.disabled;
			}
    });
    const textBoxCheckbox = viewManager.addCheckbox(headerCheckboxContainer, 'is_text_box', language.textBoxCheckbox);
		this.textBoxCheckbox = textBoxCheckbox;
		textBoxCheckbox.setAttribute('tabindex', 1);
    textBoxCheckbox.addEventListener('change', function() {
			main.changeSubmitEnabled();
      if(textFrameCheckbox.checked){
        textFrameCheckbox.checked = !textFrameCheckbox.checked;
      }else if(annotationCheckbox.checked){
				annotationCheckbox.checked = !annotationCheckbox.checked;
				selectTextboxColor.disabled = !selectTextboxColor.disabled;
			}
    });
		const annotationCheckbox = viewManager.addCheckbox(headerCheckboxContainer, 'is_annotation', language.annotation);
		this.annotationCheckbox = annotationCheckbox;
		annotationCheckbox.setAttribute('tabindex',1);
		annotationCheckbox.addEventListener('change', function(){
			main.changeSubmitEnabled();
			if(annotationCheckbox.checked){
				selectTextboxColor.disabled = !selectTextboxColor.disabled;
			}
			if(textFrameCheckbox.checked){
        textFrameCheckbox.checked = !textFrameCheckbox.checked;
      }else if(textBoxCheckbox.checked){
				textBoxCheckbox.checked = !textBoxCheckbox.checked;
			}
		})
    insertTextboxForm.appendChild(headerCheckboxContainer);
    var allColorsLanguage = language.allColors.split(",");
		const selectTextboxColor = viewManager.addDropDownMenu(insertTextboxForm, 'textbox_category', language.color, []);
    allColorsLanguage.forEach(function(color){
      let option = new Option();
      switch(color.trim()){
        case "colorRed":
          option.text = language.colorRed;
          break;
        case "colorBlack":
          option.text = language.colorBlack;
          break;
        case "colorGreen":
          option.text = language.colorGreen
          break;
        case "colorYellow":
          option.text = language.colorYellow;
          break;
        case "colorOrange":
          option.text = language.colorOrange;
          break;
        default:
          break;
      }
			option.value = color.replace("color","").toLowerCase().trim();
			selectTextboxColor.add(option);
    });


		this.selectTextboxColor = selectTextboxColor;
		insertTextboxForm.appendChild(document.createElement('br'));
		this.insertTextboxContent = document.createElement('label');
		this.insertTextboxContent.innerHTML = language.insertTextboxContent;
		insertTextboxForm.appendChild(this.insertTextboxContent);
		insertTextboxForm.appendChild(document.createElement('br'));
    const textboxContent = viewManager.addTextarea(insertTextboxForm, 'insert_textbox_content', language.insertTextboxContent);
		this.textboxContent = textboxContent;
		textboxContent.addEventListener('input', function(event){
			if(textboxContent.value.length > 4){
				main.changeSubmitEnabled();
			}
		});
		//textboxContent.disabled = true;
    insertTextboxForm.appendChild(textboxContent);
    const insertTextboxSubmit = document.createElement('input');
    insertTextboxSubmit.setAttribute('type', 'submit');
    insertTextboxSubmit.setAttribute('value',language.insert);
		this.insertTextboxSubmit = insertTextboxSubmit;
    viewManager.disableButton(insertTextboxSubmit);
    insertTextboxForm.appendChild(insertTextboxSubmit);
		this.dialogContent.appendChild(insertTextboxForm);
		insertTextboxForm.addEventListener('submit', function(event){
			if(annotationCheckbox.checked){
			editor.insertAuthorAnnotation(textboxContent.value);
		}else if(textBoxCheckbox.checked || textFrameCheckbox.checked){
			let divClass = "";
			if(textBoxCheckbox.checked){
				divClass = "textbox";
			}else{
				divClass = "frame";
			}
			let color = selectTextboxColor.selectedOptions[0].text.toLowerCase();

			editor.insertDivText(divClass, textboxContent.value, selectTextboxColor.value);
		}

			viewManager.closeDialog();
		});
  }
	changeSubmitEnabled(){
		if(this.annotationCheckbox.checked){
			this.textboxContent.disabled = false;
			if(this.textboxContent.value.length > 5){
				this.viewManager.enableButton(this.insertTextboxSubmit);
			}
		}else if(this.textFrameCheckbox.checked || this.textBoxCheckbox.checked)
		{
			this.viewManager.enableButton(this.insertTextboxSubmit);
		}
	}



}
