import {TextboxHelper} from '../../../components/html/textbox-helper';
import {PageHelper} from '../../../components/html/page-helper';
import {CommonPageHelper} from '../common/common-page.helper';
import {HomePage} from './home.po';
import {HomePageConstants} from './home-page.constants';
import {HomePageValidations} from './home-page.validations';
import {CommonPageConstants} from '../common/common-page.constants';
import {ElementArrayFinder} from 'protractor';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {ApplicationPageHelper} from '../application-page/application-page.helper';
import {ApplicationPageConstants} from '../application-page/application-page.constants';
import {EnvironmentPageHelper} from '../environment-page/environment-page.helper';
import {EnvironmentPageConstants} from '../environment-page/environment-page.constants';
import {ConfigurationPageHelper} from '../configuration-page/configuration-page.helper';
import {StepLogger} from '../../../../core/logger/step-logger';

export class HomePageHelper {
    static async login(emailId: string, password: string) {
        // *Step* - Enter Username
        await TextboxHelper.sendKeys(HomePage.emailTextBox, emailId);
        // *Step* - Enter Password
        await TextboxHelper.sendKeys(HomePage.passwordTextBox, password);
        // *Step* - Click on "LOGIN" button.
        await PageHelper.click(HomePage.logInButton);
        if (await PageHelper.isElementPresent(HomePage.skip2FAAuthentication)) {
            await PageHelper.click(HomePage.skip2FAAuthentication);
        }
    }

    static async loginToApp() {
        await this.login(
            CommonPageHelper.userEmail,
            CommonPageHelper.userPassword
        );
    }

    static async loginToAppInvalidCred() {
        await this.login(
            CommonPageHelper.invalidUserName,
            CommonPageHelper.InvalidPassword
        );
    }

    static async verifyLoginPage() {
        await expect(await PageHelper.isElementDisplayed(HomePage.logInButton))
            .toBe(true, ValidationsHelper.getButtonDisplayedValidation(HomePageConstants.buttonText.logInButton));
    }

    static async verifyEngineYardCloudPage() {
        await expect(await PageHelper.isElementDisplayed(HomePage.homePageHeader))
            .toBe(true, HomePageValidations.getHeaderDisplayedValidation(CommonPageConstants.pageHeaders.eyCloudHeader));
    }

    static async verifyHomeTableColumnDataBasedOnAnotherColumnData(
        tableColumns: ElementArrayFinder, columnName: string, referenceColumnValue: string, expectedColumnValue: string) {
        const columnIndex = await CommonPageHelper.getColumnIndexByColumnName(tableColumns, columnName);
        const columnData = await PageHelper.getText(
            HomePage.getHomeTableColumnBasedOnAnotherColumn(referenceColumnValue, columnIndex));
        await expect(columnData).toEqual(expectedColumnValue, ValidationsHelper.getDisplayedValidation(expectedColumnValue));
    }

    static async logout() {
        await PageHelper.click(HomePage.getAccountDropDown());
        await PageHelper.click(HomePage.getSignOutLink());
        await expect(await PageHelper.isElementDisplayed(HomePage.emailTextBox)).toBe(
            true, ValidationsHelper.getDisplayedValidation(HomePageConstants.textBoxesTexts.email));
    }

    static async createApplicationEnvironmentAndNavigateToConfigurationPage(applicationName: string,
                                                                            environmentName: string, stepLogger: StepLogger) {
        await ApplicationPageHelper.createApplication(
            ApplicationPageConstants.languageDropDownValues.ruby, applicationName,
            ApplicationPageConstants.languageDropDownValues.railsFour, stepLogger);
        await EnvironmentPageHelper.verifyEnvironmentPage(applicationName, stepLogger);

        await EnvironmentPageHelper.createNewEnvironment(environmentName,
            EnvironmentPageConstants.createEnvironmentDropDownValues.staging, stepLogger);
        await ConfigurationPageHelper.verifyConfigurationPage(environmentName, stepLogger);
        stepLogger.step('Refresh the page');
        await PageHelper.refreshPage();
    }
}
