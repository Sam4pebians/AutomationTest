import {PageHelper} from '../../../components/html/page-helper';
import {HomePage} from '../home-page/home.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {CommonPageConstants} from '../common/common-page.constants';
import {browser, ElementFinder} from 'protractor';
import {HomePageValidations} from '../home-page/home-page.validations';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {DropDownHelper} from '../../../components/html/dropdown-helper';
import {ApplicationPage} from './application.po';
import {TextboxHelper} from '../../../components/html/textbox-helper';
import {EnvironmentPage} from '../environment-page/environment.po';
import {EnvironmentPageConstants} from '../environment-page/environment-page.constants';
import {ElementHelper} from '../../../components/html/element-helper';
import {ApplicationPageConstants} from './application-page.constants';
import {Constants} from '../../../components/misc-utils/constants';
import {CommonPage} from '../common/common.po';
import {HtmlHelper} from '../../../components/misc-utils/html-helper';
import {CommonPageHelper} from '../common/common-page.helper';

const addAnApplicationLink = HomePage.addAnApplicationLink;

export class ApplicationPageHelper {
    static async createApplication(applicationLanguage: string, applicationName: string, webApplicationFramework: string,
                                   stepLogger: StepLogger) {

        stepLogger.verification('Verify "Add an Application" link is available in "Engine Yard Cloud" Home page');
        await expect(await PageHelper.isElementDisplayed(addAnApplicationLink))
            .toBe(true, ValidationsHelper.getLinkDisplayedValidation(CommonPageConstants.buttonLink.addAnApplication));

        stepLogger.step('Click on "Add an Application" link');
        await PageHelper.click(addAnApplicationLink);

        stepLogger.step('Wait for the element to be loaded properly');
        await browser.sleep(PageHelper.timeout.xs);

        stepLogger.verification('Verify "Create a new application" page is displayed by clicking "Add an Application" link');
        await expect(await PageHelper.isElementDisplayed(HomePage.createNewApplicationPageHeader))
            .toBe(true, HomePageValidations.getHeaderDisplayedValidation(CommonPageConstants.pageHeaders.createNewApplication));

        stepLogger.step('Select value  in "Application Language" drop down ');
        await DropDownHelper.selectOptionByText(
            ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId, applicationLanguage);

        stepLogger.step('Click the sample app link [Rails app] displayed below "Git Repository URI" text box');
        await PageHelper.click(ApplicationPage.createApplicationSectionLabels.triggerSampleRuby);

        stepLogger.step('Change the Application Name');
        await TextboxHelper.sendKeys(ApplicationPage.createApplicationSectionTextBoxes.applicationName, applicationName);

        stepLogger.step('Select value in "Web Application Framework" drop down');
        await DropDownHelper.selectOptionByText(
            ApplicationPage.createApplicationSectionDropDowns.webApplicationFrameworkId, webApplicationFramework);

        stepLogger.step('Click "Create Application" button displayed at the bottom of "Create a new application" page');
        await PageHelper.click(ApplicationPage.createApplicationSectionButtons.createApplication);
    }

    static async clickOnAddApplicationLink(stepLogger: StepLogger) {
        stepLogger.step('Click on the "Add Application" link');
        await PageHelper.click(addAnApplicationLink);
    }

    static async verifyNavigation(stepLogger: StepLogger) {
        stepLogger.verification('Verify "Create a new application" page is displayed by clicking "Add an Application" link');
        await expect(await PageHelper.isElementDisplayed(HomePage.createNewApplicationPageHeader))
            .toBe(true,
                 HomePageValidations.getHeaderDisplayedValidation(CommonPageConstants.pageHeaders.createNewApplication));
    }

    static async clickOnNextButton(stepLogger: StepLogger) {
        stepLogger.step('Click on Next>> button');
        await PageHelper.click(EnvironmentPage.createEnvironmentButtons.nextButton);
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
    }

    static async clickOnPrevButton(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on <<Prev button');
        await PageHelper.click(EnvironmentPage.createEnvironmentButtons.nextButton);
    }

    static async clickOnCreateApplicationButton(stepLogger: StepLogger) {
        stepLogger.step('Click on Create Application button');
        await PageHelper.click(EnvironmentPage.createEnvironmentButtons.createApplicationButton);
    }

