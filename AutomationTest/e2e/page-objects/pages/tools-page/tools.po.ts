import {BasePage} from '../base-page';
import {CommonPage} from '../common/common.po';
import {ToolsPageConstants} from './tools-page.constants';
import {By, element} from 'protractor';
import {CommonPageConstants} from '../common/common-page.constants';
import {CheckboxHelper} from '../../../components/html/checkbox-helper';

export class ToolsPage extends BasePage {
    static getOptionUnderToolsDropDown(optionName: string) {
        return CommonPage.getSpanTextBytDivId(ToolsPageConstants.toolsDropDownContentId, false, optionName);
    }

    static get toolsDropDown() {
        return element(By.id(ToolsPageConstants.toolsDropDownId));
    }

    static get networkFields() {
        return{
            location: element(By.id('uniform-network_location')),
            tenancy: element(By.id('uniform-network_tenancy')),
            cidr: element(By.id('network_cidr')),
            name: element(By.id('network_name')),
            classicLink: element(By.id('uniform-network_classic_link')),
        };
    }

    static get createLoadBalancerDropDown() {
        return {
            environmentId: element(By.id('uniform-load_balancer_environment')),
            environmentRegionId: element(By.id('uniform-environment_region')),
            networkId: element(By.id('uniform-environment_network_id'))
        };
    }

    static get createLoadBalancerTextBox() {
        return {
            environmentName: element(By.id('load_balancer_name')),
        };
    }

    static get buttonLabel() {
        const deleteButton = CommonPageConstants.labelTexts.deleteLabel;
        const createClassicLoadBalancer = ToolsPageConstants.buttonText.createClassicLoadBalancer;
        const addClassicLoadBalancer = ToolsPageConstants.buttonText.addClassicLoadBalancer;
        const deleteSnapshots = ToolsPageConstants.buttonText.deleteSnapshots;
        const createNetwork = ToolsPageConstants.buttonText.createNetwork;
        return {
            delete: CommonPage.getButtonContainsText(deleteButton),
            createClassicLoadBalancer: CommonPage.getButtonContainsText(createClassicLoadBalancer),
            addClassicLoadBalancer: CommonPage.getSpanContainsText(addClassicLoadBalancer),
            deleteSnapshots: CommonPage.getButtonContainsText(deleteSnapshots),
            // addNetwork: ButtonHelper.getButtonUsingSpanXpath('button', ToolsPageConstants.buttonText.addNetwork, true),
            createNetwork: CommonPage.getButtonContainsText(createNetwork),
            addNetwork : CommonPage.getSpanContainsText(ToolsPageConstants.buttonText.addNetwork),
            addRawEC2Env: CommonPage.getSpanContainsText(ToolsPageConstants.buttonText.addRawEC2Network),
        };
    }

