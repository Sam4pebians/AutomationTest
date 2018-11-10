import {ToolsPageHelper} from '../tools-page.helper';
import {ToolsPageConstants} from '../tools-page.constants';
import {StepLogger} from '../../../../../core/logger/step-logger';
import {PageHelper} from '../../../../components/html/page-helper';
import {IpAddressesPage} from './ip-addresses.po';
import {ValidationsHelper} from '../../../../components/misc-utils/validation-helper';
import {IpAddressesPageConstants} from './ip-addresses-page.constants';
import {HomePageHelper} from '../../home-page/home-page.helper';
import {browser} from 'protractor';

export class IpAddressesPageHelper {
    static async addIpAddress(regionName: string, stepLogger: StepLogger) {
        stepLogger.step('Select Tools > IP Addresses menu option');
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.ipAddresses, stepLogger);

        stepLogger.verification('"IP Addresses" page displayed');
        await expect(await PageHelper.isElementDisplayed(IpAddressesPage.ipAddressesHeader)).toBe(
            true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.optionsUnderToolsSection.ipAddresses));

        stepLogger.step('Click on "Provision Address" button {+ button} displayed next to the' +
            ' required region [Ex: Asia Pacific (Singapore)]');
        await PageHelper.click(IpAddressesPage.getClassicButtonUsingRegionName(regionName));

        stepLogger.verification('Message "Provisioning 1 address" displayed below the region selected' +
            ' for IP address Provisioning [Ex: Asia Pacific (Singapore)]');
        await expect(await PageHelper.isElementDisplayed(IpAddressesPage.provisioningAddressMessage)).toBe(
            true, ValidationsHelper.getDisplayedValidation(IpAddressesPageConstants.ipAddressTableValueTexts.provisioningAddress));

        stepLogger.step('Select Tools > IP Addresses menu option');
        await this.navigateToOtherPageAndBackToIpAddressesPage(stepLogger);

        stepLogger.verification('"IP Addresses" page is refreshed and displayed again');
        await expect(await PageHelper.isElementDisplayed(IpAddressesPage.ipAddressesHeader)).toBe(
            true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.optionsUnderToolsSection.ipAddresses));

        stepLogger.verification('Newly Provisioned IP address along with Previously' +
            ' Provisioned IP Addresses (if any) displayed');
        await expect(await IpAddressesPage.getAddedRegionInTable(regionName).count()).toBeGreaterThanOrEqual(
            2, ValidationsHelper.getDisplayedValidation(regionName));

        stepLogger.verification('Text "0 / 1" displayed in Attached/Provisioned IPs column for ' +
            'the Region in which IP Address provisioned [Ex: Asia Pacific (Singapore)]');
        await expect(await PageHelper.isElementDisplayed(IpAddressesPage.getZeroByValueForRegion(regionName))).toBe(
            true, ValidationsHelper.getDisplayedValidation(IpAddressesPageConstants.ipAddressTableValueTexts.zeroByValue));
    }

    static async navigateToOtherPageAndBackToIpAddressesPage(stepLogger: StepLogger) {
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.auditReport, stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.earlyAccess, stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);
        await HomePageHelper.verifyEngineYardCloudPage();
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.ipAddresses, stepLogger);

        stepLogger.step('need to give sleep as it is taking time to reflect added data');
        await browser.sleep(PageHelper.timeout.s);

        stepLogger.step('need to refresh page as it is taking time to load data');
        await PageHelper.refreshPage();

        stepLogger.step('need to give sleep as it is taking time to reflect added data after refreshing');
        await browser.sleep(PageHelper.timeout.s);
    }

}
