import {SuiteNames} from '../../../helpers/suite-names';
import {HomePage} from '../../../../page-objects/pages/home-page/home.po';
import {HomePageHelper} from '../../../../page-objects/pages/home-page/home-page.helper';
import {StepLogger} from '../../../../../core/logger/step-logger';
import {EnvironmentPageHelper} from '../../../../page-objects/pages/environment-page/environment-page.helper';
import {ApplicationPageHelper} from '../../../../page-objects/pages/application-page/application-page.helper';
import {EnvironmentPage} from '../../../../page-objects/pages/environment-page/environment.po';
import {EnvironmentPageConstants} from '../../../../page-objects/pages/environment-page/environment-page.constants';

describe(SuiteNames.eyRegressionFunctionalSuite, () => {
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

    it('Verify the UI displayed for "Target Scaling Policy" in "Dynamic Scaling Policies" section - [2348915]', async () => {
        const stepLogger = new StepLogger(2348915);

        stepLogger.stepId(2);
        stepLogger.step('Open the created environment');
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.clickOnAddNewLink(stepLogger);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.getDropdown.policyType,
            EnvironmentPageConstants.databaseProviderDropdownoptions.target);
        await EnvironmentPageHelper.verifyAddNewUI(stepLogger);
    });

});
