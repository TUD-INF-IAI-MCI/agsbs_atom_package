'use babel';

export default class Language {

	constructor() {

		//temporary warnings
		this.noGitSupportJet = 'Git is not supported';
		this.noGitSupportJetDetail = 'We are working on it, please try again later';

		//main-navigation
		this.projectTitle = 'Project';
		this.newProject = 'Create new project';
		this.editProject = 'Edit project data';
		this.documentTitle = 'Document';
		this.saveChanges = 'Save changes';
		this.undo = 'Undo | ctrl+z';
		this.redo = 'Redo | crtl+shift+z';
		this.preview = 'Show html preview';
		this.publishTitle = 'Publish';
		this.checkProject = 'Check entire project';
		this.commitChanges = 'Commit changes';
		this.languageTitle = 'Language';
		this.english = 'Englisch';
		this.german = 'German';


		//footer-panel
		this.emphasis = 'Emphasis';
		this.bold = 'Bold';
		this.italic = 'Italic';
		this.strikethrough = 'Strikethrough';
		this.headline = 'Headline';
		this.headline1 = 'First level headline';
		this.headline2 = 'Second level headline';
		this.headline3 = 'Third level headline';
		this.headline4 = 'Fourth level headline';
		this.headline5 = 'Fifth level headline';
		this.headline6 = 'Sixth level headline';
		this.list = 'List';
		this.orderedList = 'Create ordered list';
		this.unorderedList = 'Create unordered list';
		this.table = 'Table';
		this.insertTable = 'Insert table';
		this.importTableCsv = 'Import table from csv';
		this.insert = 'Insert';
		this.formula = 'Insert formula';
		this.insertLink = 'Insert link';
		this.insertGraphic ='Insert graphic';
		this.insertFootnote ='Insert footnote';
		this.authorAnnotation = 'Insert annotation';
		this.formatting = 'Formatting'
		this.blockquote = 'Create blockquote';
		this.code = 'Format as code';
		this.separator = 'Separator';
		this.horizontalRule = 'Add horizontal rule';
		this.newPage = 'Add new page';
		this.page = 'Page';
		this.slide = 'Slide';

		//dialog
		this.close = 'close';
		this.submit = 'Submit';

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
		this.create = 'Create';
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
		this.somethingWentWrongDuringCreatingNewProject = 'An unexpected matuc error occured';

		//edit metadata
		this.edit ='Save';
		this.alternatePrefix = 'Use "A" as prefix to appendix chapter numbering and turn the extra heading "appendix" (or translated equivalent) off';
		this.outputFormat = 'Output format';
		this.semYear = 'Semester of edit';
		this.workingGroup = 'Working group';
		this.editProjectSelectedWrongFileError = 'File does not belong to your project';
		this.editProjectSelectedWrongFileErrorDetail = 'Please select a .md or .html file.';
		this.changesFromEditProjectDialogSaved = 'Your changes has been saved.';
		this.somethingWentWrongDuringSavingProjectMetadata = 'An unexpected matuc error occured';

		//commit-changes-dialog
		this.commitMessage = 'Leave a few words about the changes you made...';
		this.commit = 'Commit';
		this.commitChangesSuccess = 'Your changes have been committed successfully.';
		this.commitChangesError = 'Your changes could not have been committed.';
		this.commitChangesErrorDetail = 'Maybe the file is stored in a wrong directory?\n';

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
		this.importTableFromCsvError = 'Failed to import table';
		this.importTableFromCsvErrorDetail = 'Can not replace text by table from CSV.';

		//insert link dialog
		this.linkText = 'Link text';
		this.linkTitle = 'Link title (optional)';
		this.link = 'URL';
		this.insert = 'Insert';

		//insert table dialog
		this.tableHeadCheckbox = 'Add a head to the table';
		this.rows = 'Rows';
		this.columns = 'Columns';
		this.head = 'Head';
		this.field = 'Field';
		this.toFastError = 'You are too fast, Dude';
		this.toFastErrorDetails = 'Please, do not treat the table this hard.';

		//insert graphic dialog
		this.altText = 'Alt text';
		this.graphicFile = 'Pick a file';
		this.or = 'or';
		this.uri = 'paste graphic\'s link here';
		this.graphicTitle = 'Title for graphic (optional)';
		this.somethingWentWrongDuringInsertOfGraphic = 'An unexpected matuc error occured';
		this.imagesMdHasBeenWritten = 'has been written';

		//insert footnote dialog
		this.footLabel = 'Label for footnote';
		this.footText = 'Text in footnote';
		this.footLabelError = 'Invalid label';
		this.footLabelErrorDetail = 'Label is already used. Please enter another label.';

		//import csv dialog
		this.import = 'Import';

		//mistkerl
		this.mistkerlFoundGlobalError = 'A global error in your markdown occured.';
		this.mistkerlDidNotFindAnyErrorAndSavedFile = 'Saved.';
		this.mistkerlDidNotFindAnyError = 'No errors have been detected.';
		this.mistkerlFoundErrorInFile = 'There is a mistake in ';
		this.line = 'Line ';
	}
}