    static async clickOnDropDownApplicationLanguage(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xxs);
        stepLogger.step('Click on the drop down "Application Language"');
        await PageHelper.click(ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId);
    }

    static async verifyDropDownValuesApplicationLanguage(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xxs);
        stepLogger.verification('Check the values displayed in this drop down');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.messageDisplayedSelector.messageDisplayedClass))
            .toBe(true,
                 ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.verifyMessages.messageFormSubmission));
    }

    static async verifyOptionValue(stepLogger: StepLogger, select: ElementFinder, option: string) {
        stepLogger.verification(`Check the value-${option} displayed in the drop down`);
        await expect(await ElementHelper.hasOption(select , option))
        .toBe(true,
            ValidationsHelper.getLabelDisplayedValidation(option));
    }

    static async verifyDefaultOptionValue(stepLogger: StepLogger) {
        await this.verifyOptionValue(stepLogger,
            ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.ruby);
    }

    static async selectOptionFromDropdown(stepLogger: StepLogger, locator: ElementFinder , option: string) {
        stepLogger.step(`Select value as "${option}"  from dropdown`);
        await DropDownHelper.selectOptionByText(locator, option);
    }

    static async verifyWebApplicationFrameworkDropdown(stepLogger: StepLogger) {
        if (await PageHelper.isElementDisplayed(ApplicationPage.createApplicationSectionDropDowns.webApplicationFrameworkClass)) {
            stepLogger.step('Verify the Web Application Framework dropdown is displayed');
            await expect(await PageHelper.isElementDisplayed(
                ApplicationPage.createApplicationSectionDropDowns.webApplicationFrameworkClass))
                .toBe(true,
                    ValidationsHelper.getDisplayedValidation(ApplicationPageConstants.sectionLabels.webApplicationFrameworkLabel));
        } else {
            stepLogger.step('Verify the Web Application Framework dropdown is hidden');
            await expect(await PageHelper.isElementDisplayed(ApplicationPage.createApplicationSectionDropDowns.webApplicationFrameworkId))
            .toBe(false,
                ValidationsHelper.getDisplayedValidation(ApplicationPageConstants.languageDropDownValues.railsFour));
        }
    }

    static async verifyApplicationLanguageDropDownValues(stepLogger: StepLogger) {
        await this.verifyOptionValue(stepLogger,
            ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.ruby);
        await this.verifyOptionValue(stepLogger,
            ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.nodeJs);
        await this.verifyOptionValue(stepLogger,
            ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.php);
    }

    static async verifyEmptyDisplayedInEnvName(stepLogger: StepLogger) {
        stepLogger.verification('Verify no value displayed in the Environment Text Box');
        const attributeValue = await ApplicationPage.environmentNameSelectors.environmentNameTextBox.getAttribute(
            HtmlHelper.additionalAttributes.value);
        await expect(attributeValue).toBe(Constants.EMPTY_STRING, ValidationsHelper.getDisplayedValidation(Constants.EMPTY_STRING));

    }

    static async verifyCreateApplicationFailureMessage(stepLogger: StepLogger) {
        await CommonPageHelper.verifyDisplayedElement(stepLogger, EnvironmentPage.messageDisplayedSelector.messageDisplayedClass,
             EnvironmentPageConstants.verifyMessages.messageFormSubmission);
        await CommonPageHelper.verifyDisplayedElement(stepLogger, EnvironmentPage.messageDisplayedSelector.messageDisplayedClass,
             EnvironmentPageConstants.verifyMessages.messageApp);
        await CommonPageHelper.verifyDisplayedElement(stepLogger, EnvironmentPage.messageDisplayedSelector.messageDisplayedClass,
            EnvironmentPageConstants.verifyMessages.messageGitRepo);
    }

    static async verifyCreateEnvFailureMessage(stepLogger: StepLogger) {
        await CommonPageHelper.verifyDisplayedElement(stepLogger, EnvironmentPage.messageDisplayedSelector.errorMessageDisplayedClass,
            EnvironmentPageConstants.verifyMessages.messageFormSubmission1);
        await CommonPageHelper.verifyDisplayedElement(stepLogger, EnvironmentPage.messageDisplayedSelector.errorMessageDisplayedClass,
            EnvironmentPageConstants.verifyMessages.messageEnvName);
    }

    static async verifyAppLinkDisplayed(stepLogger: StepLogger, app: string) {
        stepLogger.verification(`Verify the app link "${app}" displayed below the GIT repo URI textbox`);
        await expect(await PageHelper.isElementDisplayed(ApplicationPage.createApplicationSectionTextBoxes.gitRepositoryUriClass))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(app));
    }

    static async clickOnAppLinkDisplayed(stepLogger: StepLogger, app: string) {
        stepLogger.verification(`Click on the app link "${app}" displayed below the GIT repo URI textbox`);
        await PageHelper.click(CommonPage.getAnchorContainsText(app));
    }

    static async verifyGitRepoPopulatedInTextBox(stepLogger: StepLogger, repo: string) {
        stepLogger.verification(`Verify the git repo "${repo}" autopopulated in the GIT repo URI textbox`);
        const attributevalue = await ApplicationPage.createApplicationSectionTextBoxes.gitRepositoryUri.getAttribute(
            HtmlHelper.additionalAttributes.value);
        await expect(attributevalue).toBe(repo, ValidationsHelper.getFieldDisplayedValidation(repo));
    }

    static async verifyAppLinksShownBelowTextBox(stepLogger: StepLogger) {
        await this.selectOptionFromDropdown(
            stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.nodeJs);
        await this.verifyAppLinkDisplayed(stepLogger,
            ApplicationPageConstants.languageDropDownValues.nodeJs);

        await this.selectOptionFromDropdown(
            stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.php);
        await this.verifyAppLinkDisplayed(stepLogger,
            ApplicationPageConstants.languageDropDownValues.php);

        await this.selectOptionFromDropdown(
            stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.ruby);
        await this.verifyAppLinkDisplayed(stepLogger,
            ApplicationPageConstants.languageDropDownValues.ruby);
    }

    static async clickLinkShownBelowTextBox(stepLogger: StepLogger) {
        await this.selectOptionFromDropdown(
            stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.nodeJs);
        await this.clickOnAppLinkDisplayed(stepLogger,
            ApplicationPageConstants.languageDropDownValues.nodeApp);
        await this.verifyGitRepoPopulatedInTextBox(stepLogger,
            ApplicationPageConstants.gitRepos.nodejs);

        await this.selectOptionFromDropdown(stepLogger,
            ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.php);
        await this.clickOnAppLinkDisplayed(stepLogger,
            ApplicationPageConstants.languageDropDownValues.phpApp);
        await this.verifyGitRepoPopulatedInTextBox(stepLogger,
                ApplicationPageConstants.gitRepos.php);

        await this.selectOptionFromDropdown(
            stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.ruby);
        await this.clickOnAppLinkDisplayed(stepLogger,
            ApplicationPageConstants.languageDropDownValues.railsApp);
        await this.verifyGitRepoPopulatedInTextBox(stepLogger,
                    ApplicationPageConstants.gitRepos.ruby);
    }

    static async enterApplicationNameInput(stepLogger: StepLogger) {
        stepLogger.step('Enter the input in Application Name textbox');
        const prefixApp = ApplicationPageConstants.prefix.app;
        const applicationName = prefixApp + CommonPageHelper.getUniqueId();
        await TextboxHelper.sendKeys(ApplicationPage.createApplicationSectionTextBoxes.applicationName, applicationName);
    }

    static async clickOnRailEnvironmentDropDown(stepLogger: StepLogger) {
        stepLogger.step('Click on the Rail Environment drop down');
        await ElementHelper.click(EnvironmentPage.createEnvironmentDropDowns.railEnvironment);
    }

    static async verifyRailEnvironmentDropDownValues(stepLogger: StepLogger) {
        await this.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.railsEnvironment,
            EnvironmentPageConstants.railsEnvironmentDropDown.development);
        await this.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.railsEnvironment,
            EnvironmentPageConstants.railsEnvironmentDropDown.production);
        await this.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.railsEnvironment,
            EnvironmentPageConstants.railsEnvironmentDropDown.staging);
        await this.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.railsEnvironment,
            EnvironmentPageConstants.railsEnvironmentDropDown.customEnvironment);
    }

    static async verifyDefaultDropdownValue(stepLogger: StepLogger, text: string) {
        stepLogger.step('Verify the default drop down value');
        await expect(await PageHelper.isElementDisplayed(
            CommonPage.getSpanContainsText(text)))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(text));
    }

}
