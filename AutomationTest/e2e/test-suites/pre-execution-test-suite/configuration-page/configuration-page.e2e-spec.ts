import {SuiteNames} from '../../helpers/suite-names';
import {HomePage} from '../../../page-objects/pages/home-page/home.po';
import {HomePageHelper} from '../../../page-objects/pages/home-page/home-page.helper';
import {StepLogger} from '../../../../core/logger/step-logger';
import { ConfigurationPageHelper } from '../../../page-objects/pages/configuration-page/configuration-page.helper';

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

    it('Verify "Boot This Configuration" button functionality in "Configuration Page" - [1319514]', async () => {
        const stepLogger = new StepLogger(1319514);

        await ConfigurationPageHelper.createAppEnvAndBootStrap(stepLogger);

        stepLogger.stepId(1);
        await ConfigurationPageHelper.selectInstanceForBootStrap(stepLogger);

        stepLogger.stepId(2);
        await ConfigurationPageHelper.clickOnRadioButton(stepLogger);

        stepLogger.stepId(3);
        await ConfigurationPageHelper.selectAndVerifyIPAddress(stepLogger);

        stepLogger.stepId(4);
        await ConfigurationPageHelper.clickOnBootStrapConfigurationButton(stepLogger);
        // await ConfigurationPageHelper.verifyEnvironmentConfigurationBooted(stepLogger);
    });

});
