'use babel';

export default class Language {

	constructor() {

		//general
		this.yes = 'Ja';
		this.no = 'Nein';
		this.SelectedWrongFileErrorDetail = 'Bitte wählen Sie eine .md oder .html Datei.';
		this.changesFromEditProjectDialogSaved = 'Ihre Änderungen wurden gespeichert.';
		this.error = 'Ein Fehler trat auf';
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
		this.newProjectDialogMissingGitValueSource = 'Bitte geben Sie den git Pfad ein oder brechen Sie den Dialog ab.';
		this.newProjectDialogMissingGitValueUsername = 'Bitte geben Sie git username or brechen Sie den Dialog ab.';
		this.newProjectDialogMissingGitValuePassword = 'Bitte geben Sie git password or brechen Sie den Dialog ab.';
		this.newProjectDialogNoPath = 'Kein Pfad ausgewählt';
		this.newProjectDialogNoPathDetail = 'Bitte wählen Sie einen Pfad, wo das neue Projekt gespeichert werden soll.';
		this.newProjectDialogNoChapters = 'Keine Kapitel angegeben';
		this.newProjectDialogNoChaptersDetail = 'Es kann kein Projekt mit 0 Kapitel erzeugt werden.';
		this.newProjectDialogMissingMetadataValue = 'Fehlende Metadata';
		this.newProjectDialogMissingMetadataValueTitle = 'Bitte geben Sie den Namen für das Projekt an.';
		this.newProjectDialogMissingMetadataValueAuthor = 'Bitte geben Sie Ihren Namen an.';
		this.newProjectDialogMissingMetadataValueInstitution = 'Bitte geben Sie die Bezeichnung Ihrer Institution (z.B. Universität, Professur, Firma) an.';
		this.somethingWentWrongDuringCreatingNewProject = 'Ein unerwarteter Matuc-Fehler ist aufgetreten.';

		//edit metadata
		this.edit ='Speichern';
		this.alternatePrefix = 'Benutze "A" als Präfix fürdie Nummerierung von Anhängen und deaktivieren Sie die Option Anhang Präfix in der Konfiguration';
		this.outputFormat = 'Ausgabeformat';
		this.appendixPrefix = 'Anhang Präfix';
		this.sourceAuthor = 'Quellen Author';
		this.semYear = 'Semester';
		this.workingGroup = 'Arbeitsgruppe';
		this.toc_Depth = 'Tiefe des Inhaltsverzeichnises';
		this.SelectedWrongFileError = 'Datei gehört nicht zu Ihrem Projekt';
		this.somethingWentWrongDuringSavingProjectMetadata = 'Ein unerwarteter Matuc-Fehler ist aufgetreten.';

		//commit-changes-dialog
		this.commitMessage = 'Beschreiben Sie mit wenigen Worten was Sie geändert, ergänzt oder hinzugefügt haben...';
		this.commit = 'Commit';
		this.commitChangesSuccess = 'Ihre Änderungen wurden erfolgreich committet.';
		this.commitChangesError = 'Ihre Änderungen konnten nicht committet werden.';
		this.commitChangesErrorDetail = 'Vielleicht ist die Datei im falschen Ordner gespeichert?\n';
		this.userWantsToCommitChanges = 'Wollen Sie Ihre Änderungen jetzt committen?';

		//view functions
		this.noMdWarningPreview = 'Keine Markdown-Datei';
		this.noMdDetailPreview = 'Bitte öffnen Sie eine Markdowndatei (*.md) für die Markdown-Vorschau.';

		//matuc
		this.noMdWarningGenerate = 'Keine Markdown-Datei';
		this.noMdDetailGenerate = 'Bitte öffnen Sie eine Markdowndatei (*.md) um eine html-Datei zu generieren';

		//editor functions
		this.headlineError = 'Keine Überschrift möglich';
		this.headlineErrorDetail = 'Nur eine ausgewählte Zeile kann als eine Überschrift formatiert werden.';
		this.blockquoteError = 'Kein Zitat möglich';
		this.blockquoteErrorDetail = 'Nur eine ausgewählte Zeile kann als Zitat formatiert werden.';
		this.addHorizontalRuleError = 'Keine horizontale Linie möglich';
		this.addHorizontalRuleErrorDetail = 'Text kann nicht als horizontale Linie formatiert werden.';
		this.addListError = 'Keine Liste möglich';
		this.addListErrorDetail = 'Nur vollständig ausgewählten Zeilen können als  Listenelement formatiert werden';
		this.importTableFromCsvError = 'Fehler beim Tabellenimport';
		this.importTableFromCsvErrorDetail = 'Kann keinen Text mit einer CSV-Tabelle ersetzen';

		//insert link dialog
		this.linkText = 'Linktext';
		this.linkTitle = 'Linktitel (optional)';
		this.link = 'URL';
		this.insert = 'Einfügen';

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
		this.selectTabelType = 'Tabellentyp';
		this.selectTabelType = 'Tabellentyp';

		this.thereAreNoTableInFolder = 'Keine(n) Tabelle(n) im Ordner gefunden.';
		this.addTableToFolder = 'Speichere csv-Dateien im Ordner ';
		this.selectTable = '...oder wähle hier eine aus';
		//insert graphic dialog
		this.selectImageFile = 'Bild auswählen';
		this.selectMdFile = 'Öffnen .md Datei';
		this.altText = 'Alternativtext';
		this.graphicFile = 'Wähle eine Datei aus';
		this.thereAreNoPicturesInFolder = "Es sind keine Bilder im Ordner gespeichert.";
		this.addPictureToFolder = "Speichern Sie Bilder im Ordner ";
		this.ErrorNoPicture = "Keine Bilder gefunden!"
		this.or = 'oder';
		this.uri = 'Füge Bilderlink hier ein';
		this.graphicTitle = 'Titel für die Grafik (optional)';
		this.somethingWentWrongDuringInsertOfGraphic = 'Ein unerwarteter Matuc-Fehler trat auf';
		this.imagesMdHasBeenWritten = 'wurde geschrieben';
		this.selectPicture = '...oder wähle hier eins aus...';

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
		this.mistkerlFoundErrorInFile = 'Es gibt Fehler in ';
		this.line = 'Linie ';
	}
}
