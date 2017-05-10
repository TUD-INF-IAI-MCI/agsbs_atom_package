'use babel';

export default class Language {

	constructor() {

		//general
		this.yes = 'Ja';
		this.no = 'Nein';
		this.SelectedWrongFileErrorDetail = 'Bitte wählen Sie eine .md oder .html Datei.';
		this.changesFromEditProjectDialogSaved = 'Ihre Änderungen wurden gespeichert.';
		this.error = 'Ein Fehler trat auf';
		this.wrongMatucVersion = "Installieren Sie die aktuelles Matuc Version. Die aktuelles Version ist ${version}.";
		this.begin = "Anfang";
		this.end = "Ende";
		this.checkFile = 'Überprüfen Sie die Datei ';
		this.errorMessage = 'Fehlermeldung lautet:';
		this.addContentHere = "HIER DEN INHALT EINFÜGEN UND FORMATIEREN";
		//temporary warnings
		this.noGitSupportJet = 'Git wird nicht unterstützt';
		this.noGitSupportJetDetail = 'Wir arbeiten daran, bitte versuchen Sie es später.';

		//main-navigation
		this.projectTitle = 'Projekt';
		this.cloneExistingRepo = "Klone eines Repos ohne matuc config init";
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
		this.commitChanges = 'Änderungen hochladen';
		this.languageTitle = 'Sprache';
		this.english = 'Englisch';
		this.german = 'Deutsch';
		//insert textboxes
		this.insertTextbox = "Annotation/Textbox einfügen";
		this.insertTextboxContent = "Inhalt der Anmerkung";
		this.textboxContentPlaceholder = "Nur bei Annotation des Bearbeiters erforderlich";
		this.textFrameCheckbox = "Textrahmen";
		this.textBoxCheckbox ="Textbox";
		this.textBox = "Textbox";
		this.textFrame = "Textrahmen";
		this.annotation = "Anmerkung des Bearbeiters"
		this.color = "Farbe";
		this.colorRed = "Rot";
		this.colorBlack = "Schwarz";
		this.colorGreen = "Grün";
		this.colorYellow = "Gelb";
		this.colorOrange = "Orange";
		this.allColors = "colorRed, colorBlack, colorGreen, colorYellow, colorOrange";
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
		this.formulaInline = 'Einfügen einer inline Formel';
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
		this.useGit = 'Git Repository verwenden';
		this.gitUser = 'Benutzername';
		this.gitPassword = 'Passwort';
		this.directory = 'Verzeichnis';
		this.noFolder = 'Keine Ordner ausgewählt';
		this.preface = 'Vorwort einfügen';
		this.chapters = 'Kapitel';
		this.appendixChapters = 'Kapitel im Anhang';
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
		this.sourceAuthor = 'Autor der Literaturquelle';
		this.semYear = 'Semester';
		this.workingGroup = 'Arbeitsgruppe';
		this.toc_Depth = 'Tiefe des Inhaltsverzeichnisses';
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
		this.noMdDetailGenerate = 'Bitte öffnen Sie eine Markdowndatei (*.md), um eine html-Datei zu generieren';
		this.noConfiguration = "Konfigurationsdatei, .lecture_meta_data.dcxml, fehlt im Projekt";
		this.unExpectedMatucError = 'Ein unerwarteter Matuc-Fehler trat auf';

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
		this.importTableFromCsvErrorDetail = 'Es kann kein Text durch eine CSV-Tabelle ersetzen.';
		this.AddPageNumberError = 'Es trat ein Fehler während der Generierung der Seitennummer auf. Die Matuc-Meldung lautet';

		//insert link dialog
		this.linkText = 'Linktext';
		this.linkTitle = 'Linktitel (optional)';
		this.link = 'URL';
		this.insert = 'Einfügen';

		//insert table dialog
		this.tableHeadCheckbox = 'Tabellenkopfzeile einfügen';
		this.tableType = 'Tabellentyp';
		this.simpleTable = "Simple Table";
		this.multilineTable = "Multiline Table";
		this.pipeTable = "Pipe Table";
		this.gridTable = "Grid Table";
		this.rows = 'Zeilen';
		this.columns = 'Spalten';
		this.head = 'Kopf';
		this.field = 'Feld';
		this.toFastError = 'Du bist zu schnell, Alter';
		this.toFastErrorDetails = 'Bitte chill ein bisschen.';
		this.selectTableType = 'Tabellentyp';
		this.thereAreNoTableInFolder = 'Keine Tabelle(n) im Ordner gefunden.';
		this.ErrorNoTable = 'Keine Tabellen gefunden!';
		this.thereAreNoTableInFolder = 'Keine Tabellen im Ordner.';
		this.addTableToFolder = 'Speichere csv-Dateien im Ordner ';
		this.selectTable = '...oder wähle hier eine aus';
		this.importTableError = "Fehler während des Tabellenimports";
		this.importTableErrorText = "Überprüfen Sie die CSV-Tabelle.";
		//insert graphic dialog
		this.selectImageFile = 'Bild auswählen';
		this.selectMdFile = 'Bitte öffnen Sie eine .md Datei, die zu einem Matuc Projekt gehört.';
		this.altText = 'Alternativtext';
		this.graphicFile = 'Wähle eine Datei aus';
		this.selectPicture = 'Gefundene Bilder';
		this.outsourceCheckbox = 'Bildbeschreibung auslagern';
		this.thereAreNoPicturesInFolder = "Es sind keine Bilder im Ordner gespeichert oder die Dateinamen enthalten Leerzeichen.";
		this.addPictureToFolder = "Speichern Sie Bilder im Ordner ";
		this.ErrorNoPicture = "Keine Bilder gefunden!"
		this.or = 'oder';
		this.uri = 'Füge Bilderlink hier ein';
		this.graphicTitle = 'Titel für die Grafik';
		this.somethingWentWrongDuringInsertOfGraphic = 'Ein unerwarteter Matuc-Fehler trat auf';
		this.imagesMdHasBeenWritten = 'wurde geschrieben.';

		//insert footnote dialog
		this.footLabel = 'Beschriftung für Fußnote';
		this.footText = 'Text in Fußnote';
		this.footLabelError = 'Ungültige Beschrieftung';
		this.footLabelErrorDetail = 'Label wird bereits verwendet. Bitte wählen Sie ein anderes Label aus.';

		//import csv dialog
		this.import = 'Importieren';
		this.uriTable = 'Füge Tabellenlink ein';
		//mistkerl
		this.mistkerlFoundGlobalError = 'Es ist ein globaler Fehler in deinen Markdowndateien aufgetreten.';
		this.mistkerlDidNotFindAnyErrorAndSavedFile = 'Gespeichert.';
		this.mistkerlDidNotFindAnyError = 'Es wurden keine Fehler gefunden.';
		this.mistkerlFoundErrorInFile = 'Es gibt Fehler in ';
		this.line = 'Zeile ';
		//dialog warningPagenumbering
		this.warningPagenumbering = "Warnung";
		this.warningPagenumbering = "Warning";
		this.correct = "Korrigieren";
		this.abort = "Abbruch";
		this.textAutoCorrection = "Wenn die Zahlen <strong>automatisch</strong> korrigiert werden sollen,<br />	klicken Sie auf <strong>Korrigieren</strong>.<br /> Zum manuellen Ändern klicken Sie auf Abbrechen!";
		this.checkLine = 'Überprüfen Sie Zeile: '
	}
}
