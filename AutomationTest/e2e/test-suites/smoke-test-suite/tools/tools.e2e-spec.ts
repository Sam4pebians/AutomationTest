import {SuiteNames} from '../../helpers/suite-names';
import {HomePage} from '../../../page-objects/pages/home-page/home.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {HomePageHelper} from '../../../page-objects/pages/home-page/home-page.helper';
import {SslCertificatesPage} from '../../../page-objects/pages/tools-page/ssl-certificates-page/ssl-certificates.po';
import {PageHelper} from '../../../components/html/page-helper';
import {SslCertificatesPageHelper} from '../../../page-objects/pages/tools-page/ssl-certificates-page/ssl-certificates-page.helper';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {SslCertificatesPageConstants} from '../../../page-objects/pages/tools-page/ssl-certificates-page/ssl-certificates-page.constants';
import {ToolsPageConstants} from '../../../page-objects/pages/tools-page/tools-page.constants';
import {browser} from 'protractor';
import {IpAddressesPageHelper} from '../../../page-objects/pages/tools-page/ip-addresses-page/ip-addresses-page.helper';
import {IpAddressesPageConstants} from '../../../page-objects/pages/tools-page/ip-addresses-page/ip-addresses-page.constants';
import {IpAddressesPage} from '../../../page-objects/pages/tools-page/ip-addresses-page/ip-addresses.po';
import {ManageBlueprintsPageHelper} from '../../../page-objects/pages/tools-page/manage-blueprints-page/manage-blueprints-page.helper';
import {ManageBlueprintsPage} from '../../../page-objects/pages/tools-page/manage-blueprints-page/manage-blueprints.po';
// tslint:disable-next-line:max-line-length
import {ManageBlueprintsPageConstants} from '../../../page-objects/pages/tools-page/manage-blueprints-page/manage-blueprints-page.constants';
import {WaitHelper} from '../../../components/html/wait-helper';
import {CommonPageConstants} from '../../../page-objects/pages/common/common-page.constants';
import {ToolsPageHelper} from '../../../page-objects/pages/tools-page/tools-page.helper';
import {ApplicationPageHelper} from '../../../page-objects/pages/application-page/application-page.helper';
import {ApplicationPage} from '../../../page-objects/pages/application-page/application.po';
import {ApplicationPageConstants} from '../../../page-objects/pages/application-page/application-page.constants';
import {TextboxHelper} from '../../../components/html/textbox-helper';
import {DropDownHelper} from '../../../components/html/dropdown-helper';
import {EnvironmentPageHelper} from '../../../page-objects/pages/environment-page/environment-page.helper';
import { ToolsPage } from '../../../page-objects/pages/tools-page/tools.po';

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

    it('Verify "Add SSL Certificate" functionality - [1329631]', async () => {
        const stepLogger = new StepLogger(1329631);
        const certificateName = shortId.generate();
        await SslCertificatesPageHelper.createCertificate(certificateName, stepLogger);
        await PageHelper.click(SslCertificatesPage.getDeleteCertificateButtonUsingCertificateName(certificateName));
    });

    it('Verify "Delete SSL Certificate" functionality - [1329633]', async () => {
         const stepLogger = new StepLogger(1329633);
         const certificateName = shortId.generate();
         await SslCertificatesPageHelper.createCertificate(certificateName, stepLogger);

         stepLogger.stepId(4);
         stepLogger.step('Click on "Delete" button displayed next to the SSL Certificate created as per pre requisite');
         await PageHelper.click(SslCertificatesPage.getDeleteCertificateButtonUsingCertificateName(certificateName));

         stepLogger.verification('Message "Currently deprovisioning the SSL certificates below. They will disappear' +
             ' when deprovisioning is complete SaiSSL" is displayed');
         await expect(await PageHelper.isElementDisplayed(SslCertificatesPage.certificateDeletedMessage)).toBe(
             true, ValidationsHelper.getDisplayedValidation(SslCertificatesPageConstants.certificateDeletedMessage));

         stepLogger.stepId(5);
         stepLogger.step('Select Tools > SSL Certificates menu option');
         await SslCertificatesPageHelper.navigateToOtherPageAndBackToSslCertificatePage(stepLogger);

         stepLogger.verification('"SSL Certificates" page displayed');
         await expect(await PageHelper.isElementDisplayed(SslCertificatesPage.sslCertificatesHeader)).toBe(
             true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.optionsUnderToolsSection.sslCertificates));

         stepLogger.step('need to refresh page as it is taking time to load data');
         await PageHelper.refreshPage();

         stepLogger.verification('Newly created SSL Certificate (Ex: SaiSSL) is DELETED and NOT displayed');
         await expect(await PageHelper.isElementPresent(SslCertificatesPage.getAddedCertificateUsingName(certificateName))).not.toBe(
             true, ValidationsHelper.getDisplayedValidation(certificateName));
     });

    it('Verify "IP Address Provisioning" functionality - [1329637]', async () => {
         const stepLogger = new StepLogger(1329637);
         const regionNameToBeAdded = IpAddressesPageConstants.ipAddressTableValueTexts.regionName;
         await IpAddressesPageHelper.addIpAddress(regionNameToBeAdded, stepLogger);

         stepLogger.step('delete the added IP');
         await WaitHelper.getInstance().waitForElementToBeDisplayed(IpAddressesPage.getDeleteIpAddressButton(regionNameToBeAdded));
         await PageHelper.click(IpAddressesPage.getDeleteIpAddressButton(regionNameToBeAdded));
         await PageHelper.closeAlertIfPresent();

         stepLogger.step('Waiting for delete to get affected');
         await browser.sleep(PageHelper.timeout.s);
     });

    it('Verify "Deletion of IP Address" functionality - [1329638]', async () => {
         const stepLogger = new StepLogger(1329638);
         const regionNameToBeAdded = IpAddressesPageConstants.ipAddressTableValueTexts.regionName;
         await IpAddressesPageHelper.addIpAddress(regionNameToBeAdded, stepLogger);

         stepLogger.stepId(4);
         stepLogger.step('Click on "Delete" button displayed next to the IP Address Provisioned ' +
             'as per pre requisites for a region [Ex: Asia Pacific (Singapore)]');
         await WaitHelper.getInstance().waitForElementToBeDisplayed(IpAddressesPage.getDeleteIpAddressButton(regionNameToBeAdded));
         await PageHelper.click(IpAddressesPage.getDeleteIpAddressButton(regionNameToBeAdded));

         stepLogger.verification('A Message box with text "Are you sure? There is no undo" ' +
             'with OK, Cancel buttons displayed');
         await expect(await PageHelper.getAlertText()).toBe(IpAddressesPageConstants.alertMessages.deleteIpAddressMessage,
             ValidationsHelper.getDisplayedValidation(IpAddressesPageConstants.alertMessages.deleteIpAddressMessage));

         stepLogger.stepId(5);
         stepLogger.step('Click "OK" in message box displayed');
         await PageHelper.closeAlertIfPresent();

         stepLogger.step('Waiting for delete to get affected');
         await browser.sleep(PageHelper.timeout.s);

         stepLogger.verification('Status displayed as "deprovisioning" for the deleted IP address');
         await expect(await PageHelper.isElementDisplayed(IpAddressesPage.getDeprovisioningMessageForRegion(
             regionNameToBeAdded))).toBe(true, ValidationsHelper.getDisplayedValidation(regionNameToBeAdded));

         stepLogger.stepId(6);
         stepLogger.step('Select Tools > IP Addresses menu option');
         await IpAddressesPageHelper.navigateToOtherPageAndBackToIpAddressesPage(stepLogger);

         stepLogger.verification('"IP Addresses" page is refreshed and displayed again');
         await expect(await PageHelper.isElementDisplayed(IpAddressesPage.ipAddressesHeader)).toBe(
             true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.optionsUnderToolsSection.ipAddresses));

         stepLogger.verification('Deleted IP address is NOT displayed but Previously Provisioned IP Addresses (if any) displayed');
         await expect(await IpAddressesPage.getAddedRegionInTable(regionNameToBeAdded).count()).toBeGreaterThanOrEqual(
             1, ValidationsHelper.getDisplayedValidation(regionNameToBeAdded));

         stepLogger.stepId(7);
         stepLogger.step('Check the values displayed in Region wise IP address statistics table' +
             ' for the region in which IP Address is deleted [Ex: Asia Pacific (Singapore)]');
         stepLogger.verification('Text "0 / 0" displayed in Attached/Provisioned IPs ' +
             'column for the Region in which IP Address is deleted [Ex: Asia Pacific (Singapore)]');
         await expect(await PageHelper.isElementDisplayed(IpAddressesPage.getZeroByValueForRegion(regionNameToBeAdded))).toBe(
             true, ValidationsHelper.getDisplayedValidation(IpAddressesPageConstants.ipAddressTableValueTexts.zeroByValue));
     });

    it('Verify "Add Environment Blueprint" functionality - [1329654]', async () => {
         const stepLogger = new StepLogger(1329654);
         const blueprintName = shortId.generate();
         await ManageBlueprintsPageHelper.addBlueprint(blueprintName, stepLogger);

         stepLogger.step('delete the added Blueprint');
         await PageHelper.click(ManageBlueprintsPage.getDeleteBlueprintButton(blueprintName));
         await PageHelper.closeAlertIfPresent();

         stepLogger.step('Waiting for delete to get affected');
         await browser.sleep(PageHelper.timeout.s);
     });

    it('Verify "Delete Environment Blueprint" functionality - [1329655]', async () => {
         const stepLogger = new StepLogger(1329655);
         const blueprintName = shortId.generate();
         await ManageBlueprintsPageHelper.addBlueprint(blueprintName, stepLogger);

         stepLogger.stepId(4);
         stepLogger.step('Click "Delete" button displayed next to the Environment Blueprint' +
             ' created as per prerequisites [Ex: SaiBluePrint]');
         await PageHelper.click(ManageBlueprintsPage.getDeleteBlueprintButton(blueprintName));

         stepLogger.verification('Message box with text "Are you sure you wish to destroy this blueprint?"' +
             ' with OK, Cancel button displayed');
         await expect(await PageHelper.getAlertText()).toBe(ManageBlueprintsPageConstants.messages.deleteBlueprint,
             ValidationsHelper.getDisplayedValidation(ManageBlueprintsPageConstants.messages.deleteBlueprint));

         stepLogger.stepId(5);
         stepLogger.step('Click "OK" in message box displayed');
         await PageHelper.closeAlertIfPresent();

         stepLogger.step('Waiting for delete to get affected');
         await browser.sleep(PageHelper.timeout.s);

         stepLogger.verification('"Environment Blueprints" page refreshed and displayed');
         await expect(await PageHelper.isElementDisplayed(ManageBlueprintsPage.getManageBlueprintsHeader())).toBe(
             true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.pageHeaders.environmentBlueprints));

         stepLogger.verification('Deleted Environment blueprint [Ex: SaiBluePrint] is NOT displayed ' +
             'in "Environment Blueprints" grid/table ');
         await expect(await PageHelper.isElementPresent(ManageBlueprintsPage.getEnvironmentBluePrintUsingName(blueprintName))).toBe(
             false, ValidationsHelper.getDisplayedValidation(blueprintName));
     });

    it('Verify "Add Network" functionality - [1329639]', async () => {
         const stepLogger = new StepLogger(1329639);

         stepLogger.stepId(3);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.networks, stepLogger);
         await ToolsPageHelper.verifyNetworkPageDisplayed(stepLogger);
         await ToolsPageHelper.verifyExistingNetworks(stepLogger);

         stepLogger.stepId(4);
         await ToolsPageHelper.clickOnAddNetworkButton(stepLogger);
         await ToolsPageHelper.verifyNewNetworkPageDisplayed(stepLogger);
         await ToolsPageHelper.verifyValuePrepopulatedInFieldLocation(stepLogger);
         await ToolsPageHelper.verifyValuePrepopulatedInFieldTenancy(stepLogger);

         stepLogger.stepId(5);
         const networkName = ToolsPageConstants.existingNetworks.net + shortId.generate();
         await ToolsPageHelper.enterNetworkName(stepLogger, networkName);
         await ToolsPageHelper.checkClassicLinkCheckBox(stepLogger);

         stepLogger.stepId(6);
         await ToolsPageHelper.clickOnCreateNetworkButton(stepLogger);
         await ToolsPageHelper.verifyProvisioningMessageDisplayed(stepLogger);

         stepLogger.stepId(7);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.networks, stepLogger);
         await ToolsPageHelper.verifyNetworkPageDisplayed(stepLogger);
         await ToolsPageHelper.verifyNewlyAddedNetworks(stepLogger, networkName);
     });

    it('Verify "Delete Network" functionality - [1329649]', async () => {
         const stepLogger = new StepLogger(1329649);

         stepLogger.stepId(3);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.networks, stepLogger);
         await ToolsPageHelper.verifyNetworkPageDisplayed(stepLogger);
         await ToolsPageHelper.verifyExistingNetworks(stepLogger);

         stepLogger.stepId(4);
         await ToolsPageHelper.clickOnAddNetworkButton(stepLogger);
         await ToolsPageHelper.verifyNewNetworkPageDisplayed(stepLogger);
         await ToolsPageHelper.verifyValuePrepopulatedInFieldLocation(stepLogger);
         await ToolsPageHelper.verifyValuePrepopulatedInFieldTenancy(stepLogger);

         stepLogger.stepId(5);
         const networkName = ToolsPageConstants.existingNetworks.net + shortId.generate();
         await ToolsPageHelper.enterNetworkName(stepLogger, networkName);
         await ToolsPageHelper.checkClassicLinkCheckBox(stepLogger);

         stepLogger.stepId(6);
         await ToolsPageHelper.clickOnCreateNetworkButton(stepLogger);
         await ToolsPageHelper.verifyProvisioningMessageDisplayed(stepLogger);

         stepLogger.stepId(7);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.networks, stepLogger);
         await ToolsPageHelper.verifyNetworkPageDisplayed(stepLogger);
         await ToolsPageHelper.verifyNewlyAddedNetworks(stepLogger, networkName);
         await ToolsPageHelper.verifyNewlyAddedNetworksInNetworkList(stepLogger, networkName, false);
     });

    it('Verify "Early Access" enabling functionality - [1499260]', async () => {
         const stepLogger = new StepLogger(1499260);

         stepLogger.stepId(3);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.earlyAccess, stepLogger);
         await ToolsPageHelper.verifyManageEarlyAccessFeaturesPageDiplayed(stepLogger);
         await ToolsPageHelper.verifyListOfEarlyAccessFeatures(stepLogger);

         stepLogger.stepId(4);
         await ToolsPageHelper.searchFeature(stepLogger, ToolsPageConstants.earlyAccessList.ruby220);
         await ToolsPageHelper.clickOnEnable(stepLogger);

         stepLogger.stepId(5);
         const homePageLink = ToolsPageConstants.accessFeatureSelector.homePageClass;
         await ToolsPageHelper.clickOnHomePageLink(stepLogger, ToolsPage.anchorLinkSelectors(homePageLink).homePageLink);
         await ToolsPageHelper.clickOnAddApplicationLink(stepLogger);
         await ApplicationPageHelper.selectOptionFromDropdown(
             stepLogger, ApplicationPage.createApplicationSectionDropDowns.applicationLanguageId,
             ApplicationPageConstants.languageDropDownValues.ruby);
         await PageHelper.click(ApplicationPage.createApplicationSectionLabels.triggerSampleRuby);
         const createdByAutoAppName = 'Auto_appname_' + shortId.generate();
         await TextboxHelper.sendKeys(ApplicationPage.createApplicationSectionTextBoxes.applicationName, createdByAutoAppName);
         await DropDownHelper.selectOptionByText(
             ApplicationPage.createApplicationSectionDropDowns.webApplicationFrameworkId,
             ApplicationPageConstants.languageDropDownValues.railsFour);
         await ApplicationPageHelper.clickOnCreateApplicationButton(stepLogger);
         await ToolsPageHelper.verifyEnvironmentPageDisplayed(stepLogger);

         stepLogger.stepId(6);
         await EnvironmentPageHelper.clickOnRuntimeDropdown(stepLogger);
         await EnvironmentPageHelper.verifyRuntimeDropDownValuesSet(stepLogger, false);
     });

    it('Verify "Delete Snapshot" functionality - [1499278]', async () => {
         const stepLogger = new StepLogger(1499278);

         stepLogger.stepId(1);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.snapshots, stepLogger);
         await ToolsPageHelper.verifySnapshotsSettingsPageDisplayed(stepLogger);
         await ToolsPageHelper.verifyExistingSnapshotsInSnapshotGridDisplayed(stepLogger);

         stepLogger.stepId(2);
         await ToolsPageHelper.clickOnCheckBoxForFirstRecordInGrid(stepLogger);
         await ToolsPageHelper.clickOnDeleteSnapshotsButton(stepLogger);
         await ToolsPageHelper.verifyDeletedSnapshotDisabled(stepLogger);

         stepLogger.stepId(3);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.snapshots, stepLogger);
         await ToolsPageHelper.verifySnapshotsSettingsPageDisplayed(stepLogger);
         await ToolsPageHelper.verifyExistingSnapshotsInSnapshotGridDisplayed(stepLogger);
         await ToolsPageHelper.verifyDeletedSnapshotNotDisplayedInGrid(stepLogger);
     });

    it('Verify "Add Load Balancer" functionality - [1499267]', async () => {
         const stepLogger = new StepLogger(1499267);

         stepLogger.stepId(1);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(
             ToolsPageConstants.optionsUnderToolsSection.classicLoadBalancers, stepLogger);
         await ToolsPageHelper.verifyLoadBalancerPageDisplayed(stepLogger);

         stepLogger.stepId(2);
         await ToolsPageHelper.verifyLoadBalancersDisplayedIfExisting(stepLogger);
         await ToolsPageHelper.clickOnLoadBalancerButton(stepLogger);
         await ToolsPageHelper.verifyNewLoadBalancerPageDisplayed(stepLogger);

         stepLogger.stepId(3);
         await PageHelper.click(ToolsPage.createLoadBalancerDropDown.environmentId);
         await ApplicationPageHelper.selectOptionFromDropdown(stepLogger,
             ToolsPage.createLoadBalancerDropDown.environmentId,
             ToolsPageConstants.provisioningMessage.test);
         await TextboxHelper.sendKeys(ToolsPage.createLoadBalancerTextBox.environmentName,
             ToolsPageConstants.provisioningMessage.test);
         await ToolsPageHelper.clickOnCreateClassicLoadBalancerButton(stepLogger);
         await ToolsPageHelper.verifyLoadBalancerMessageAndStatus(stepLogger);
         await ToolsPageHelper.navigateToPageUnderToolsDropDown(
             ToolsPageConstants.optionsUnderToolsSection.classicLoadBalancers, stepLogger);

         stepLogger.stepId(4);
         await ToolsPageHelper.verifyNewlyCreatedLoadBalancerDisplayed(stepLogger);
     });

    it('Verify "Delete Load Balancer" functionality - [1499269]', async () => {
        const stepLogger = new StepLogger(1499269);

        stepLogger.stepId(1);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(
            ToolsPageConstants.optionsUnderToolsSection.classicLoadBalancers, stepLogger);
        await ToolsPageHelper.verifyLoadBalancerPageDisplayed(stepLogger);

        stepLogger.stepId(2);
        await ToolsPageHelper.verifyLoadBalancersDisplayedIfExisting(stepLogger);
        await ToolsPageHelper.clickOnLoadBalancerButton(stepLogger);
        await ToolsPageHelper.verifyNewLoadBalancerPageDisplayed(stepLogger);

        stepLogger.stepId(3);
        await PageHelper.click(ToolsPage.createLoadBalancerDropDown.environmentId);
        await ApplicationPageHelper.selectOptionFromDropdown(stepLogger,
            ToolsPage.createLoadBalancerDropDown.environmentId,
            ToolsPageConstants.provisioningMessage.test);
        await TextboxHelper.sendKeys(ToolsPage.createLoadBalancerTextBox.environmentName,
            ToolsPageConstants.provisioningMessage.test);
        await ToolsPageHelper.clickOnCreateClassicLoadBalancerButton(stepLogger);
        await ToolsPageHelper.verifyLoadBalancerMessageAndStatus(stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(
            ToolsPageConstants.optionsUnderToolsSection.classicLoadBalancers, stepLogger);

        stepLogger.stepId(4);
        await ToolsPageHelper.verifyNewlyCreatedLoadBalancerDisplayed(stepLogger);
        await ToolsPageHelper.deleteNewlyCreatedLoadBalancer(stepLogger);
    });

});
