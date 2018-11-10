import {ToolsPageHelper} from '../tools-page.helper';
import {ToolsPageConstants} from '../tools-page.constants';
import {StepLogger} from '../../../../../core/logger/step-logger';
import {PageHelper} from '../../../../components/html/page-helper';
import {ValidationsHelper} from '../../../../components/misc-utils/validation-helper';
import {ManageBlueprintsPage} from './manage-blueprints.po';
import {CommonPage} from '../../common/common.po';
import {CommonPageConstants} from '../../common/common-page.constants';
import {TextboxHelper} from '../../../../components/html/textbox-helper';
import {HtmlHelper} from '../../../../components/misc-utils/html-helper';

export class ManageBlueprintsPageHelper {
    static async addBlueprint(blueprintName: string, stepLogger: StepLogger) {
        stepLogger.step('Select Tools > Manage Blueprints menu option');
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.manageBlueprints, stepLogger);

        stepLogger.verification('"Environment Blueprints" page displayed');
        await expect(await PageHelper.isElementDisplayed(ManageBlueprintsPage.getManageBlueprintsHeader())).toBe(
            true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.pageHeaders.environmentBlueprints));

        stepLogger.step('Click on "Add Environment Blueprint" button');
        await PageHelper.click(ManageBlueprintsPage.buttons().addEnvironmentBlueprint);

        stepLogger.verification('"Create a new Environment Blueprint" page is displayed');
        await expect(await PageHelper.isElementDisplayed(ManageBlueprintsPage.createNewBlueprintHeader)).toBe(
            true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.pageHeaders.createNewBlueprint));

        stepLogger.verification('"Name of blueprint" is automatically generated and displayed along with ' +
            'few other default values selected/populated');
        await expect(await PageHelper.getAttributeValue(CommonPage.getNameTextBox(), HtmlHelper.additionalAttributes.value)).not.toBe(
            '', ValidationsHelper.getDisplayedValidation(CommonPageConstants.labelIds.nameId));

        stepLogger.step('Change Name of blueprint that is pre-populated [Ex: SaiBluePrint]');
        await TextboxHelper.sendKeys(CommonPage.getNameTextBox(), blueprintName);

        stepLogger.step('Click on "Create this blueprint" button');
        await PageHelper.click(ManageBlueprintsPage.buttons().createThisBlueprint);

        stepLogger.verification('"Create a new Environment Blueprint" page is closed');
        await expect(await PageHelper.isElementPresent(ManageBlueprintsPage.createNewBlueprintHeader)).toBe(
            false, ValidationsHelper.getNotDisplayedValidation(CommonPageConstants.pageHeaders.createNewBlueprint));

        stepLogger.verification('"Environment Blueprints" page refreshed and displayed');
        await expect(await PageHelper.isElementDisplayed(ManageBlueprintsPage.getManageBlueprintsHeader())).toBe(
            true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.pageHeaders.environmentBlueprints));

        stepLogger.verification('Newly added Environment Blueprint [Ex: SaiBluePrint] is displayed in the grid/table');
        await expect(await PageHelper.isElementDisplayed(ManageBlueprintsPage.getEnvironmentBluePrintUsingName(blueprintName))).toBe(
            true, ValidationsHelper.getDisplayedValidation(blueprintName));
    }

}
