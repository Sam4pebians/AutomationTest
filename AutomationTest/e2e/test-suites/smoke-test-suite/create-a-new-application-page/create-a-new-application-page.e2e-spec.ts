import {SuiteNames} from '../../helpers/suite-names';
import {HomePage} from '../../../page-objects/pages/home-page/home.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {HomePageHelper} from '../../../page-objects/pages/home-page/home-page.helper';
import {ApplicationPageHelper} from '../../../page-objects/pages/application-page/application-page.helper';
import {ApplicationPageConstants} from '../../../page-objects/pages/application-page/application-page.constants';
import {EnvironmentPageHelper} from '../../../page-objects/pages/environment-page/environment-page.helper';
import {ApplicationPage} from '../../../page-objects/pages/application-page/application.po';
import {TextboxHelper} from '../../../components/html/textbox-helper';

const shortId = require('../../../components/misc-utils/shortid');
describe(SuiteNames.eySmokeSuite, () => {
    let homePage: HomePage;

    beforeEach(async () => {
        homePage = new HomePage();
        await homePage.goTo();
        await HomePageHelper.verifyLoginPage();
        await HomePageHelper.loginToApp();
        await HomePageHelper.verifyEngineYardCloudPage();
    });

    afterEach(async () => {
        // *Step* - Logout from application
        await HomePageHelper.logout();
    });

    it('Verify "Create Application" button functionality by entering/selecting' +
        ' required values in Create a new application Page - [1318952]', async () => {
        const stepLogger = new StepLogger(1318952);
        const applicationName = shortId.generate();
        await ApplicationPageHelper.createApplication(
            ApplicationPageConstants.languageDropDownValues.ruby, applicationName,
            ApplicationPageConstants.languageDropDownValues.railsFour, stepLogger);
        await EnvironmentPageHelper.verifyEnvironmentPage(applicationName, stepLogger);
    });

    it('Verify "Show Walk through" help box functionality in Create a new application Page - [1318910]',
    async () => {
        const stepLogger = new StepLogger(1318910);
        stepLogger.stepId(3);
        await ApplicationPageHelper.clickOnAddApplicationLink(stepLogger);
        await ApplicationPageHelper.verifyNavigation(stepLogger);

        stepLogger.stepId(4);
        await EnvironmentPageHelper.verifyShowWalkThroughBoxDisplayed(stepLogger);

        stepLogger.stepId(5);
        await ApplicationPageHelper.clickOnNextButton(stepLogger);
        await EnvironmentPageHelper.verifyNavigationToGitRepo(stepLogger);

        stepLogger.stepId(6);
        await ApplicationPageHelper.clickOnPrevButton(stepLogger);
        await EnvironmentPageHelper.verifyNavigationToApplicationName(stepLogger);
    });

    it('Verify "Create Application" button functionality with out entering/selecting any values in Create a new application Page'
    + ' - [1318915]',
    async () => {
        const stepLogger = new StepLogger(1318915);
        stepLogger.stepId(3);
        await ApplicationPageHelper.clickOnAddApplicationLink(stepLogger);
        await ApplicationPageHelper.verifyNavigation(stepLogger);

        stepLogger.stepId(4);
        await ApplicationPageHelper.clickOnCreateApplicationButton(stepLogger);
        await ApplicationPageHelper.verifyCreateApplicationFailureMessage(stepLogger);
    });

    it('Verify different options available in "Application Language" drop down - [1318918]',
    async () => {
        const stepLogger = new StepLogger(1318918);
        stepLogger.stepId(3);
        await ApplicationPageHelper.clickOnAddApplicationLink(stepLogger);
        await ApplicationPageHelper.verifyNavigation(stepLogger);

        stepLogger.stepId(4);
        await ApplicationPageHelper.verifyDefaultOptionValue(stepLogger);
        await ApplicationPageHelper.clickOnDropDownApplicationLanguage(stepLogger);
        await ApplicationPageHelper.verifyApplicationLanguageDropDownValues(stepLogger);
    });

    it('Verify "Create Application" button functionality with out entering/selecting any values in Create a new application Page'
    + ' - [1318915]',
    async () => {
        const stepLogger = new StepLogger(1318915);
        stepLogger.stepId(3);
        await ApplicationPageHelper.clickOnAddApplicationLink(stepLogger);
        await ApplicationPageHelper.verifyNavigation(stepLogger);

        stepLogger.stepId(4);
        await ApplicationPageHelper.clickOnCreateApplicationButton(stepLogger);
        await ApplicationPageHelper.verifyCreateApplicationFailureMessage(stepLogger);
    });

    it('Verify "Web Application Framework" drop down is hidden when a value other than "Ruby" is selected ' +
    'in "Application Language" drop down - [1318943]', async () => {
        const stepLogger = new StepLogger(1318943);
        stepLogger.stepId(3);
        await ApplicationPageHelper.clickOnAddApplicationLink(stepLogger);
        await ApplicationPageHelper.verifyNavigation(stepLogger);

        stepLogger.stepId(4);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.nodeJs);
        await ApplicationPageHelper.verifyWebApplicationFrameworkDropdown(stepLogger);

        stepLogger.stepId(5);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.ruby);
        await ApplicationPageHelper.verifyWebApplicationFrameworkDropdown(stepLogger);
    });

    it('Verify the Sample app changes based on the value selected in "Application Language" drop down - [1318946]',
    async () => {
        const stepLogger = new StepLogger(1318946);

        stepLogger.stepId(3);
        await ApplicationPageHelper.clickOnAddApplicationLink(stepLogger);
        await ApplicationPageHelper.verifyNavigation(stepLogger);

        stepLogger.stepId(4);
        // #5, #6 - Inside this method
        await ApplicationPageHelper.verifyAppLinksShownBelowTextBox(stepLogger);
    });

    it('Verify when sample application link is clicked "Git Repository URI", "Application Name" automatically populated - [1318950]',
    async () => {
        const stepLogger = new StepLogger(1318950);

        stepLogger.stepId(3);
        await ApplicationPageHelper.clickOnAddApplicationLink(stepLogger);
        await ApplicationPageHelper.verifyNavigation(stepLogger);

        stepLogger.stepId(4);
        // #5, #6 - Inside this method
        await ApplicationPageHelper.clickLinkShownBelowTextBox(stepLogger);
    });

    it('Verify "Create Application" button functionality by entering/selecting required values in Create a' +
    'new application Page - [1318952]',
    async () => {
        const stepLogger = new StepLogger(1318952);

        stepLogger.stepId(3);
        await ApplicationPageHelper.clickOnAddApplicationLink(stepLogger);
        await ApplicationPageHelper.verifyNavigation(stepLogger);

        stepLogger.stepId(4);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
            ApplicationPageConstants.languageDropDownValues.ruby);
        await ApplicationPageHelper.clickOnAppLinkDisplayed(stepLogger,
            ApplicationPageConstants.languageDropDownValues.railsApp);
        await ApplicationPageHelper.verifyGitRepoPopulatedInTextBox(stepLogger,
                ApplicationPageConstants.gitRepos.ruby);

        stepLogger.stepId(5);
        const applicationName = shortId.generate();
        await TextboxHelper.sendKeys(ApplicationPage.createApplicationSectionTextBoxes.applicationName,
            applicationName);

        stepLogger.stepId(6);
        await ApplicationPageHelper.clickOnCreateApplicationButton(stepLogger);
        await EnvironmentPageHelper.verifyEnvironmentPage(applicationName, stepLogger);

    });
});
