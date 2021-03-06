'use babel';

const iPath = require('path');
const LineEndingCorrector = require('line-ending-corrector').LineEndingCorrector
import ErrorMessageFormatter from './error-message-formatter';
const fs = require('fs');
const shell = require('shelljs');

export default class Helper{
  isBufferSelected(editor){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if(!editor.buffer.file){
      var formatter = new ErrorMessageFormatter();
      message = formatter.formatErrorMessage(language.selectMdFile, false);
      atom.notifications.addError(language.error, {
        detail : message,
        dismissable : true
      });
      return false;
    }else{
      return true;
    }
  }
  
  checkAndCorrectLineEnding(){
    var path = atom.workspace.getActivePaneItem().buffer.file.path;
    var data = fs.readFileSync(path);
    var res = LineEndingCorrector.correctSync(data.toString());
    if(res[0]) {
      fs.writeFile(path, res[1].toString(), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file with new line encoding has been saved!');
      });
    }
  }
  
  isBufferSelected(showErrorMessage = false){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if(!atom.workspace.getActivePaneItem() ||
       !atom.workspace.getActivePaneItem().buffer ||
        atom.workspace.getActivePaneItem().buffer.file == null){
      if(showErrorMessage){
        this.showErrorMessage();
      }
      return false;
    }else{
      return this.isSelectedAMarkdownFile(atom.workspace.getActivePaneItem().buffer.file,
                                          showErrorMessage);
    }
  }

  isSelectedAMarkdownFile(file, showErrorMessage){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if(iPath.extname(file.path)=='.md'){
      return true;
    }else{
      if(showErrorMessage){
        this.showErrorMessage();
      }
      return false;
    }
  }
  showErrorMessage(){
    var formatter = new ErrorMessageFormatter();
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    message = formatter.formatErrorMessage(language.selectMdFile, false);
    atom.notifications.addError(language.error, {
      detail : message,
      dismissable : true
    });
  }

  //
  isCursorInTable(){
    var editor = atom.workspace.getActivePaneItem();
    var linesArr = editor.buffer.lines; // all line of buffer
    var cursorRow = editor.cursors[0].getScreenPosition()['row'];
    var beginTable = this.findBeginComment(linesArr, cursorRow, "<!-- BEGIN OF TABLE -->");
    var endTable = this.findEndComment(linesArr, cursorRow, "<!-- END OF TABLE -->");
    if(beginTable != -1 && endTable != -1){

      var tableMd = editor.getTextInBufferRange({start:{column: 1,
                                                         row: beginTable},
                                                 end:{start: 1, row:endTable+1}} )
    }
  }
  //return line number
  findEndComment(lines, cursorRow, str){
    var pos = 0;
    for(var i = cursorRow+1; i < lines.length; i++){
        if(lines[i] == str){
          pos = i;
          break;
        }
    }
    return pos;
  }
  //return line number
  findBeginComment(lines, cursorRow, str){
    var pos = 0;
    for(var i = cursorRow; i >= 0; i--){
        if(lines[i] == str){
          pos = i;
          break;
        }
    }
    return pos;
  }


  generateErrorOutput(errors){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    var errorFormatter  = new ErrorMessageFormatter();
    let fileNames = Object.keys(errors);
    for (let i = 0; i < fileNames.length; i++) {
        let errorsInLines = errors[fileNames[i]];
        for (l = 0; l < errorsInLines.length; l++) {
            var message = '';
            let lines = Object.keys(errorsInLines[l]);
            if(typeof errorsInLines[l] === 'object'){
              for (j = 0; j < lines.length; j++) {
                message += language.line + lines[j] + ': \n' +"    ";
                message += errorsInLines[l][lines[j]];
                console.log("new message text: "+message);
                errorFormatter.formatErrorMessage(message, true) + '\n';
              }
            }else{
             message += errorsInLines[l];
            }
            let fileName = fileNames[i].split("..")[1];
            console.log("fileNames " +fileNames);
            if(!fileName){
              fileName = fileNames[i];
            }
            atom.notifications.addError(language.mistkerlFoundErrorInFile +
                                        fileName, {
              detail : errorFormatter.formatErrorMessage(message, true),
              dismissable : true
            });
        }
      }
  }

  // generate a table from json by papaparse
  getTableMarkdownFromJson(papasResult){
    var tableMarkdown = "";
    var csvAsJson = papasResult.data;
    var rows = csvAsJson.length;
    var columns = csvAsJson[0].length;
    if(this.hasTableLineBreaks(csvAsJson)){
      const TableColumnSpaces = 2;
      const ColumnWidthOffSet = 3;
      tableMarkdown = this.createGridTable(csvAsJson, csvAsJson[0].length,
                                          csvAsJson.length,
                                          true, TableColumnSpaces,
                                          ColumnWidthOffSet);
    }else{
      tableMarkdown = this.generatePipeTableFromJson(csvAsJson);
    }
    return tableMarkdown;
  }
  // returns the conversion profile
  getProfile(){
  var cb = document.getElementById("combobox_converion_profile")
  return cb.options[cb.selectedIndex].value;
  }



    /**
    * Calculates the column width depending on the each cell of the table
    * @param {array} table
    * @param {integer} columns count of columns
    * @param {integer} rows count of columns
    * @return {array} columnWidth array with maximum of the columns
    */
    caluateCellWidth(table, columns, rows){
      let columnWidths = [];
      for(j = 0; j < columns; j++){
          let width = 0;
          for(i=0; i < rows;i++){
            var cellValue = table[i][j];
            if(cellValue !== undefined){
              if(i==0){
                width = cellValue.length;
              }else if(width < cellValue.length){
                width = cellValue.length;
              }
            }
          }
          columnWidths.push(width);
      }
      return columnWidths;
    }
  /**
  * Create a grid table, see http://pandoc.org/MANUAL.html#tables
  * @param {object} Table as json
  * @param {integer} columns count of columns as integer
  * @param {integer} rows count of rows as integer
  * @param {boolean} tableHead Whether the table has a head row
  * @return {string} editorTable Markdown for createGridTable
  */
  createGridTable(table, columns, rows, hasHead, TableColumnSpaces,
                                      ColumnWidthOffSet){
    var editorTable = "";
    var columnWidths = this.caluateCellWidthMultiline(table, columns, rows);
    //console.log("columnWidths for createGridTable "+columnWidths);
    var separator = "";
    for(i=0; i < columns; i++){
      if(i==0){
        separator = "+" + "-".repeat(columnWidths[i] + ColumnWidthOffSet)
      }else{
        separator += "+" + "-".repeat(columnWidths[i] + ColumnWidthOffSet);
      }
    }
    separator += "+";
    //start with table
    editorTable = separator + "\n";
    for(j=0; j < rows;j++){
      if(j==0 && hasHead){
        //iterator over all columns
        for(k=0; k< columns; k++){
          var value = table[j][k];
          if(!value){
            value = "";
          }
          value = this.leftAlignmentOfContent(value,
                                        columnWidths[k], ColumnWidthOffSet, 0);
          editorTable += "|" + value;
        }
        editorTable += "| \n";
        editorTable += separator.replace(/-/g,"=");
        editorTable += "\n";
      }else if(table[j].length == columns){
        var linebreaksInRow = 0;
        linebreaksInRow = this.getLinebreakOfRow(table[j]); // multilineTable
        for(l = 0; l < linebreaksInRow; l++){
          for(k=0;k < columns; k++){
            var value;
            if(table[j][k] !== undefined){
            var cellValues = table[j][k].split("\n");
             value = cellValues[l];
            }
            if(!value){
              value = "";
            }
              value = this.leftAlignmentOfContent(value.replace("\"\"", "\""),
                                          columnWidths[k], ColumnWidthOffSet, 0);
                                          editorTable += "|" + value;
            }

            editorTable += "| \n";

        }
        editorTable += separator + "\n";
      }
    }

    //end with table
    console.log("editorTable \n" +editorTable);
    return editorTable;
  }


    /**
    * Return maximum line breaks of table row
    * @param {array} row a row of a table
    * @return {int} maxLinebreaks maximum line break of row
    */
    getLinebreakOfRow(row){
      var linebreaks = 0;
      for(i = 0; i < row.length;i++){
        var lines = row[i].split("\n").length
        if(linebreaks < lines){
          linebreaks = lines;
        }
      }
      return linebreaks;
    }


  /**
  * Calculates the column width depending on the each cell for multiline content
  * @param {array} table
  * @param {integer} columns count of columns
  * @param {integer} rows count of columns
  * @return {array} columnWidth array with maximum of the columns
  */
  caluateCellWidthMultiline(table, columns, rows){
    columnWidths = [];
    for(j = 0; j < columns; j++){
      width = 0;
      for(i=0; i < rows;i++){
        if(table[i][j] !== undefined){
          var contentOfCell = table[i][j].split("\n");
          for(k = 0; k < contentOfCell.length; k++){
            if(width < contentOfCell[k].length){
              width = contentOfCell[k].length;
            }
          }
        }
      }
      console.log("max width for " +j +" column is "+width);
      columnWidths.push(width);
    }
    return columnWidths;
  }

  /**
  * add additional space before the value of the cell depending on columnWidth
  * @param {string} value content of the cell
  * @param {integer} columnWidth
  * @param {integer} ColumnWidthOffSet
  * @param {integer} TableColumnSpaces
  * @return {string} newValue with spaces
  */
  leftAlignmentOfContent(value, columnWidth, ColumnWidthOffSet, TableColumnSpaces){
    const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const language = agsbs.language;
    if(!value){
      spaces  = columnWidth +ColumnWidthOffSet + TableColumnSpaces;
      result = " ".repeat(spaces);
    }else{
      if(value.includes("\r")){
        value = value.replace("\r","");
      }
      spaces = columnWidth + ColumnWidthOffSet +TableColumnSpaces  - value.length;
      try{
      result = value + " ".repeat(spaces);
      }catch(err){
        atom.notifications.addError(language.importTableError,
                  {detail : language.importTableErrorText, dismissable : true});
        return null;
      }
    }
    return result;
  }

