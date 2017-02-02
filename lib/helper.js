'use babel';

const iPath = require('path');
import ErrorMessageFormatter from './error-message-formatter';

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
      }else{
        var linebreaksInRow = 0;
        linebreaksInRow = this.getLinebreakOfRow(table[j]); // multilineTable
        for(l = 0; l < linebreaksInRow; l++){
          for(k=0;k < columns; k++){
            var cellValues = table[j][k].split("\n");
            var value = cellValues[l];
            if(!value){
              value = "";
            }
            value = this.leftAlignmentOfContent(value,
                                          columnWidths[k], ColumnWidthOffSet, 0);
            editorTable += "|" + value;
          }
          editorTable += "| \n";
        }
        editorTable += separator + "\n";
      }
    }

    //end with table
    console.log("editorTable " +editorTable);
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
        var contentOfCell = table[i][j].split("\n");
        for(k = 0; k < contentOfCell.length; k++){
          if(width < contentOfCell[k].length){
            width = contentOfCell[k].length;
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
    console.log("left value "+value);
    if(!value){
      spaces  = columnWidth +ColumnWidthOffSet + TableColumnSpaces;
      result = " ".repeat(spaces);
    }else{
      spaces = columnWidth + ColumnWidthOffSet +TableColumnSpaces  - value.length;
      result = value + " ".repeat(spaces);
    }
    return result;
  }

  generatePipeTableFromJson(csvAsJson){
		var rows = csvAsJson.length;
		var columns = csvAsJson[0].length;
		var table = '';
		for (let c = 0; c < columns; c++) {
			table += '| ' + csvAsJson[0][c] + ' ';
		}
		table += '|\n';
		for (let c = 0; c < columns; c++) {
			table += '| ----- ';
		}
		table += '|\n';
		for (let r = 1; r < rows; r++) {
			for (let c = 0; c < columns; c++) {
        if(csvAsJson[r][c]){
				  table += '| ' + csvAsJson[r][c] + ' ';
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
          break;
        }
      }
      if(hasLineBreaks){
        break;
      }
    }
    return hasLineBreaks;
  }
}
