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
		this.newPage = 'Add new page';
		this.page = 'Page';
		this.slide = 'Slide';
		this.insertLink = 'Insert link';
		this.insertTable = 'Insert table';
		this.insertGraphic ='Insert graphic';
		this.insertFootnote ='Insert footnote';

		//dialog
		this.close = 'close';

		//new-project
		this.useGit = 'Use a given git repository';
		this.gitUser = 'Username';
		this.gitPassword = 'Password';
		this.directory = 'Directory';
		this.noFolder = 'No folder set';
		this.preface = 'Add a preface to the document.';
		this.chapters = 'Chapters';
		this.appendixChapters = 'Appendix chapters';
		this.author = 'Author';
		this.title = 'Title';
		this.source = 'Source';
		this.institution = 'Institution';
		this.projectLanguage = 'Language';
		this.tableOfContents = 'Add a table of contents to the document.';
		this.tocDepth = 'Depth';
		this.submit = 'Submit';
		this.newProjectDialogMissingGitValue = 'Missing git value';
		this.newProjectDialogMissingGitValueSource = 'Please enter your git path or dismiss adding a git repository.';
		this.newProjectDialogMissingGitValueUsername = 'Please enter your git username or dismiss adding a git repository.';
		this.newProjectDialogMissingGitValuePassword = 'Please enter your git password or dismiss adding a git repository.';
		this.newProjectDialogNoPath = 'No path is set';
		this.newProjectDialogNoPathDetail = 'Please choose a path where you want to save your new project.';
		this.newProjectDialogNoChapters = 'No Chapters Set';
		this.newProjectDialogNoChaptersDetail = 'There is no way to create a project with 0 chapters.';
		this.newProjectDialogMissingMetadataValue = 'Missing Metadata';
		this.newProjectDialogMissingMetadataValueTitle = 'Please enter the name of your project.';
		this.newProjectDialogMissingMetadataValueAuthor = 'Please enter your name, your nickname or the name of someone else.';
		this.newProjectDialogMissingMetadataValueInstitution = 'Please enter the name of your Institution (i.e. university, company, mom).';

		this.noGitSupportJet = 'Git is not supported';
		this.noGitSupportJetDetail = 'We are working on it, please try again later';

		//view functions
		this.noMdWarningPreview = 'No markdown file';
		this.noMdDetailPreview = 'Please open a markdown file (*.md) to preview.';

		//matuc
		this.noMdWarningGenerate = 'No markdown file';
		this.noMdDetailGenerate = 'Please select a markdown file (*.md) to generate a html file.';

		//editor functions
		this.headlineError = 'No headline possible';
		this.headlineErrorDetail = 'Only a fully selected line can be declared as headline.';
		this.blockquoteError = 'No blockquote possible';
		this.blockquoteErrorDetail = 'Only a fully selected line can be declared as blockquote.';
		this.addHorizontalRuleError = 'No horizontal rule possible';
		this.addHorizontalRuleErrorDetail = 'Text can not be set as horizontal rule.';
		this.addListError = 'No list possible';
		this.addListErrorDetail = 'Only fully selected lines can be set as list items.';
		this.insertTableFromCsvError = 'Failed to insert table';
		this.insertTableFromCsvErrorDetail = 'Can not replace text by table from CSV.';


		//insert link dialog
		this.linkText = 'Link text';
		this.linkTitle = 'Link title (optional)';
		this.link = 'URL';

		//insert table dialog
		this.tableHeadCheckbox = 'Add a head to the table'
		this.rows = 'Rows';
		this.columns = 'Columns';
		this.head = 'Head';
		this.field = 'Field';
		this.toFastError = 'You are too fast, Dude';
		this.toFastErrorDetails = 'Please, do not treat the table this hard.';

		//insert graphic dialog
		this.altText = 'Alt text';
		this.graphicFile = 'Pick a file';
		this.uri = 'paste graphic\'s link here';
		this.graphicTitle = 'Title for graphic (optional)';

		//insert footnote dialog
		this.footText = 'Text in footnote';
	}
}
