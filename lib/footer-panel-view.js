'use babel';

//creates DOM elements for the footer panel
export default class FooterPanelView {

	test() {
		console.log('lässig');
	}

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;
		const matuc = agsbs.matuc;

		const insertLinkDialog = agsbs.renderInsertLinkDialog();
		const insertTableDialog = agsbs.renderInsertTableDialog();
		const insertGraphicDialog = agsbs.renderInsertGraphicDialog();
		const insertFootnoteDialog = agsbs.renderInsertFootnoteDialog();
		const importTableCsvDialog = agsbs.renderImportTableCsvDialog();


		//create root element
		this.element = document.createElement('div');
		this.element.classList.add('footer_panel_container');

		const boldButton = viewManager.addButton(this.element, 'bold', language.bold, 'fa-bold', editor.setBold, undefined, 'alt + shift + b');
		const italicButton = viewManager.addButton(this.element, 'italic', language.italic, 'fa-italic', editor.setItalics, undefined, 'alt + shift + i');
		const striketroughButton = viewManager.addButton(this.element, 'strikethrough', language.strikethrough, 'fa-strikethrough', editor.strikethrough, undefined, 'alt + shift + s');
		viewManager.groupButtons(language.emphasis, [boldButton, italicButton, striketroughButton]);
		const h1Button = viewManager.addButton(this.element, 'headline1', language.headline1, 'h1', editor.headline, 1, 'alt + shift + 1');
		const h2Button = viewManager.addButton(this.element, 'headline2', language.headline2, 'h2', editor.headline, 2, 'alt + shift + 2');
		const h3Button = viewManager.addButton(this.element, 'headline3', language.headline3, 'h3', editor.headline, 3, 'alt + shift + 3');
		const h4Button = viewManager.addButton(this.element, 'headline4', language.headline4, 'h4', editor.headline, 4, 'alt + shift + 4');
		const h5Button = viewManager.addButton(this.element, 'headline5', language.headline5, 'h5', editor.headline, 5, 'alt + shift + 5');
		const h6Button = viewManager.addButton(this.element, 'headline6', language.headline6, 'h6', editor.headline, 6, 'alt + shift + 6');
		viewManager.groupButtons(language.headline, [h1Button, h2Button, h3Button, h4Button, h5Button, h6Button]);
		const orderedListButton = viewManager.addButton(this.element, 'ordered-list', language.orderedList, 'fa-list-ol', editor.addList, 'ordered', 'alt + shift + o');
		const unorderedListButton = viewManager.addButton(this.element, 'unordered-list', language.unorderedList, 'fa-list-ul', editor.addList, 'unordered', 'alt + shift + u');
		viewManager.groupButtons(language.list, [orderedListButton, unorderedListButton]);
		const tableButton = viewManager.addButton(this.element, 'table', language.insertTable, 'fa-table', viewManager.toggleDialog, insertTableDialog);
		const importTableButton = viewManager.addButton(this.element, 'table-csv', language.importTableCsv, 'fa-file-excel-o', viewManager.toggleDialog, importTableCsvDialog);
		viewManager.groupButtons(language.table, [tableButton, importTableButton]);
		const formulaButton = viewManager.addButton(this.element, 'formula', language.formula, 'fa-superscript', editor.insertFormula, undefined, 'alt + shift + f');
		const codeButton = viewManager.addButton(this.element, 'code', language.code, 'fa-code', editor.formatAsCode, undefined, 'alt + shift + c');
		const blockquoteButton = viewManager.addButton(this.element, 'blockquote', language.blockquote, 'fa-quote-right', editor.blockquote, undefined, 'alt + shift + q');
		viewManager.groupButtons(language.formatting, [formulaButton, codeButton, blockquoteButton]);
		const linkButton = viewManager.addButton(this.element, 'link', language.insertLink, 'fa-link', viewManager.toggleDialog, insertLinkDialog.panel, 'alt + shift + l');
		const graphicButton = viewManager.addButton(this.element, 'graphic', language.insertGraphic, 'fa-picture-o', viewManager.toggleDialog, insertGraphicDialog.panel);
		const footnoteButton = viewManager.addButton(this.element, 'footnote', language.insertFootnote, 'footnote', viewManager.toggleDialog, insertFootnoteDialog.panel);
		const annotationButton = viewManager.addButton(this.element, 'annotation', language.authorAnnotation, 'fa-pencil-square-o', editor.insertAuthorAnnotation, undefined, '');
		viewManager.groupButtons(language.insert, [linkButton, graphicButton, footnoteButton, annotationButton])
		const horizontalRuleButton = viewManager.addButton(this.element, 'horizontal-rule', language.horizontalRule, 'hr', editor.addHorizontalRule, undefined, 'alt + shift + r');
		const newPageButton = viewManager.addButton(this.element, 'page', language.newPage, 'fa-file-o', editor.newPage, undefined, 'alt + shift + p');
		viewManager.groupButtons(language.separator, [horizontalRuleButton, newPageButton]);

		linkButton.addEventListener('click', function() {
			insertLinkDialog.instance.setSelectedAsLinkText();
		});

		graphicButton.addEventListener('click', function() {
			insertGraphicDialog.instance.setSelectedAsAltText();
		});

		footnoteButton.addEventListener('click', function() {
			insertFootnoteDialog.instance.setSelectedTextAsLabel();
		});
	}

	// Returns an object that can be retrieved when package is activated
	serialize() {}

	// Tear down any state and detach
	destroy() {
		this.element.remove();
	}

	getElement() {
		return this.element;
	}
}
