import {BasePage} from '../../base-page';
import {CommonPage} from '../../common/common.po';
import {ManageBlueprintsPageConstants} from './manage-blueprints-page.constants';
import {CommonPageConstants} from '../../common/common-page.constants';

export class ManageBlueprintsPage extends BasePage {
    static getManageBlueprintsHeader() {
        return CommonPage.getHeaderFourByText(CommonPageConstants.pageHeaders.environmentBlueprints);
    }

    static get createNewBlueprintHeader() {
        return CommonPage.getHeaderOneByText(CommonPageConstants.pageHeaders.createNewBlueprint);
    }

    static buttons() {
        return {
            addEnvironmentBlueprint: CommonPage.getSpanByText(ManageBlueprintsPageConstants.buttons.addEnvironmentBlueprint),
            createThisBlueprint: CommonPage.getButtonContainsText(ManageBlueprintsPageConstants.buttons.createThisBlueprint)
        };
    }

    static getEnvironmentBluePrintUsingName(blueprintName: string) {
        return CommonPage.getAnchorContainsText(blueprintName);
    }

    static getDeleteBlueprintButton(blueprintName: string) {
        return CommonPage.getButtonInsideTableContainingText(
            blueprintName, false, CommonPageConstants.labelTexts.deleteLabel);
    }
}
