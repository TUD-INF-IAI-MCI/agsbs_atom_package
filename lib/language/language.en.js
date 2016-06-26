'use babel';

export default class Language {

	constructor() {
		//main-navigation
		this.newProject = 'Create new project';
		this.editProject = 'Edit project data';
		this.preview = 'Show html preview';
		this.undo = 'Undo';
		this.redo = 'Redo';
		this.english = 'Englisch';
		this.german = 'German';

		//footer-panel
		this.bold = 'Bold';
		this.italic = 'Italic';
		this.strikethrough = 'Strikethrough';
		this.headline1 = 'First level headline';
		this.headline2 = 'Second level headline';
		this.headline3 = 'Third level headline';
		this.headline4 = 'Fourth level headline';
		this.headline5 = 'Fifth level headline';
		this.headline6 = 'Sixth level headline';
		this.formula = 'Insert formula';
		this.blockquote = 'Create blockquote';
		this.orderedList = 'Create ordered list';
		this.unorderedList = 'Create unordered list';
		this.horizontalRule = 'Add horizontal rule';
		this.code = 'Format as code';


		this.headlineError = 'Only whole line can be declared as headline.';
		this.blockquoteError = 'Only whole line can be declared as blockquote.';

		//dialog
		this.close = 'close';

		//new-project
		this.gitPath = 'Path to git repository';
		this.directory = 'Directory';
		this.noFolder = 'No folder set';
		this.preface = 'Preface';
		this.chapters = 'Chapters';
		this.appendixChapters = 'Appendix chapters';
		this.author = 'Author';
		this.title = 'Title';
		this.source = 'Source';
		this.institution = 'Institution';
		this.projectLanguage = 'Language';
		this.tableOfContents = 'Table of contents';
		this.tocDepth = 'Depth of table of contents';

	}
}