    static get textSelector() {
        const createClassicLoadBalancer = ToolsPageConstants.provisioningMessage.test;
        const createClassicLoadBalancerMsg = ToolsPageConstants.provisioningMessage.awsMessage;
        const createClassicLoadBalancerStatusMsg = ToolsPageConstants.provisioningMessage.status;
        const newLoadBalancerPage = ToolsPageConstants.pageHeader.newLoadBalancer;
        const loadBalancerPage = ToolsPageConstants.optionsUnderToolsSection.classicLoadBalancers;
        const snapshot = ToolsPageConstants.optionsUnderToolsSection.snapshots;
        const existingNetworks = ToolsPageConstants.existingNetworks.defaultNetwork;
        const newNetwork = ToolsPageConstants.pageHeader.newNetwork;
        return {
            createClassicLoadBalancerText: CommonPage.getAnchorContainsText(createClassicLoadBalancer),
            createClassicLoadBalancerMsgText: CommonPage.getHeaderThreeContainsText(createClassicLoadBalancerMsg),
            createClassicLoadBalancerStatusMsgText: CommonPage.getParagraphContainsText(createClassicLoadBalancerStatusMsg),
            newLoadBalancerPageHeaderText: CommonPage.getHeaderOneContainingText(newLoadBalancerPage),
            loadBalancerPageHeaderText: CommonPage.getHeaderOneContainingText(loadBalancerPage),
            environmentOne: CommonPage.getTdContainsText(ToolsPageConstants.existingSnapshot.environmentOne),
            environmentTwo: CommonPage.getTdContainsText(ToolsPageConstants.existingSnapshot.environmentTwo),
            environmentThree: CommonPage.getTdContainsText(ToolsPageConstants.existingSnapshot.environmentThree),
            environmentFour: CommonPage.getTdContainsText(ToolsPageConstants.existingSnapshot.environmentFour),
            environmentFive: CommonPage.getTdContainsText(ToolsPageConstants.existingSnapshot.environmentFive),
            snapShotText: CommonPage.getHeaderOneContainingText(snapshot),
            networkText: CommonPage.getAnchorContainsText(ToolsPageConstants.optionsUnderToolsSection.networks),
            existingNetworks: CommonPage.getTdContainsText(existingNetworks),
            newNetwork: CommonPage.getHeaderTwoContainingText(newNetwork),
            messageText: CommonPage.getDivContainsClass(ToolsPageConstants.networkFieldsText.messageSuccess),
            newNetworkText: CommonPage.getTdContainsText(ToolsPageConstants.pageHeader.newNetwork),
            earlyAccessManagePageHeaderText: CommonPage.getHeaderOneContainingText(
                ToolsPageConstants.pageHeader.earlyAccessManageFeatures),
            sixtyFourBit: CommonPage.getHeaderTwoContainingText(CommonPageConstants.labelsInPage.sixtyFourBitOnly),
            statusDisable: CommonPage.getSpanContainsText(CommonPageConstants.labelsInPage.statusDisable),
            accountDashboard: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.accountDashboard),
            addDBMaster: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.addDBMaster),
            statusEnable: CommonPage.getSpanContainsText(CommonPageConstants.labelsInPage.statusEnable),
            addRemoveAPI: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.addRemoveAPI),
            allowEBSEncryption: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.allowEBSEncryption),
            allowStackSelect: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.allowStackSelect),
            apache: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.apache),
            appSlaveAddress: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.appSlaveAddress),
            appFirstEnabled: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.appFirstEnabled),
            asyncDashboard: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.asyncDashboard),
            dashboardPaging: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.dashBoardPaging),
            azureNorthEurope: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.azureNorthEurope),
            awsVolumeOptimized: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.awsVolumeOptimized),
            autoClusterUpdate: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.autoClusterUpdate),
            autoScaling: CommonPage.getHeaderTwoContainingText(ToolsPageConstants.earlyAccessList.autoScaling),
            addRawRC2Env: CommonPage.getHeaderOneContainingText(ToolsPageConstants.pageHeader.createNewRawRC2Env),
            tenancyValueText: CommonPage.getTdContainsText(ToolsPageConstants.networkFieldsText.cidr),
            deleteExistingSubnetRecord: CommonPage.getTdContainsText(ToolsPageConstants.buttonText.delete),
        };
    }

    static get checkBoxSelector() {
        const text = ToolsPageConstants.earlyAccessList.text;
        const idValue = ToolsPageConstants.checkBoxSelectors.checkboxId;
        return {
            clickCheckBoxInSnapShotGrid: CheckboxHelper.getCheckBoxUsingTD(idValue, text, true),
        };
    }

    static anchorLinkSelectors(text: string) {
        return {
            homePageLink: CommonPage.getAnchorContainsClass(text),
            awsNetworkLink: CommonPage.getAnchorContainsText(text),
        };
    }

    static get networkGridValue() {
        return {
            location: CommonPage.getTdContainsText(ToolsPageConstants.networkFieldsText.location),
        };
    }
}
