import {SuiteNames} from '../../../helpers/suite-names';
import {HomePage} from '../../../../page-objects/pages/home-page/home.po';
import {HomePageHelper} from '../../../../page-objects/pages/home-page/home-page.helper';
import {StepLogger} from '../../../../../core/logger/step-logger';
import {ToolsPageHelper} from '../../../../page-objects/pages/tools-page/tools-page.helper';
import {ToolsPageConstants} from '../../../../page-objects/pages/tools-page/tools-page.constants';
import {SshPublicKeysHelper} from '../../../../page-objects/pages/tools-page/ssh-public-keys-page/ssh-public-keys-page.helper';

describe(SuiteNames.eyE2ESuite, () => {
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

    it('Verify user able to add new SSH Key - [15139741]', async () => {
        const stepLogger = new StepLogger(15139741);
        stepLogger.stepId(1);

        stepLogger.stepId(2);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.sshPublicKeys, stepLogger);

        stepLogger.stepId(3);
        await SshPublicKeysHelper.addNewSSHKey(stepLogger);

        stepLogger.stepId(4);
        stepLogger.stepId(5);
        await SshPublicKeysHelper.clickAddKey(stepLogger);

        await SshPublicKeysHelper.verifySSHKeyAdded(stepLogger);
        // Post condition
        await SshPublicKeysHelper.deleteAddedSSHKey(stepLogger);
    });

});
