import {PageHelper} from '../../../components/html/page-helper';
import {ToolsPage} from './tools.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {CommonPage} from '../common/common.po';
import {ToolsPageConstants} from './tools-page.constants';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {TextboxHelper} from '../../../components/html/textbox-helper';
import {browser, ElementFinder} from 'protractor';
import {HomePage} from '../home-page/home.po';
import {CommonPageHelper} from '../common/common-page.helper';
import {CommonPageConstants} from '../common/common-page.constants';
import {ButtonHelper} from '../../../components/html/button-helper';
import {TextComponentSelectors} from '../../../components/devfactory/component-types/text-component/text-component-selectors';
import {CheckboxHelper} from '../../../components/html/checkbox-helper';
import {AnchorComponentSelectors} from '../../../components/html/component-types/anchor-component/anchor-component-selectors';
import {ElementHelper} from '../../../components/html/element-helper';
import {EnvironmentPage} from '../environment-page/environment.po';
import {DropDownHelper} from '../../../components/html/dropdown-helper';

const shortId = require('../../../components/misc-utils/shortid');
const environmentName = CommonPageConstants.autoPrefix.prefix + shortId.generate();

export class ToolsPageHelper {
    static async navigateToPageUnderToolsDropDown(optionName: string, stepLogger: StepLogger) {
        stepLogger.step('Select Tools option');
        await PageHelper.click(ToolsPage.toolsDropDown);

        stepLogger.step(`select ${optionName} option under tools menu`);
        await PageHelper.click(ToolsPage.getOptionUnderToolsDropDown(optionName));
    }