/**
    * Return maximum line breaks of table row
    * @param {array} row a row of a table
    * @return {int} maxLinebreaks maximum line break of row
    */
    getLinebreakOfRow(row){
      var linebreaks = 0;
      for(i = 0; i < row.length;i++){
        var lines = row[i].split("\n").length
        if(linebreaks < lines){
          linebreaks = lines;
        }
      }
      return linebreaks;
    }


  /**
  * Calculates the column width depending on the each cell for multiline content
  * @param {array} table
  * @param {integer} columns count of columns
  * @param {integer} rows count of columns
  * @return {array} columnWidth array with maximum of the columns
  */
  caluateCellWidthMultiline(table, columns, rows){
    columnWidths = [];
    for(j = 0; j < columns; j++){
      width = 0;
      for(i=0; i < rows;i++){
        if(table[i][j] !== undefined){
          var contentOfCell = table[i][j].split("\n");
          for(k = 0; k < contentOfCell.length; k++){
            if(width < contentOfCell[k].length){
              width = contentOfCell[k].length;
            }
          }
        }
      }
      console.log("max width for " +j +" column is "+width);
      columnWidths.push(width);
    }
    return columnWidths;
  }

/* add additional space before the value of the cell depending on columnWidth
* @param {string} value content of the cell
* @param {integer} columnWidth
* @param {integer} ColumnWidthOffSet
* @param {integer} TableColumnSpaces
* @return {string} newValue with spaces
*/
leftAlignmentOfContent(value, columnWidth, ColumnWidthOffSet, TableColumnSpaces){
  const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
  const language = agsbs.language;
  if(!value){
    spaces  = columnWidth +ColumnWidthOffSet + TableColumnSpaces;
    result = " ".repeat(spaces);
  }else{
    if(value.includes("\r")){
      value = value.replace("\r","");
    }
    spaces = columnWidth + ColumnWidthOffSet +TableColumnSpaces  - value.length;
    try{
    result = value + " ".repeat(spaces);
    }catch(err){
      atom.notifications.addError(language.importTableError,
                {detail : language.importTableErrorText, dismissable : true});
      return null;
    }
  }
  return result;
}

