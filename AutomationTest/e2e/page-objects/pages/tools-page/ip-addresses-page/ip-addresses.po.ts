import {BasePage} from '../../base-page';
import {CommonPage} from '../../common/common.po';
import {ToolsPageConstants} from '../tools-page.constants';
import {CommonPageConstants} from '../../common/common-page.constants';
import {IpAddressesPageConstants} from './ip-addresses-page.constants';

export class IpAddressesPage extends BasePage {
    static get ipAddressesHeader() {
        return CommonPage.getHeaderOneByText(ToolsPageConstants.optionsUnderToolsSection.ipAddresses);
    }

    static getClassicButtonUsingRegionName(regionName: string) {
        return CommonPage.getAnchorInsideTableContainingText(
            regionName, false, CommonPageConstants.labelTexts.classic);
    }

    static get provisioningAddressMessage() {
        return CommonPage.getTdContainsText(IpAddressesPageConstants.ipAddressTableValueTexts.provisioningAddress);
    }

    static getAddedRegionInTable(regionName: string) {
        return CommonPage.getAllTdByText(regionName, true);
    }

    static getZeroByValueForRegion(regionName: string) {
        return CommonPage.getFollowingSiblingOfTableElementContainingText(
            regionName, false, IpAddressesPageConstants.ipAddressTableValueTexts.zeroByValue);
    }

    static getDeleteIpAddressButton(regionName: string) {
        return CommonPage.getFollowingSiblingOfTableElementContainingClassName(
            regionName, false, CommonPageConstants.labelTexts.deleteLabel.toLowerCase());
    }

    static getDeprovisioningMessageForRegion(regionName: string) {
        return CommonPage.getFollowingSiblingOfTableElementContainingText(
            regionName, false, IpAddressesPageConstants.ipAddressTableValueTexts.deprovisioning);
    }
}
