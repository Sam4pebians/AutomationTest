import {SuiteNames} from '../../helpers/suite-names';
import {HomePage} from '../../../page-objects/pages/home-page/home.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {HomePageHelper} from '../../../page-objects/pages/home-page/home-page.helper';
import {ApplicationPageHelper} from '../../../page-objects/pages/application-page/application-page.helper';
import {ApplicationPageConstants} from '../../../page-objects/pages/application-page/application-page.constants';
import {EnvironmentPageHelper} from '../../../page-objects/pages/environment-page/environment-page.helper';
import {EnvironmentPageConstants} from '../../../page-objects/pages/environment-page/environment-page.constants';
import {EnvironmentPage} from '../../../page-objects/pages/environment-page/environment.po';

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

    it('Verify "Create Environment" button functionality by ' +
        'entering/selecting required values in "Create New Environment Page" - [1319067]', async () => {
        const stepLogger = new StepLogger(1319067);
        const applicationName = shortId.generate();
        const environmentName = shortId.generate();
        await HomePageHelper.createApplicationEnvironmentAndNavigateToConfigurationPage(applicationName, environmentName, stepLogger);
    });

    it('Verify different options available in "Rails Environment" drop down - [1318958]',
    async () => {
        const stepLogger = new StepLogger(1318958);
        stepLogger.preCondition('Create an application');
        const applicationName = shortId.generate();
        await ApplicationPageHelper.createApplication(
            ApplicationPageConstants.languageDropDownValues.ruby, applicationName,
            ApplicationPageConstants.languageDropDownValues.railsFour, stepLogger);
        await EnvironmentPageHelper.verifyEnvironmentPage(applicationName, stepLogger);

        stepLogger.stepId(1);
        await ApplicationPageHelper.verifyDefaultDropdownValue(stepLogger,
            EnvironmentPageConstants.railsEnvironmentDropDown.production);

        stepLogger.stepId(2);
        await ApplicationPageHelper.clickOnRailEnvironmentDropDown(stepLogger);
        await ApplicationPageHelper.verifyRailEnvironmentDropDownValues(stepLogger);
    });

    it('Verify "Runtime" values filtered based on "Application Server Stack" selection - [1318961]',
    async () => {
        const stepLogger = new StepLogger(1318961);
        stepLogger.preCondition('Create an application');
        const applicationName = shortId.generate();
        await ApplicationPageHelper.createApplication(
            ApplicationPageConstants.languageDropDownValues.ruby, applicationName,
            ApplicationPageConstants.languageDropDownValues.railsFour, stepLogger);
        await EnvironmentPageHelper.verifyEnvironmentPage(applicationName, stepLogger);

        stepLogger.stepId(1);
        await ApplicationPageHelper.verifyDefaultDropdownValue(stepLogger,
            EnvironmentPageConstants.applicationStackServerDropDown.optionValue);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnRuntimeDropdown(stepLogger);
        await EnvironmentPageHelper.verifyRuntimeDropDownValuesSet(stepLogger, true);

        stepLogger.stepId(3);
        await ApplicationPageHelper.selectOptionFromDropdown(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
            EnvironmentPageConstants.applicationStackServerDropDown.optionValueOne);
        await EnvironmentPageHelper.clickOnRuntimeDropdown(stepLogger);
        await EnvironmentPageHelper.verifyRuntimeDropDownValuesSet(stepLogger, false);
    });

    it('Verify "RubyGems" values filtered based on "Runtime" selection - [1318962]',
    async () => {
        const stepLogger = new StepLogger(1318962);
        stepLogger.preCondition('Create an application');
        const applicationName = shortId.generate();
        await ApplicationPageHelper.createApplication(
            ApplicationPageConstants.languageDropDownValues.ruby, applicationName,
            ApplicationPageConstants.languageDropDownValues.railsFour, stepLogger);
        await EnvironmentPageHelper.verifyEnvironmentPage(applicationName, stepLogger);

        stepLogger.stepId(1);
        await ApplicationPageHelper.verifyDefaultDropdownValue(stepLogger,
            EnvironmentPageConstants.applicationStackServerDropDown.optionValue);

        stepLogger.stepId(2);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
            EnvironmentPageConstants.runtimeDropDown.optionValue);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.rubyGemsDropDownOptions(stepLogger);
        await EnvironmentPageHelper.verifyRubyGemsDropdownValues(stepLogger);

        stepLogger.stepId(4);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
            EnvironmentPageConstants.runtimeDropDown.optionValueOne);

        stepLogger.stepId(5);
        await EnvironmentPageHelper.rubyGemsDropDownOptions(stepLogger);
        await EnvironmentPageHelper.verifyRubyGemsDropdownValuesForRuby200(stepLogger);

        stepLogger.stepId(6);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
            EnvironmentPageConstants.runtimeDropDown.optionValueFive);

        stepLogger.stepId(7);
        await EnvironmentPageHelper.rubyGemsDropDownOptions(stepLogger);
        await EnvironmentPageHelper.verifyRubyGemsDropdownValues(stepLogger);
    });

    it('Verify hiding of "Database Versioning" check box when value other than "Engine Yard" selected in "Database Provider"'
    + 'drop down - [1318986]',
    async () => {
        const stepLogger = new StepLogger(1318986);
        stepLogger.preCondition('Create an application');
        const applicationName = shortId.generate();
        await ApplicationPageHelper.createApplication(
            ApplicationPageConstants.languageDropDownValues.ruby, applicationName,
            ApplicationPageConstants.languageDropDownValues.railsFour, stepLogger);
        await EnvironmentPageHelper.verifyEnvironmentPage(applicationName, stepLogger);

        stepLogger.stepId(1);
        await ApplicationPageHelper.verifyDefaultDropdownValue(stepLogger,
            EnvironmentPageConstants.databaseProviderDropdownoptions.engineyard);
        await EnvironmentPageHelper.verifyDataVersioningCheckBox(stepLogger);

        stepLogger.stepId(2);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.getDropdown.dataProvider,
            EnvironmentPageConstants.databaseProviderDropdownoptions.noprovider);
        await EnvironmentPageHelper.verifyCheckBoxNotPresent(stepLogger);

        stepLogger.stepId(3);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.getDropdown.dataProvider,
            EnvironmentPageConstants.databaseProviderDropdownoptions.amazonrds);
        await EnvironmentPageHelper.verifyCheckBoxNotPresent(stepLogger);

        stepLogger.stepId(4);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.getDropdown.dataProvider,
            EnvironmentPageConstants.databaseProviderDropdownoptions.engineyard);
        await EnvironmentPageHelper.verifyDataVersioningCheckBox(stepLogger);
    });

    it('Verify "Create Environment" button functionality by entering/selecting required values in "Create New Environment Page"'
    + '[1319067]',
    async () => {
        const stepLogger = new StepLogger(1319067);

        stepLogger.stepId(1);
        // #2, #3 - Inside the method- createApplicationEnvironmentAndNavigateToConfigurationPage
        const applicationName = shortId.generate();
        const environmentName = shortId.generate();
        stepLogger.step('create environment, application and verify configuration page');
        await HomePageHelper.createApplicationEnvironmentAndNavigateToConfigurationPage(applicationName, environmentName, stepLogger);
    });

    it('Verify "Create Environment" button functionality by entering/selecting required values in "Create New Environment Page"'
    + '[1319067]',
    async () => {
        const stepLogger = new StepLogger(1319067);

        stepLogger.stepId(1);
        // #2, #3 - Inside the method- createApplicationEnvironmentAndNavigateToConfigurationPage
        const applicationName = shortId.generate();
        const environmentName = shortId.generate();
        stepLogger.step('create environment, application and verify configuration page');
        await HomePageHelper.createApplicationEnvironmentAndNavigateToConfigurationPage(applicationName, environmentName, stepLogger);
    });
});
