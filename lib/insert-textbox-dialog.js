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
      if(textBoxCheckbox.checked){
        textBoxCheckbox.checked = !textBoxCheckbox.checked;
				selectTextboxColor.disabled = false;
      }else if(annotationCheckbox.checked){
				annotationCheckbox.checked = !annotationCheckbox.checked;
				selectTextboxColor.disabled = true;
			}
			main.changeSubmitEnabled();
    });
    const textBoxCheckbox = viewManager.addCheckbox(headerCheckboxContainer, 'is_text_box', language.textBoxCheckbox);
		this.textBoxCheckbox = textBoxCheckbox;
		textBoxCheckbox.setAttribute('tabindex', 1);
    textBoxCheckbox.addEventListener('change', function() {
      if(textFrameCheckbox.checked){
        textFrameCheckbox.checked = !textFrameCheckbox.checked;
				selectTextboxColor.disabled = false;
      }else if(annotationCheckbox.checked){
				annotationCheckbox.checked = !annotationCheckbox.checked;
				selectTextboxColor.disabled = true;
			}
			main.changeSubmitEnabled();
    });
		const annotationCheckbox = viewManager.addCheckbox(headerCheckboxContainer, 'is_annotation', language.annotation);
		this.annotationCheckbox = annotationCheckbox;
		annotationCheckbox.setAttribute('tabindex',1);
		annotationCheckbox.addEventListener('change', function(){
			if(annotationCheckbox.checked){
				selectTextboxColor.disabled = true;
			}
			if(textFrameCheckbox.checked){
        textFrameCheckbox.checked = !textFrameCheckbox.checked;
      }else if(textBoxCheckbox.checked){
				textBoxCheckbox.checked = !textBoxCheckbox.checked;
			}
			main.changeSubmitEnabled();
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
        case "colorBrown":
          option.text = language.colorBrown;
          break;
				case "colorGrey":
          option.text = language.colorGrey;
					break;
				case "colorViolet":
          option.text = language.colorViolet;
					break;
				case "colorBlue":
          option.text = language.colorBlue;
					break;
        default:
          break;
      }
			option.value = color.replace("color","").toLowerCase().trim();
			selectTextboxColor.add(option);
    });
		this.selectTextboxColor = selectTextboxColor;
		//Textbox title
		insertTextboxForm.appendChild(document.createElement('br'));
		this.TextboxTitle = document.createElement('label');
		this.TextboxTitle.innerHTML = language.insertTextboxTitle;
		insertTextboxForm.appendChild(this.TextboxTitle);
		insertTextboxForm.appendChild(document.createElement('br'));
		const textboxTitleContent = viewManager.addTextarea(insertTextboxForm, 'insert_textbox_title', language.insertTextboxTitle);
		this.textboxTitleContent = textboxTitleContent;
		insertTextboxForm.appendChild(textboxTitleContent);
		//Textbox content
		this.insertTextboxContent = document.createElement('label');
		this.insertTextboxContent.innerHTML = language.insertTextboxContent;
		insertTextboxForm.appendChild(this.insertTextboxContent);
		insertTextboxForm.appendChild(document.createElement('br'));
    const textboxContent = viewManager.addTextarea(insertTextboxForm, 'insert_textbox_content', language.insertTextboxContent);
		this.textboxContent = textboxContent;
		this.textboxContent.addEventListener('input', function(event){
				main.changeSubmitEnabled();
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
				divClass = "box";
			}else{
				divClass = "frame";
			}
			let color = selectTextboxColor.selectedOptions[0].text.toLowerCase();

			editor.insertDivText(divClass, textboxTitleContent.value, textboxContent.value, selectTextboxColor.value);
		}

			viewManager.closeDialog();
		});
  }
	changeSubmitEnabled(){
		if(!this.textFrameCheckbox.checked && !this.textBoxCheckbox.checked &&
			 !this.annotationCheckbox.checked || this.textboxContent.value.length < 5)
		{
			this.viewManager.disableButton(this.insertTextboxSubmit);
		}else if(this.textboxContent.value.length >= 5){
			this.viewManager.enableButton(this.insertTextboxSubmit);
		}
	}

	resetButton(){
		this.viewManager.disableButton(this.insertTextboxSubmit);
	}


}