    static async verifyNetworkPageDisplayed(stepLogger: StepLogger) {
        stepLogger.step('Verify Network Page is displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.buttonLabel.addNetwork))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(ToolsPageConstants.buttonText.addNetwork));
    }

    static async verifyExistingNetworks(stepLogger: StepLogger) {
        const existingNetworks = ToolsPageConstants.existingNetworks.defaultNetwork;
        stepLogger.step('Verify exsiting network is displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.existingNetworks))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(existingNetworks));
    }

    static async clickOnAddNetworkButton(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on Add Network button');
        await ElementHelper.clickIfPresent(ToolsPage.buttonLabel.addNetwork);
    }

    static async verifyNewNetworkPageDisplayed(stepLogger: StepLogger) {
        const newNetwork = ToolsPageConstants.pageHeader.newNetwork;
        stepLogger.step('Verify new network page displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.newNetwork))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(newNetwork));
    }

    static async verifyValuePrepopulatedInFieldLocation(stepLogger: StepLogger) {
        stepLogger.step('Verify location field');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.networkFields.location)).
        toBe(true, ValidationsHelper.getFieldDisplayedValidation(ToolsPageConstants.networkFieldsText.location));
    }

    static async verifyValuePrepopulatedInFieldTenancy(stepLogger: StepLogger) {
        const tenancyText = ToolsPageConstants.networkFieldsText.networkTenancy;
        stepLogger.step('Verify tenancy field');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.networkFields.tenancy)).
        toBe(true, ValidationsHelper.getFieldDisplayedValidation(tenancyText));
    }

    static async verifyValuePrepopulatedInFieldCIDR(stepLogger: StepLogger) {
        const cidrText = ToolsPageConstants.networkFieldsText.cidr;
        stepLogger.step('Verify CIDR');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.networkFields.cidr))
        .toBe(cidrText, ValidationsHelper.getFieldDisplayedValidation(cidrText));
    }

    static async enterNetworkName(stepLogger: StepLogger, text: string) {
        stepLogger.step('Enter network name');
        await TextboxHelper.sendKeys(ToolsPage.networkFields.name, text);
    }

    static async checkClassicLinkCheckBox(stepLogger: StepLogger) {
        stepLogger.step('Click on classic link checkbox');
        await CheckboxHelper.markCheckbox(ToolsPage.networkFields.classicLink, true);
    }

    static async clickOnCreateNetworkButton(stepLogger: StepLogger) {
        stepLogger.step('Click on Create Network button');
        await PageHelper.click(ToolsPage.buttonLabel.createNetwork);
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.m);
    }

    static async verifyProvisioningMessageDisplayed(stepLogger: StepLogger) {
        stepLogger.step('Verify Provisioning Message Displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.messageText))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.provisioningMessage.message));
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.s);
    }

    static async verifyNewlyAddedNetworks(stepLogger: StepLogger, newNetwork: string) {
        let isNewNetworkAvailable = false;
        while (! await CommonPage.getTdContainsText(newNetwork).isPresent()) {
            stepLogger.step('Refresh the page');
            await PageHelper.refreshPage();
            isNewNetworkAvailable = true;
        }
        if (isNewNetworkAvailable) {
        stepLogger.verification('Verify new network is displayed in the Network List table');
        await expect(await PageHelper.isElementDisplayed(CommonPage.getTdContainsText(newNetwork)
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(newNetwork))));
        }
    }

    static async verifyNewlyAddedNetworksInNetworkList(stepLogger: StepLogger,  networkName: string, isDelete = false) {
        if (isDelete) {
            await this.clickOnAnchorClickPrecedingDeleteButton(networkName, stepLogger);
        }
    }

    static async clickOnAnchorClickPrecedingDeleteButton(text: string, stepLogger: StepLogger) {
        stepLogger.step('Click on Anchor Link Preceding Delete Button');
        await PageHelper.click(AnchorComponentSelectors.getAnchorLinkByTDtext(text));
        await this.clickOnDeleteButton(text, stepLogger);
    }

    static async clickOnDeleteButton(text: string, stepLogger: StepLogger) {
        stepLogger.step('Click on delete button');
        await PageHelper.click(CommonPage.getButtonContainsText(ToolsPageConstants.buttonText.delete));
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xxs);
        await PageHelper.closeAlertIfPresent();
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.l);
        await PageHelper.refreshPage();
        stepLogger.step(`Verify ${text} network is deleted.`);
        await this.verifyNewlyAddedNetworkDeletedFromListTable(stepLogger, text);
    }

    static async verifyNewlyAddedNetworkDeletedFromListTable(stepLogger: StepLogger, newNetwork: string) {
        stepLogger.verification('Verify the newly added network deleted from Network List table');
        let isNewNetworkNotAvailable = false;
        if (await ToolsPage.textSelector.networkText.isPresent()) {
            for (let index = 0; index <= 6; index++) {
                await PageHelper.refreshPage();
                isNewNetworkNotAvailable = true;
            }
        }
        if (isNewNetworkNotAvailable) {
        await expect(await PageHelper.isElementHidden(ToolsPage.textSelector.networkText))
            .toBe(true,
                ValidationsHelper.getNotDisplayedValidation(newNetwork));
        }
    }

    static async verifyManageEarlyAccessFeaturesPageDiplayed(stepLogger: StepLogger) {
        stepLogger.step('Verify Manage Early Access Features Page displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.earlyAccessManagePageHeaderText))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.pageHeader.earlyAccessManageFeatures));
    }

    static async verifyListOfEarlyAccessFeatures(stepLogger: StepLogger) {
        stepLogger.step('Verify feature sixtyFourBitOnly');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.sixtyFourBit))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.sixtyFourBitOnly));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusDisable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusDisable));
        stepLogger.step('Verify feature accountDashboard');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.accountDashboard))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.accountDashboard));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusDisable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusDisable));
        stepLogger.step('Verify feature addDBMaster');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.addDBMaster))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.addDBMaster));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature addRemoveAPI');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.addRemoveAPI))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.addRemoveAPI));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusDisable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusDisable));
        stepLogger.step('Verify AllowEBS Encryption');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.allowEBSEncryption))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.allowEBSEncryption));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusDisable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusDisable));
        stepLogger.step('Verify feature allowStackSelect');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.allowStackSelect))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.allowStackSelect));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature apache');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.apache))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.apache));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature appSlaveAddress');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.appSlaveAddress))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.appSlaveAddress));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature appFirstEnabled');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.appFirstEnabled))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.appFirstEnabled));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature asyncDashboard');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.asyncDashboard))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.asyncDashboard));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature autoScaling');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.autoScaling))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.autoScaling));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusDisable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusDisable));
        stepLogger.step('Verify feature autoClusterUpdate');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.autoClusterUpdate))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.autoClusterUpdate));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature awsVolumeOptimized');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.awsVolumeOptimized))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.awsVolumeOptimized));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature azureNorthEurope');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.azureNorthEurope))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.azureNorthEurope));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
        stepLogger.step('Verify feature dashBoardPaging');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.dashboardPaging))
        .toBe(true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.earlyAccessList.dashBoardPaging));
        stepLogger.step('Verify the status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.statusEnable))
        .toBe(true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelsInPage.statusEnable));
    }

    static async searchFeature(stepLogger: StepLogger, text: string) {
        stepLogger.step(`Search for ${text} access feature`);
        await PageHelper.scrollToElement(CommonPage.getHeaderTwoContainingText(text));
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.s);
    }

    static async clickOnEnable(stepLogger: StepLogger) {
        stepLogger.step('Click on enable button');
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.s);
        const disable = ToolsPageConstants.accessFeatureSelector.featureClass;
        const value = ToolsPageConstants.earlyAccessList.ruby220;
        if (await PageHelper.isElementPresent(ButtonHelper.getButtonClassUsingHeaderText(disable, value, true))) {
            await PageHelper.click(ButtonHelper.getButtonUsingHeaderText(ToolsPageConstants.earlyAccessList.ruby220));
            // wait for the elements to load completely
            await browser.sleep(PageHelper.timeout.xs);
        } else {
            stepLogger.commonLogger('Verify enable button', 'First disable then enable');
            await PageHelper.click(TextComponentSelectors.getTextUsingInputAndSpan(ToolsPageConstants.earlyAccessList.ruby220_1));
            await PageHelper.click(ButtonHelper.getButtonUsingHeaderText(ToolsPageConstants.earlyAccessList.ruby220));
            // wait for the elements to load completely
            await browser.sleep(PageHelper.timeout.xs);
        }
    }

    static async clickOnHomePageLink(stepLogger: StepLogger, elem: ElementFinder) {
        stepLogger.step('Click on "Home Page" link');
        await PageHelper.click(elem);
    }

    static async clickOnAddApplicationLink(stepLogger: StepLogger) {
        const addAnApplicationLink = HomePage.addAnApplicationLink;
        stepLogger.step('Click on "Add an Application" link');
        await PageHelper.click(addAnApplicationLink);
    }

    static async verifyEnvironmentPageDisplayed(stepLogger: StepLogger) {
        stepLogger.verification('"Create New Environment" Page is displayed');
        await expect(await PageHelper.isElementDisplayed(CommonPageHelper.pageHeaders.createNewEnvironment))
        .toBe(true,
             ValidationsHelper.getDisplayedValidation(CommonPageConstants.pageHeaders.createNewEnvironment));
    }

    static async verifySnapshotsSettingsPageDisplayed(stepLogger: StepLogger) {
        const snapshot = ToolsPageConstants.optionsUnderToolsSection.snapshots;
        stepLogger.verification('Verify the snapshot settings page is displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.snapShotText))
        .toBe(true,
             ValidationsHelper.getDisplayedValidation(snapshot));
    }

    static async verifyExistingSnapshotsInSnapshotGridDisplayed(stepLogger: StepLogger) {
        stepLogger.verification('Verify the existing snapshots in Snapshot grid');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.environmentOne))
        .toBe(true,
             ValidationsHelper.getDisplayedValidation(ToolsPageConstants.existingSnapshot.environmentOne));
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.environmentTwo))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(ToolsPageConstants.existingSnapshot.environmentTwo));
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.environmentThree))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(ToolsPageConstants.existingSnapshot.environmentThree));
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.environmentFour))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(ToolsPageConstants.existingSnapshot.environmentFour));
    }

    static async clickOnCheckBoxForFirstRecordInGrid(stepLogger: StepLogger) {
        const text = ToolsPageConstants.earlyAccessList.text;
        const idValue = ToolsPageConstants.checkBoxSelectors.checkboxId;
        stepLogger.step('Click on the first checkbox in the snapshot grid');
        await CheckboxHelper.getCheckBoxUsingTD(idValue, text, true).click();
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.s);
    }

    static async clickOnDeleteSnapshotsButton(stepLogger: StepLogger) {
        stepLogger.step('Click on Delete Snapshots button');
        await PageHelper.click(ToolsPage.buttonLabel.deleteSnapshots);
    }

    static async verifyDeletedSnapshotDisabled(stepLogger: StepLogger) {
        const text = ToolsPageConstants.earlyAccessList.text;
        const idValue = ToolsPageConstants.checkBoxSelectors.checkboxId;
        stepLogger.verification('Verify the deleted snapshot is disabled');
        await expect(await PageHelper.isElementDisplayed(CheckboxHelper.getCheckBoxDisabled(idValue, text, true)))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation('Snapshot Disabled'));
    }

    static async verifyDeletedSnapshotNotDisplayedInGrid(stepLogger: StepLogger) {
        const text = ToolsPageConstants.earlyAccessList.text;
        const idValue = ToolsPageConstants.checkBoxSelectors.checkboxId;
        stepLogger.verification('Verify the deleted snapshot is not displayed in grid');
        await expect(await PageHelper.isElementHidden(CheckboxHelper.getCheckBoxDisabled(idValue, text, true)))
        .toBe(true,
            ValidationsHelper.getNotDisplayedValidation('Snapshot Deleted'));
    }

    static async verifyLoadBalancerPageDisplayed(stepLogger: StepLogger) {
        const loadBalancerPage = ToolsPageConstants.optionsUnderToolsSection.classicLoadBalancers;
        stepLogger.verification('Verify the load balancer page is displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.loadBalancerPageHeaderText))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(loadBalancerPage));
    }

    static async verifyLoadBalancersDisplayedIfExisting(stepLogger: StepLogger) {
        const deleteButton = CommonPageConstants.labelTexts.deleteLabel;
        stepLogger.verification('Verify the load balancer displayed if exists');
        if (await PageHelper.isElementPresent(ToolsPage.buttonLabel.delete)) {
            await expect(await PageHelper.isElementDisplayed(ToolsPage.buttonLabel.delete))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(deleteButton));
        } else {
            // Do nothing
        }
    }

    static async executePreconditionsForCreateNewRawEC2(stepLogger: StepLogger) {
        stepLogger.preCondition('precondition for creating new raw EC2 ');
        await this.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.networks, stepLogger);
        await this.verifyIfNetworkForVPCNonEnabledRegionAlreadyExists(stepLogger);
    }

    static async clickOnLoadBalancerButton(stepLogger: StepLogger) {
        stepLogger.step('Click on Add Classic Load Balancer button');
        await PageHelper.click(ToolsPage.buttonLabel.addClassicLoadBalancer);
    }

    static async verifyNewLoadBalancerPageDisplayed(stepLogger: StepLogger) {
        const newLoadBalancerPage = ToolsPageConstants.pageHeader.newLoadBalancer;
        stepLogger.verification('Verify the new load balancer page is displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.newLoadBalancerPageHeaderText))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(newLoadBalancerPage));
    }

    static async clickOnCreateClassicLoadBalancerButton(stepLogger: StepLogger) {
        stepLogger.step('Click on Create Classic Load Balancer button');
        await PageHelper.click(ToolsPage.buttonLabel.createClassicLoadBalancer);
    }

    static async verifyLoadBalancerMessageAndStatus(stepLogger: StepLogger) {
        const createClassicLoadBalancerMsg = ToolsPageConstants.provisioningMessage.awsMessage;
        const createClassicLoadBalancerStatusMsg = ToolsPageConstants.provisioningMessage.status;
        stepLogger.verification('Verify the load balancer');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.createClassicLoadBalancerMsgText))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(createClassicLoadBalancerMsg));
        stepLogger.verification('Verify the load balancer status');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.createClassicLoadBalancerStatusMsgText))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(createClassicLoadBalancerStatusMsg));
    }

    static async verifyNewlyCreatedLoadBalancerDisplayed(stepLogger: StepLogger) {
        const deleteButton = CommonPageConstants.labelTexts.deleteLabel;
        const createClassicLoadBalancer = ToolsPageConstants.provisioningMessage.test;
        stepLogger.step('Verify newly load balancer is displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.createClassicLoadBalancerText))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(createClassicLoadBalancer));
        stepLogger.step('Verify delete button is displayed');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.buttonLabel.delete))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(deleteButton));
    }

    static async deleteNewlyCreatedLoadBalancer(stepLogger: StepLogger) {
        stepLogger.postCondition('Delete newly created load balancer');
        await PageHelper.click(ToolsPage.buttonLabel.delete);
        await PageHelper.closeAlertIfPresent();
        await PageHelper.refreshPage();
    }

    static async verifyIfNetworkForVPCNonEnabledRegionAlreadyExists(stepLogger: StepLogger) {
        stepLogger.step('Verify location in the network grid list');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.networkGridValue.location))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(ToolsPageConstants.networkFieldsText.location));
    }

    static async clickOnAddRawEC2EnvironmentButton(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on "Add Raw EC2 Environment" button');
        await PageHelper.click(ToolsPage.buttonLabel.addRawEC2Env);
    }

    static async verifyPageHeaderText(stepLogger: StepLogger) {
        stepLogger.step('Verift Create New Page Header Text');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.addRawRC2Env))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(ToolsPageConstants.pageHeader.createNewRawRC2Env));
    }

    static async createNewRawEC2Environment(stepLogger: StepLogger, regionValue: string , networksValue: string) {
        stepLogger.step('Enter the value in "Environment Name" text box');
        await TextboxHelper.sendKeys(EnvironmentPage.createEnvironmentTextBoxes.environmentName, environmentName);

        stepLogger.step('Select the value Region from dropdown box');
        await DropDownHelper.selectOptionByText(
            ToolsPage.createLoadBalancerDropDown.environmentRegionId, regionValue);

        stepLogger.step('Select the value Networks from dropdown box');
        await DropDownHelper.selectOptionByText(
            ToolsPage.createLoadBalancerDropDown.networkId, networksValue);
    }

    static async verifyRawRC2EnvironmentCreated(stepLogger: StepLogger) {
        stepLogger.step('Verify Raw RC2 Env created');
        await expect(await PageHelper.isElementDisplayed(CommonPage.getAnchorContainsText(environmentName)))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(environmentName));
    }

    static async deleteNewRawEC2Created(stepLogger: StepLogger) {
        stepLogger.postCondition('postcondition for deleting new raw EC2');
        await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(environmentName));
        await PageHelper.click(CommonPage.getAnchorContainsText(environmentName));
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.s);
        await PageHelper.click(CommonPage.getAnchorContainsText(CommonPageConstants.labelTexts.deleteLabel));
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.s);

        stepLogger.step('Click "OK"on the alert message box');
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.s);
        await PageHelper.closeAlertIfPresent();
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.s);
    }

    static async confirmDeletionEC2RawEnv(stepLogger: StepLogger) {
        stepLogger.postCondition('postcondition for confirming deletion of new raw EC2');
        if (await PageHelper.isElementPresent(CommonPage.getAnchorContainsText(environmentName))) {
            await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(environmentName));
            await PageHelper.click(CommonPage.getAnchorContainsText(environmentName));
            if (await PageHelper.isElementPresent(CommonPage.getAnchorContainsText(CommonPageConstants.labelTexts.deleteLabel))) {
                // Required to handle alert
                await browser.sleep(PageHelper.timeout.s);
                await PageHelper.click(CommonPage.getAnchorContainsText(CommonPageConstants.labelTexts.deleteLabel));
                // Required to handle alert
                await browser.sleep(PageHelper.timeout.s);

                stepLogger.step('Click "OK"on the alert message box');
                // Required to handle alert
                await browser.sleep(PageHelper.timeout.s);
                await PageHelper.closeAlertIfPresent();
                // Required to handle alert
                await browser.sleep(PageHelper.timeout.s);
            }
        }
    }

    static async clickOnAWSName(stepLogger: StepLogger, elem: ElementFinder) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on "aws name link" link');
        await PageHelper.click(elem);
    }

    static async verifyDataPopulated(stepLogger: StepLogger) {
        stepLogger.step('Verify data populated for Tenancy');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.tenancyValueText))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(ToolsPageConstants.networkFieldsText.cidr));
        stepLogger.step('Verify data populated for Subnet');
        await expect(await PageHelper.isElementDisplayed(ToolsPage.textSelector.deleteExistingSubnetRecord))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(ToolsPageConstants.buttonText.delete));
        stepLogger.step('Verify data populated for Environments');
        await expect(await PageHelper.isElementDisplayed(CommonPage.getAnchorContainsText(environmentName)))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(environmentName));
    }
}
