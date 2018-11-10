import {SuiteNames} from '../../helpers/suite-names';
import {HomePage} from '../../../page-objects/pages/home-page/home.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {HomePageHelper} from '../../../page-objects/pages/home-page/home-page.helper';
import { EnvironmentPageHelper } from '../../../page-objects/pages/environment-page/environment-page.helper';

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

    it('Verify "Terminate" button functionality in "Environment" Page - [1319520]', async () => {
        const stepLogger = new StepLogger(1319520);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.scrollToEnvLink(stepLogger);
        await EnvironmentPageHelper.clickOnEnvLink(stepLogger);
        await EnvironmentPageHelper.clickOnTerminateButton(stepLogger);
        await EnvironmentPageHelper.verifyTerminateAlertMessage(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.acceptTerminateAlert(stepLogger);

        stepLogger.stepId(5);
        await EnvironmentPageHelper.gotoToolsSnapshots(stepLogger);

        stepLogger.stepId(6);
        await EnvironmentPageHelper.gotoToolsDashboard(stepLogger);
    });

    it('Verify "Delete" [Delete Environment] button functionality in "Environment" Page - [1499326]', async () => {
        const stepLogger = new StepLogger(1499326);
        await EnvironmentPageHelper.searchForEnvToBeTerminated(stepLogger);

        stepLogger.stepId(2);
        await EnvironmentPageHelper.clickOnDeleteButtonForEnvDeletion(stepLogger);

        stepLogger.stepId(3);
        await EnvironmentPageHelper.acceptDeleteAlert(stepLogger);
        await EnvironmentPageHelper.confEnvDeleted(stepLogger);
    });

    it('Verify "Delete" [Delete Application] button functionality in "Environment" Page - [1499328]', async () => {
        const stepLogger = new StepLogger(1499328);
        await EnvironmentPageHelper.searchAppicationToDelete(stepLogger);

        stepLogger.stepId(2);
        stepLogger.stepId(3);
        await EnvironmentPageHelper.clickOnDeleteButtonForAppDeletion(stepLogger);

        stepLogger.stepId(4);
        await EnvironmentPageHelper.verifyAppDeleted(stepLogger);
    });
});
