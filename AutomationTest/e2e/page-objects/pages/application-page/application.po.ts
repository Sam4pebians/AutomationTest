import {BasePage} from '../base-page';
import {By, element} from 'protractor';
import {ApplicationPageConstants} from './application-page.constants';
import {CommonPage} from '../common/common.po';
import {EnvironmentPageConstants} from '../environment-page/environment-page.constants';

export class ApplicationPage extends BasePage {

    static get createApplicationSectionTextBoxes() {
        return {
            gitRepositoryUri: element(By.id(ApplicationPageConstants.createApplicationSectionTextBoxesIds.gitRepositoryUriId)),
            applicationName: element(By.id(ApplicationPageConstants.createApplicationSectionTextBoxesIds.applicationNameId)),
            gitRepositoryUriClass: CommonPage.getDivContainsClass(ApplicationPageConstants.
                sectionDropDownSelectors.gitRepositoryURIId)
        };
    }

    static get createApplicationSectionButtons() {
        return {
            createApplication: element(By.id(ApplicationPageConstants.createApplicationSectionButtonsIds.createApplicationButtonId))
        };
    }

    static get createApplicationSectionDropDowns() {
        return {
            applicationLanguageId: element(By.id(ApplicationPageConstants.createApplicationSectionDropDownsIds.applicationLanguageId)),
            webApplicationFrameworkId: element(By.id(
                ApplicationPageConstants.createApplicationSectionDropDownsIds.webApplicationFrameworkId)),
            webApplicationFrameworkClass: CommonPage.getDivContainsClass(
                ApplicationPageConstants.sectionDropDownSelectors.webApplicationFrameworkClass)
        };
    }

    static get createApplicationSectionLabels() {
        return {
            triggerSampleRuby: element(By.id(ApplicationPageConstants.createApplicationSectionLabelsIds.triggerSampleRubyId))
        };
    }

    static get environmentNameSelectors() {
        return {
            environmentNameTextBox: element(By.id(EnvironmentPageConstants.environmentNameTextBox.environmentNameTextBoxId)),
            applicationName: element(By.id(ApplicationPageConstants.createApplicationSectionTextBoxesIds.applicationNameId))
        };
    }
}