generatePipeTableFromJson(csvAsJson){
		var rows = csvAsJson.length;
		var columns = csvAsJson[0].length;
    var ColumnWidthOffSet = 3;
    var TableColumnSpaces = 2;
    var columnWidths = this.caluateCellWidth(csvAsJson, columns, rows)
		var table = '';
		for (let c = 0; c < columns; c++) {
			table += '|' + this.leftAlignmentOfContent(csvAsJson[0][c], columnWidths[c], ColumnWidthOffSet, TableColumnSpaces );
		}
		table += '|\n';
		for (let c = 0; c < columns; c++) {
			table += '|' + "-".repeat(columnWidths[c] + ColumnWidthOffSet + TableColumnSpaces);
		}
		table += '|\n';
		for (let r = 1; r < rows; r++) {
			for (let c = 0; c < columns; c++) {
        if(csvAsJson[r][c]){
				  table += '|' + this.leftAlignmentOfContent(csvAsJson[r][c], columnWidths[c], ColumnWidthOffSet, TableColumnSpaces );
        }
			}
			if (r != rows - 1) {
				table += '|\n';
			}
		}
		return table;
  }

  hasTableLineBreaks(csvAsJson){
    hasLineBreaks = false;
    for(let row = 0; row < csvAsJson.length; row++){
      for(let col = 0; col < csvAsJson[row].length; col++){
        if(csvAsJson[row][col].includes("\n")){
          hasLineBreaks = true;
          return hasLineBreaks;
        }
      }
    }
    return hasLineBreaks;
  }
  /*
  * insert a text between to new lines
  */
  insertTextforRow(text, errorWindowText, errorDetailText){
    var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var selectedRange = editor.getSelectedBufferRange();
		if (selectedText == '') {
			let additionalRows;
			if (editor.isBufferRowBlank(selectedRange.start.row)) {
				additionalRows = 1;
				editor.insertNewlineBelow();
			} else {
				additionalRows = 2;
				editor.insertNewlineBelow();
				editor.insertNewlineBelow();
			}
			let bufferRange = {
				start: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				},
				end: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				}
			}
			editor.setTextInBufferRange(bufferRange, text);
			editor.setCursorBufferPosition({row: bufferRange.start.row, column:bufferRange.start.column});
			editor.insertNewlineBelow();
			editor.setCursorBufferPosition({row: bufferRange.start.row + 1, column:bufferRange.start.column});
			editor.insertNewlineBelow();
			editor.getElement().focus();
		} else {
			atom.notifications.addError(errorWindowText, {detail : errorDetailText, dismissable : true});
		}
  }    
  // creates directory recursively
  createDirectory(path){
      shell.mkdir('-p', path);
  }
  
  findLectureMetaDataDirectory(path){
    path = iPath.dirname(path);
    let lmdPath = `${path}/.lecture_meta_data.dcxml`//path to check
    // .lecture_meta_data path
    while (!fs.existsSync(lmdPath)){
      lmdPath = iPath.dirname(path);
    }
    return lmdPath;
  }
  
  createTimeStamp(){
    var time = Date.now()
    var date= new Date(time);
    timeStamp = `${date.getFullYear()}-`;
    timeStamp += `${date.getMonth()+1}-`;
    timeStamp += `${date.getDate()} `;
    timeStamp += `${date.getHours()}:`;
    timeStamp += `${date.getMinutes()}:`;
    timeStamp += `${date.getSeconds()}`;
    return timeStamp
  }
}
