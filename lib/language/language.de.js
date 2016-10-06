'use babel';

export default class Language {

	constructor() {

		//general
		this.yes = 'Ja';
		this.no = 'Nein';
		this.SelectedWrongFileErrorDetail = 'Bitte wählen Sie eine .md oder .html Datei.';
		this.changesFromEditProjectDialogSaved = 'Ihre Änderungen wurden gespeichert.';

		//temporary warnings
		this.noGitSupportJet = 'Git wird nicht unterstützt';
		this.noGitSupportJetDetail = 'Wir arbeiten daran, bitte versuchen Sie es später.';

		//main-navigation
		this.projectTitle = 'Projekt';
		this.newProject = 'Erstelle neues Projekt';
		this.editProject = 'Editieren Projektdaten';
		this.documentTitle = 'Dokument';
		this.saveChanges = 'Speichere Änderungen';
		this.undo = 'Undo | ctrl+z';
		this.redo = 'Redo | crtl+shift+z';
		this.preview = 'Zeige html Vorschau';
		this.generateFile = 'Generiere HTML';
		this.convertEntireProject = 'Generiere HTML für alle Projektdateien';
		this.publishTitle = 'Veröffentlichen';
		this.checkProject = 'Kontrolliere das gesamte Projekt';
		this.commitChanges = 'Committe Änderungen';
		this.languageTitle = 'Sprache';
		this.english = 'Englisch';
		this.german = 'Deutsch';


		//footer-panel
		this.emphasis = 'Emphasis';
		this.bold = 'Fett';
		this.italic = 'Kursiv';
		this.strikethrough = 'Durchgestrichen';
		this.headline = 'Überschrift';
		this.headline1 = '1 Ebene Überschrift';
		this.headline2 = '2 Ebene Überschrift';
		this.headline3 = '3 Ebene Überschrift';
		this.headline4 = '4 Ebene Überschrift';
		this.headline5 = '5 Ebene Überschrift';
		this.headline6 = '6 Ebene Überschrift';
		this.list = 'Liste';
		this.orderedList = 'Erzeuge nummerierte Liste';
		this.unorderedList = 'Erzeuge einfache Lise';
		this.table = 'Tabelle';
		this.insertTable = 'Einfügen einer Tabelle';
		this.importTableCsv = 'Importiere Tabelle aus csv';
		this.insert = 'Einfügen';
		this.formula = 'Einfügen einer Formel';
		this.formula = 'Einfügen einer inline Formel';
		this.insertLink = 'Einfügen Link';
		this.insertGraphic ='Einfügen Graphic';
		this.insertFootnote ='Einfügen Fußnote';
		this.authorAnnotation = 'Einfügen Annotation';
		this.formatting = 'Formatierungen'
		this.blockquote = 'Erzeuge Zitat';
		this.code = 'Formatiere als Quellcode';
		this.separator = 'Separator';
		this.horizontalRule = 'Füge horizontale Linie ein';
		this.newPage = 'Ergänze neue Seite';
		this.page = 'Seite';
		this.slide = 'Folie';

		//dialog
		this.close = 'Schließe';
		this.submit = 'Bestätigen';

		//new-project
		this.useGit = 'Use a given git repository';
		this.gitUser = 'Benutzername';
		this.gitPassword = 'Passwort';
		this.directory = 'Verzeichnis';
		this.noFolder = 'Keine Ordner ausgewählt';
		this.preface = 'Vorwort einfügen';
		this.chapters = 'Kapitel';
		this.appendixChapters = 'Appendix chapters';
		this.author = 'Autor';
		this.title = 'Titel';
		this.source = 'Quelle';
		this.institution = 'Institution';
		this.projectLanguage = 'Sprache';
		this.tableOfContents = 'Inhaltsverzeichnis hinzufügen zum Dokument';
		this.tocDepth = 'Tiefe';
		this.materialSource = 'Quell-Material';
		this.create = 'Erzeuge';
		this.newProjectDialogMissingGitValue = 'Fehlender git wert';
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
		this.SelectedWrongFileError = 'File does not belong to your project';
		this.somethingWentWrongDuringSavingProjectMetadata = 'An unexpected matuc error occured';

		//commit-changes-dialog
		this.commitMessage = 'Leave a few words about the changes you made...';
		this.commit = 'Commit';
		this.commitChangesSuccess = 'Your changes have been committed successfully.';
		this.commitChangesError = 'Your changes could not have been committed.';
		this.commitChangesErrorDetail = 'Maybe the file is stored in a wrong directory?\n';
		this.userWantsToCommitChanges = 'Do you want to commit your changes now?';

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
		this.tableType = 'Table Type';
		this.simpleTable = "Simple Table";
		this.multilineTable = "Multiline Table";
		this.pipeTable = "Pipe Table";
		this.gridTable = "Grid Table";
		this.rows = 'Rows';
		this.columns = 'Columns';
		this.head = 'Head';
		this.field = 'Field';
		this.toFastError = 'You are too fast, Dude';
		this.toFastErrorDetails = 'Please, do not treat the table this hard.';

		//insert graphic dialog
		this.selectImageFile = 'Bild auswählen',		
		this.altText = 'Alternativtext';
		this.graphicFile = 'Wähle eine Datei aus';
		this.or = 'oder';
		this.uri = 'Füge Bilderlink hier ein';
		this.graphicTitle = 'Titel für die Grafik (optional)';
		this.somethingWentWrongDuringInsertOfGraphic = 'Ein unerwarteter Matuc-Fehler trat auf';
		this.imagesMdHasBeenWritten = 'wurde geschrieben';

		//insert footnote dialog
		this.footLabel = 'Label für Fußnote';
		this.footText = 'Text in Fußnote';
		this.footLabelError = 'ungültiges Label';
		this.footLabelErrorDetail = 'Label wird bereits verwendet. Bitte wählen Sie ein anderes Label aus.';

		//import csv dialog
		this.import = 'Import';

		//mistkerl
		this.mistkerlFoundGlobalError = 'Ein globaler Fehler trat in deiner Markdowndatei auf';
		this.mistkerlDidNotFindAnyErrorAndSavedFile = 'Gespeichert.';
		this.mistkerlDidNotFindAnyError = 'Keine Fehler wurden gefunden.';
		this.mistkerlFoundErrorInFile = 'Es gibt einen Fehler in ';
		this.line = 'Linie ';
	}
}
