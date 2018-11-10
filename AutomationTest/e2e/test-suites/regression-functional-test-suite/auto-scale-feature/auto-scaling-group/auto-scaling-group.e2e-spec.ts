import {browser} from 'protractor';
import {SuiteNames} from '../../../helpers/suite-names';
import {HomePage} from '../../../../page-objects/pages/home-page/home.po';
import {HomePageHelper} from '../../../../page-objects/pages/home-page/home-page.helper';
import {StepLogger} from '../../../../../core/logger/step-logger';
import {EnvironmentPageHelper} from '../../../../page-objects/pages/environment-page/environment-page.helper';
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

    it('Verify the UI displayed by clicking on "Auto Scaling" Link - [2348826]', async () => {
        const stepLogger = new StepLogger(2348826);
        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        stepLogger.verification('UI elements displayed in "Auto scaling Group Creation" page');
        await EnvironmentPageHelper.verifyAutoScalingPage(stepLogger);
    });

    it('Auto Scaling Group page: Warning when Minimum Size Value is blank - [2361732]', async () => {
        const stepLogger = new StepLogger(2361732);
        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.enterMinimumsizeValue(stepLogger, CommonPageConstants.stringValue.emptyString);
        await EnvironmentPageHelper.clickOnAutoScalingGroupButton(stepLogger);
        const message = EnvironmentPageConstants.autoScalingGroupvalidationMessage.minimumEmptyValidationMessage;
        await EnvironmentPageHelper.verifyFormValidationMessage(stepLogger, message);
    });

    it('Auto Scaling Group page: Warning when Maximum Size Value < Minimum Size Value - [2350361]', async () => {
        const stepLogger = new StepLogger(2350361);
        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.createAutoScalingGroup(stepLogger, (CommonPageConstants.number.four).toString(),
            (CommonPageConstants.number.one).toString(), (CommonPageConstants.number.fiveHundred).toString(),
            (CommonPageConstants.number.threeHundred).toString());
        const message = EnvironmentPageConstants.autoScalingGroupvalidationMessage.maxGreaterThanMinValidationMessage;
        await EnvironmentPageHelper.verifyFormValidationMessage(stepLogger, message);
    });

    it('Auto Scaling Group page: Warning when Minimum Size Value is String - [2361744]', async () => {
        const stepLogger = new StepLogger(2361744);

        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.enterMinimumsizeValue(stepLogger, CommonPageConstants.stringValue.emptyString);
        await EnvironmentPageHelper.clickOnAutoScalingGroupButton(stepLogger);
        const message = EnvironmentPageConstants.autoScalingGroupvalidationMessage.minimumStringValidationMessage;
        await EnvironmentPageHelper.verifyFormValidationMessage(stepLogger, message);
    });

    it('Auto Scaling Group page: Warning when Health Check Grace Period Value is Float - [2361749]', async () => {
        const stepLogger = new StepLogger(2361749);
        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);
        await EnvironmentPageHelper.enterFloatValue(stepLogger);

        stepLogger.stepId(3);
        const message = EnvironmentPage.toolTip.healthCheckGracePeriod;
        const messageOne = EnvironmentPageConstants.autoScalingGroupvalidationMessage
        .FloatValueHealthCheckGracePeriodValidationMessage;
        const messageTwo = EnvironmentPageConstants
        .autoScalingGroupvalidationMessage.FloatValueHealthCheckGracePeriodValidationMessage;
        await EnvironmentPageHelper.verifyToolTipValidation(stepLogger, message, messageOne, messageTwo);
    });

    it('Auto Scaling Group page: Warning when Space entered as a Value in Default Cooldown field - [2361750]', async () => {
        const stepLogger = new StepLogger(2361750);
        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.enterMinMaxGraceValue(stepLogger, (CommonPageConstants.number.one).toString(),
        (CommonPageConstants.number.ten).toString(), (CommonPageConstants.number.fiveHundred).toString());
        await EnvironmentPageHelper.enterSpace(stepLogger);
        await EnvironmentPageHelper.clickOnAutoScalingGroupButton(stepLogger);
        // waiting for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        const message = EnvironmentPage.toolTip.defaultCooldown;
        const messageOne = EnvironmentPageConstants.autoScalingGroupvalidationMessage
        .spacesDefaultCooldownValidationMessage;
        const messageTwo = EnvironmentPageConstants.autoScalingGroupvalidationMessage
        .spacesDefaultCooldownValidationMessage;
        await EnvironmentPageHelper.verifyToolTipValidation(stepLogger, message, messageOne, messageTwo);
    });

    it('Auto Scaling Group page: Warning message contents when more than 1 Problem exist - [2372814]', async () => {
        const stepLogger = new StepLogger(2372814);
        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.enterMinMaxGraceValue(stepLogger, (CommonPageConstants.number.one).toString(),
        (CommonPageConstants.number.ten).toString(), (CommonPageConstants.number.fiveHundred).toString());
        const message = EnvironmentPage.toolTip.healthCheckGracePeriod;
        const messageOne = EnvironmentPageConstants.autoScalingGroupvalidationMessage
        .FloatValueHealthCheckGracePeriodValidationMessage;
        const messageTwo = EnvironmentPageConstants
        .autoScalingGroupvalidationMessage.FloatValueHealthCheckGracePeriodValidationMessage;
        await EnvironmentPageHelper.verifyToolTipValidation(stepLogger, message, messageOne, messageTwo);
    });

    it('Auto Scaling Group page: Checking of "AWS documentation" link functionality - [2460196]', async () => {
        const stepLogger = new StepLogger(2460196);
        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.clickOnAddNewLink(stepLogger);
        await EnvironmentPageHelper.clickOnAWSLink(stepLogger);
        await EnvironmentPageHelper.switchToAWSTab(stepLogger);
        await EnvironmentPageHelper.verifyNavigationToAwsPage(stepLogger);
        await EnvironmentPageHelper.switchToDefaultTab(stepLogger);
    });

    it('Auto Scaling Group page: No warning when Maximum Size Value = Minimum Size Value - [2361748]', async () => {
        const stepLogger = new StepLogger(2361748);
        stepLogger.stepId(1);
        await EnvironmentPageHelper.clickOnCreatedEnvironmentLink(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnAutoScalingLink(stepLogger);
        await EnvironmentPageHelper.verifyAutoscalingCreationPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.enterMinMaxGraceValue(stepLogger, (CommonPageConstants.number.five).toString(),
        (CommonPageConstants.number.five).toString(), (CommonPageConstants.number.fiveHundred).toString());
        const message = EnvironmentPageConstants.autoScalingGroupvalidationMessage.minMaxEqualValidationMessage;
        await EnvironmentPageHelper.verifyFormValidationMsg(stepLogger, message);
    });

});
