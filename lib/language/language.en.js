'use babel';

export default class Language {

	constructor() {
		//for if-queries
		this.language = 'en';

		//main-navigation
		this.newProject = 'create new project';
		this.editProject = 'edit project data';
		this.preview = 'show html preview';
		this.undo = 'undo';
		this.redo = 'redo';

		//footer-panel
		this.headline1 = 'headine 1';
		this.bold = 'bold';
		this.italic = 'italic';
		this.strikethrough = 'strikethrough';
		this.headline1 = 'First level headline'
		this.headline2 = 'Second level headline'
		this.headline3 = 'Third level headline'
		this.headline4 = 'Fourth level headline'
		this.headline5 = 'Fifth level headline'
		this.headline6 = 'Sixth level headline'

		this.headlineError = 'Only whole line can be declared as headline.';

		//dialog
		this.close = 'close';

		//new-project
		this.gitPath = 'path to git repository';
		this.directory = 'directory';
		this.noFolder = 'no folder set';
		this.preface = 'preface';
		this.chapters = 'chapters';

	}
}
