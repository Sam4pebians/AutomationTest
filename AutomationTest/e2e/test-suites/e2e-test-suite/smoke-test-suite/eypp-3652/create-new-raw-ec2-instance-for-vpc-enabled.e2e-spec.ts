import {SuiteNames} from '../../../helpers/suite-names';
import {HomePage} from '../../../../page-objects/pages/home-page/home.po';
import {HomePageHelper} from '../../../../page-objects/pages/home-page/home-page.helper';
import {StepLogger} from '../../../../../core/logger/step-logger';
import {ToolsPageHelper} from '../../../../page-objects/pages/tools-page/tools-page.helper';
import {ManageBlueprintsPageHelper} from '../../../../page-objects/pages/tools-page/manage-blueprints-page/manage-blueprints-page.helper';
import {ToolsPageConstants} from '../../../../page-objects/pages/tools-page/tools-page.constants';
import {EnvironmentPageHelper} from '../../../../page-objects/pages/environment-page/environment-page.helper';
import {CommonPageConstants} from '../../../../page-objects/pages/common/common-page.constants';
import {ToolsPage} from '../../../../page-objects/pages/tools-page/tools.po';

const shortId = require('../../../../components/misc-utils/shortid');
const blueprintName = CommonPageConstants.autoPrefix.prefix + shortId.generate();

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

    it('Verify user is able to create New Raw EC2 Instance for VPC Enabled region - [15139777]', async () => {
        const stepLogger = new StepLogger(15139777);

        await ToolsPageHelper.executePreconditionsForCreateNewRawEC2(stepLogger);
        await ManageBlueprintsPageHelper.addBlueprint(blueprintName, stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);

        stepLogger.stepId(2);
        await ToolsPageHelper.clickOnAddRawEC2EnvironmentButton(stepLogger);
        await ToolsPageHelper.verifyPageHeaderText(stepLogger);

        stepLogger.stepId(3);
        const regionValue = ToolsPageConstants.networkFieldsText.locationVPCEnabled;
        const networksValue = ToolsPageConstants.networkFieldsText.networksEnabled;
        await ToolsPageHelper.createNewRawEC2Environment(stepLogger, regionValue, networksValue);

        stepLogger.stepId(4);
        await EnvironmentPageHelper.clickOnCreateEnvironmentButton(stepLogger);
        await ToolsPageHelper.verifyRawRC2EnvironmentCreated(stepLogger);

        // Postcondition
        await ToolsPageHelper.deleteNewRawEC2Created(stepLogger);
        await ToolsPageHelper.confirmDeletionEC2RawEnv(stepLogger);
    });

    it('Verify the Newly Raw EC2 instance (VPC Enabled) is present in Network list - [15139785]', async () => {
        const stepLogger = new StepLogger(15139785);
        await ToolsPageHelper.executePreconditionsForCreateNewRawEC2(stepLogger);
        await ManageBlueprintsPageHelper.addBlueprint(blueprintName, stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);
        await ToolsPageHelper.clickOnAddRawEC2EnvironmentButton(stepLogger);
        await ToolsPageHelper.verifyPageHeaderText(stepLogger);
        const regionValue = ToolsPageConstants.networkFieldsText.locationVPCEnabled;
        const networksValue = ToolsPageConstants.networkFieldsText.networksEnabled;
        await ToolsPageHelper.createNewRawEC2Environment(stepLogger, regionValue, networksValue);
        await EnvironmentPageHelper.clickOnCreateEnvironmentButton(stepLogger);
        await ToolsPageHelper.verifyRawRC2EnvironmentCreated(stepLogger);

        stepLogger.stepId(2);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.networks, stepLogger);
        await ToolsPageHelper.verifyNetworkPageDisplayed(stepLogger);
        const awsVPCEnabled = ToolsPageConstants.networkFieldsText.awsNameEnabled;
        await ToolsPageHelper.clickOnAWSName(stepLogger, ToolsPage.anchorLinkSelectors(awsVPCEnabled).awsNetworkLink);

        stepLogger.stepId(3);
        await ToolsPageHelper.verifyDataPopulated(stepLogger);

        // Postcondition
        await ToolsPageHelper.deleteNewRawEC2Created(stepLogger);
        await ToolsPageHelper.confirmDeletionEC2RawEnv(stepLogger);
     });
});
