import {SuiteNames} from '../../../helpers/suite-names';
import {HomePage} from '../../../../page-objects/pages/home-page/home.po';
import {HomePageHelper} from '../../../../page-objects/pages/home-page/home-page.helper';
import {StepLogger} from '../../../../../core/logger/step-logger';
import {EnvironmentPageHelper} from '../../../../page-objects/pages/environment-page/environment-page.helper';
import {ApplicationPageHelper} from '../../../../page-objects/pages/application-page/application-page.helper';
import {EnvironmentPage} from '../../../../page-objects/pages/environment-page/environment.po';
import {EnvironmentPageConstants} from '../../../../page-objects/pages/environment-page/environment-page.constants';
import {CommonPageConstants} from '../../../../page-objects/pages/common/common-page.constants';
import {PageHelper} from '../../../../components/html/page-helper';

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

    it('Verify the UI displayed for "Simple Scaling Policy" in "Dynamic Scaling Policies" section - [2350344]', async () => {
        const stepLogger = new StepLogger(2350344);

        stepLogger.stepId(1);
        stepLogger.step('Open the created environment');
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.clickOnAddNewLink(stepLogger);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.createEnvironmentDropDowns.policyType,
            EnvironmentPageConstants.policyText.simplePolicyText);
        await EnvironmentPageHelper.verifyAddNewUI(stepLogger, true);

    });

    it('Simple Scaling Policy Page : Verify successful creation of Simple Scaling Policy with valid values - [2458749]', async () => {
        const stepLogger = new StepLogger(2458749);

        stepLogger.stepId(1);
        stepLogger.step('Open the created environment');
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.enterMinAndMaxValue(stepLogger);

        stepLogger.stepId(4);
        await EnvironmentPageHelper.clickOnAddNewLink(stepLogger);
        await ApplicationPageHelper.selectOptionFromDropdown(
            stepLogger, EnvironmentPage.createEnvironmentDropDowns.policyType,
            EnvironmentPageConstants.policyText.simplePolicyText);
        await EnvironmentPageHelper.verifyAddNewUI(stepLogger, true, true);

        stepLogger.stepId(5);
        const name = EnvironmentPageConstants.inputValue.name;
        await EnvironmentPageHelper.enterName(stepLogger, name);
        await EnvironmentPageHelper.enterTriggerValue(stepLogger, (CommonPageConstants.number.ninty).toString());
        await EnvironmentPageHelper.enterActionValue(stepLogger, (CommonPageConstants.number.four).toString());
        await EnvironmentPageHelper.clickOnCreateButton(stepLogger);
        await EnvironmentPageHelper.verifyScalingLinksByText(stepLogger);

        stepLogger.stepId(6);
        await PageHelper.click(EnvironmentPage.policySelectors.editLink);
        await EnvironmentPageHelper.verifyScalingLinks(stepLogger, EnvironmentPage.policySelectors.policyName,
            EnvironmentPageConstants.policyText.simplePolicyName);
        await EnvironmentPageHelper.verifyAddNewUI(stepLogger, true, false);
        await EnvironmentPageHelper.verifyValueSetInNameTextBox(stepLogger, EnvironmentPageConstants.policyText.simplePolicyText);
        await EnvironmentPageHelper.verifyValueSetInTriggerValueTextBox(stepLogger, (CommonPageConstants.number.ninty).toString());

        stepLogger.stepId(7);
        await EnvironmentPageHelper.clickOnCancelButton(stepLogger);
        await EnvironmentPageHelper.verifyPolicyFieldsNotDisplayed(stepLogger);
    });

});
