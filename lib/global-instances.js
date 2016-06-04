import DialogView from './dialog-view';
import NewProjectDialog from './new-project-dialog';

import MainNavigationView from './main-navigation-view';
import FooterPanelView from './footer-panel-view';

import Matuc from './matuc-commands';
import EditorFunctions from './editor-functions';

import { CompositeDisposable } from 'atom';

export default class GlobalInstances {

	constructor() {
		this.mainNavigationView = new MainNavigationView(state.mainNavigationView);
	}
}
