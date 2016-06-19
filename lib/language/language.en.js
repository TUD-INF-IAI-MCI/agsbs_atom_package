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
