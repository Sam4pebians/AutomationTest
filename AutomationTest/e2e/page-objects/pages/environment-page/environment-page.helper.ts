import {TextboxHelper} from '../../../components/html/textbox-helper';
import {EnvironmentPage} from './environment.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {DropDownHelper} from '../../../components/html/dropdown-helper';
import {PageHelper} from '../../../components/html/page-helper';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {CommonPageConstants} from '../common/common-page.constants';
import {CommonPageHelper} from '../common/common-page.helper';
import {CommonPage} from '../common/common.po';
import {EnvironmentPageConstants} from './environment-page.constants';
import {browser, ElementFinder} from 'protractor';
import {CommonPageValidations} from '../common/common-page.validations';
import {Constants} from '../../../components/misc-utils/constants';
import {ApplicationPageHelper} from '../application-page/application-page.helper';
import {ElementHelper} from '../../../components/html/element-helper';
import {HtmlHelper} from '../../../components/misc-utils/html-helper';
import {ConfigurationPageConstants} from '../configuration-page/configuration-page.constants';
import {ToolsPageConstants} from '../tools-page/tools-page.constants';
import {ToolsPageHelper} from '../tools-page/tools-page.helper';
import {ConfigurationPage} from '../configuration-page/configuration.po';

const environmentNameTer = CommonPageConstants.autoPrefix.prefix + ConfigurationPageConstants.automationPrefix.autoEnvPrefixDel;
const applicationNameTer = CommonPageConstants.autoPrefix.prefix + ConfigurationPageConstants.automationPrefix.autoAppPrefixDel;

export class EnvironmentPageHelper {

    static getApplicationLinkUsingName(applicationName: string) {
        return CommonPage.getAnchorByText(applicationName);
    }

    static async createNewEnvironment(environmentName: string, railsEnvironment: string, stepLogger: StepLogger) {
        stepLogger.step('Enter the value in "Environment Name" text box');
        await TextboxHelper.sendKeys(EnvironmentPage.createEnvironmentTextBoxes.environmentName, environmentName);

        stepLogger.step('Select the value in "Rails Environment" drop down');
        await DropDownHelper.selectOptionByText(
            EnvironmentPage.createEnvironmentDropDowns.railsEnvironment, railsEnvironment);

        stepLogger.step('Scroll down and click "Create Environment" button displayed at ' +
            'the bottom of "Create New Environment" Page');
        await PageHelper.click(EnvironmentPage.createEnvironmentButtons.createEnvironment);
    }

    static async verifyEnvironmentPage(applicationName: string, stepLogger: StepLogger) {
        stepLogger.step('Refresh the page');
        await PageHelper.refreshPage();
        stepLogger.verification('"Create New Environment" Page is displayed');
        await expect(await PageHelper.isElementDisplayed(CommonPageHelper.pageHeaders.createNewEnvironment))
        .toBe(true,
             ValidationsHelper.getDisplayedValidation(CommonPageConstants.pageHeaders.createNewEnvironment));

        stepLogger.verification('A bread crumb link with selected application name [Ex: todoappsai] is displayed' +
            ' on right side of "Home" symbol on top of this page');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPageHelper.getApplicationLinkUsingName(applicationName)))
        .toBe(true,
            ValidationsHelper.getDisplayedValidation(applicationName));
    }

    static async verifyShowWalkThroughBoxDisplayed(stepLogger: StepLogger) {
        stepLogger.verification('Check "Show Walk through" help box display with information');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.showBoxHelper.showBoxHelperCheckBox))
            .toBe(true,
                 ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.verifyBoxesMessage.showHelperBoxMsg));
    }

    static async verifyNavigationToGitRepo(stepLogger: StepLogger) {
        stepLogger.verification('Verify "Show Walk through" help box is displayed on right side of "Git Repository URI" text box');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.showBoxHelper.showBoxHelperMessageForGit))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.verifyBoxesMessage.showHelperBoxMsgForGit));
    }

    static async verifyNavigationToApplicationName(stepLogger: StepLogger) {
         stepLogger.verification('Check "Show Walk through" help box display with information');
         await expect(await PageHelper.isElementDisplayed(EnvironmentPage.showBoxHelper.showBoxHelperMessageForAppName))
             .toBe(true,
                 ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.verifyBoxesMessage.showHelperBoxAppName));
     }

     static async clickOnCreateEnvironmentButton(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on Create Environment button');
        await PageHelper.click(EnvironmentPage.createEnvironmentButtons.createEnvironment);
    }

    static async clickOnRuntimeDropdown(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on runtime button');
        await PageHelper.click(EnvironmentPage.createEnvironmentDropDowns.runtime);
    }

    static async verifyRuntimeDropDownValuesSet(stepLogger: StepLogger, isSelected= false) {
        if (isSelected) {
            await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                EnvironmentPageConstants.runtimeDropDown.optionValue);
            await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                EnvironmentPageConstants.runtimeDropDown.optionValueOne);
            await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                EnvironmentPageConstants.runtimeDropDown.optionValueTwo);
            await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                EnvironmentPageConstants.runtimeDropDown.optionValueThree);
            await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                EnvironmentPageConstants.runtimeDropDown.optionValueFour);
            await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                EnvironmentPageConstants.runtimeDropDown.optionValueFive);
             } else {
                await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                    EnvironmentPageConstants.runtimeDropDown.optionValue);
                await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                    EnvironmentPageConstants.runtimeDropDown.optionValueOne);
                await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                    EnvironmentPageConstants.runtimeDropDown.optionValueTwo);
                await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.runtime,
                    EnvironmentPageConstants.runtimeDropDown.optionValueFive);
        }
    }

    static async rubyGemsDropDownOptions(stepLogger: StepLogger) {
        stepLogger.step('Click on the Ruby Gems drop down');
        await ElementHelper.click(EnvironmentPage.createEnvironmentDropDowns.runtime);
    }

    static async verifyRubyGemsDropdownValues(stepLogger: StepLogger) {
        stepLogger.verification('Verify the values in the Ruby Gems drop values');
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValue);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueOne);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueTwo);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueThree);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueFour);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueFive);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueSix);
    }

    static async verifyRubyGemsDropdownValuesForRuby200(stepLogger: StepLogger) {
        stepLogger.step('Verify the values in the Ruby Gems drop values when Ruby 2.0.0 selected');
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueThree);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueFour);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueFive);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.rubyGems,
            EnvironmentPageConstants.rubyGemsDropDown.optionValueSix);
    }

    static async verifyRubyGemsDropDownValues(stepLogger: StepLogger) {
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.railsEnvironment,
            EnvironmentPageConstants.railsEnvironmentDropDown.development);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.railsEnvironment,
            EnvironmentPageConstants.railsEnvironmentDropDown.production);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.railsEnvironment,
            EnvironmentPageConstants.railsEnvironmentDropDown.staging);
        await ApplicationPageHelper.verifyOptionValue(stepLogger, EnvironmentPage.createEnvironmentDropDowns.railsEnvironment,
            EnvironmentPageConstants.railsEnvironmentDropDown.customEnvironment);
    }

    static async verifyDataVersioningCheckBox(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Verify the data versioning check box present');
        await PageHelper.scrollToElement(EnvironmentPage.getCheckBox.dataVersion);
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.getCheckBox.dataVersion))
            .toBe(true,
                 ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.checkBoxes.databaseVersioning));
        await PageHelper.refreshPage();
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
    }

    static async verifyCheckBoxNotPresent(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Verify the data versioning check box not present');
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        await expect(await PageHelper.isElementHidden(EnvironmentPage.getCheckBox.dataVersion))
            .toBe(true,
                 ValidationsHelper.getNotDisplayedValidation(EnvironmentPageConstants.checkBoxes.databaseVersioning));
        await PageHelper.refreshPage();
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
    }

    static async clickOnCreatedEnvironmentLink(stepLogger: StepLogger) {
        stepLogger.step('Click to open the created environment');
        const envlink = EnvironmentPageConstants.environmentLinkSelector.textNew;
        await PageHelper.click(CommonPage.getAnchorContainsText(envlink));
    }

    static async clickOnAutoScalingLink(stepLogger: StepLogger) {
        stepLogger.step('Click on Auto scaling link');
        const autoscalinglink = EnvironmentPageConstants.environmentLinkSelector.autoscaling;
        await PageHelper.click(CommonPage.getAnchorContainsText(autoscalinglink));
    }

    static async verifyAutoscalingCreationPageDisplayed(stepLogger: StepLogger) {
        stepLogger.verification('Verify Auto scaling creation page displayed');
        const autoscalingPage = EnvironmentPageConstants.environmentLinkSelector.autoscaling;
        await expect(await PageHelper.isElementDisplayed(CommonPage.getHeaderThreeContainsText(autoscalingPage)))
            .toBe(true,
                 ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.environmentLinkSelector.autoscaling));
    }

    static async clickOnAddNewLink(stepLogger: StepLogger) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on the Add New link');
        const addnewlink = EnvironmentPageConstants.environmentLinkSelector.addNew;
        await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(addnewlink));
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        await ElementHelper.click(CommonPage.getAnchorContainsText(addnewlink));
    }

    static async verifyAddNewUI(stepLogger: StepLogger, isSimple = false, isCreate = false) {
        if (isSimple) {
            await this.verifyAddNewUIwithSimpleOption(stepLogger);
        } else {
            await this.verifyAddNewUIwithTargetOption(stepLogger);
        }
        if (isCreate) {
        stepLogger.step('Verify the create button');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.createButton))
             .toBe(true,
                 ValidationsHelper.getDisplayedValidation(CommonPageConstants.buttonText.createButton));
        }
        stepLogger.step('Verify the cancel button');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.cancelButton))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(CommonPageConstants.buttonText.cancelButton));
    }

    static async enterMinAndMaxValue(stepLogger: StepLogger) {
        stepLogger.step('Enter the minimum value');
        const minval = EnvironmentPageConstants.inputValue.minvalue;
        const maxval = EnvironmentPageConstants.inputValue.maxvalue;
        await TextboxHelper.sendKeys(EnvironmentPage.policySelectors.minimumValueTextBox, minval);
        stepLogger.step('Enter the maximum value');
        await TextboxHelper.sendKeys(EnvironmentPage.policySelectors.maximumValueTextBox, maxval);
    }

    static async enterName(stepLogger: StepLogger, text: string) {
        stepLogger.step('Enter name');
        await TextboxHelper.sendKeys(EnvironmentPage.policySelectors.name, text);
    }

    static async enterTargetValue(stepLogger: StepLogger) {
        stepLogger.step('Enter target value');
        const targetvalue = EnvironmentPageConstants.inputValue.targetvalue;
        await TextboxHelper.sendKeys(EnvironmentPage.policySelectors.targetValue, targetvalue);
    }

    static async clickOnCreateButton(stepLogger: StepLogger) {
        // *Step* - Wait for page to load
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on the Create Button');
        await PageHelper.click(EnvironmentPage.policySelectors.createButton);
    }

    static async navigateToEnvironmentPage() {
        // *Step* - Click on the application name
        await PageHelper.click(EnvironmentPage.environmentBreadCrumbs.breadCrumbApplication);
        // *Step* - Wait for page to load
        await browser.sleep(PageHelper.timeout.xs);
        // *Step* - Click on the environment name
        await PageHelper.click(EnvironmentPage.environmentLinks.environmentName);
    }

    static async verifyAutoScalingPage(stepLogger: StepLogger) {
        stepLogger.step('Verify the autoscaling UI elements- "Minimum Size" field is present');
        await CommonPageHelper.validateFieldIsDisplayed(EnvironmentPage.autoScalingGroupdetextBoxElements.minimumSize
        , EnvironmentPageConstants.autoScalingFormLabels.minimumSizeTextBox, true);
        stepLogger.step('Verify the autoscaling UI elements- "Maximum Size" field is present');
        await CommonPageHelper.validateFieldIsDisplayed(EnvironmentPage.autoScalingGroupdetextBoxElements.maximumSize
        , EnvironmentPageConstants.autoScalingFormLabels.maximumSizeTextBox, true);
        stepLogger.step('Verify the autoscaling UI elements- "Health Check Grace Period" field is present');
        await CommonPageHelper.validateFieldIsDisplayed(EnvironmentPage.autoScalingGroupdetextBoxElements.healthCheckGracePeriod
        , EnvironmentPageConstants.autoScalingFormLabels.healthCheckGracePeriodTextBox, true);
        stepLogger.step('Verify the autoscaling UI elements- "Default cool down" field is present');
        await CommonPageHelper.validateFieldIsDisplayed(EnvironmentPage.autoScalingGroupdetextBoxElements.defaultCooldown
        , EnvironmentPageConstants.autoScalingFormLabels.defaultCooldownTextBox, true);
        stepLogger.step('Verify the autoscaling UI elements- "Dynamic scaling policies" field is present');
        await CommonPageHelper.validateFieldIsDisplayed(EnvironmentPage.autoScalingGroupdetextBoxElements.dynamicScalingPolicies
        , CommonPageConstants.pageHeaders.dynamicScalingPolicies, true);
        stepLogger.step('Verify the autoscaling UI elements- "Create Auto Scaling Group" button is present');
        await CommonPageHelper.validateFieldIsDisplayed(EnvironmentPage.environmentButtons.createAutoScalingGroup
        , EnvironmentPageConstants.EnvironmentButtons.createAutoScalingGroup, true);
    }

    static async createAutoScalingGroup(stepLogger: StepLogger, min: string, max: string, grace: string, defaultCooldown: string) {
        await this.enterMinMaxGraceValue(stepLogger, min, max, grace);
        stepLogger.step('Enter Default Cooldown');
        await TextboxHelper.sendKeys(EnvironmentPage.autoScalingGroupdetextBoxElements.defaultCooldown, defaultCooldown);
        await this.clickOnAutoScalingGroupButton(stepLogger);
    }

    static async enterMinimumsizeValue(stepLogger: StepLogger, text: string) {
        stepLogger.step('Enter empty Minimum Size Auto scaling group inputs');
        await TextboxHelper.sendKeys(EnvironmentPage.autoScalingGroupdetextBoxElements.minimumSize, text);
    }

    static async clickOnAutoScalingGroupButton(stepLogger: StepLogger) {
        stepLogger.step('Click Create Auto Scaling Group');
        await PageHelper.click(EnvironmentPage.environmentButtons.createAutoScalingGroup);
    }

    static async verifyFormValidationMessage(stepLogger: StepLogger, message: string) {
        // *Step* - Wait for page to load
        await browser.sleep(PageHelper.timeout.s);
        stepLogger.verification('verify "Form submission failed" validation message');
        await CommonPageHelper.validateFieldIsDisplayed(EnvironmentPage.validationMessage.messageFlashbox
        , message, true);
    }

    static async enterFloatValue(stepLogger: StepLogger) {
        stepLogger.step('Enter a Float Value for Health Check Grace Period: e.g. 500.50');
        await EnvironmentPageHelper.createAutoScalingGroup(stepLogger, (CommonPageConstants.number.five).toString(),
        (CommonPageConstants.number.five).toString(), (CommonPageConstants.number.fiveHundredFloat).toString(),
        (CommonPageConstants.number.threeHundred).toString());
    }
    static async verifyToolTipValidation(stepLogger: StepLogger, message: string, messageOne: string, messageTwo: string) {
        stepLogger.verification('verify "Tool Tip" validation message');
        await expect(await message).toBe(messageOne, CommonPageValidations.getDisplayedValidation(messageTwo));
    }

    static async enterMinMaxGraceValue(stepLogger: StepLogger, minimumSize: string, maximumSize: string, healthCheckGracePeriod: string) {
        stepLogger.step('Enter Minimum Size');
        await TextboxHelper.sendKeys(EnvironmentPage.autoScalingGroupdetextBoxElements.minimumSize, minimumSize);
        stepLogger.step('Enter Maximum Size');
        await TextboxHelper.sendKeys(EnvironmentPage.autoScalingGroupdetextBoxElements.maximumSize, maximumSize);
        stepLogger.step('Enter Health Check Grace Period');
        await TextboxHelper.sendKeys(EnvironmentPage.autoScalingGroupdetextBoxElements.healthCheckGracePeriod,
            healthCheckGracePeriod);
    }

    static async enterSpace(stepLogger: StepLogger) {
        stepLogger.step('Enter Space as a Value in Default Cooldown field');
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        await TextboxHelper.sendKeys(EnvironmentPage.autoScalingGroupdetextBoxElements.defaultCooldown, Constants.keys.spaceBar);
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
    }

    static async clickOnAWSLink(stepLogger: StepLogger) {
        stepLogger.step('Click "AWS Documentation" link');
        await PageHelper.click(EnvironmentPage.environmentLinks.awsDocumentation);
    }

    static async switchToAWSTab(stepLogger: StepLogger) {
        stepLogger.step('Switch to "AWS Documentation" tab');
        await PageHelper.switchToNewTabIfAvailable();
    }

    static async verifyNavigationToAwsPage(stepLogger: StepLogger) {
        stepLogger.verification('User is navigated to AWS documenttion page');
        const pageHeaderText = EnvironmentPageConstants.awsPageHeader.text;
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.pageHeader.aws))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(pageHeaderText));
    }

    static async switchToDefaultTab(stepLogger: StepLogger) {
        stepLogger.step('Switch to "Parent page" tab');
        await PageHelper.switchToFirstTab();
    }

    static async verifyFormValidationMsg(stepLogger: StepLogger, message: string) {
        stepLogger.verification('verify "Form submission failed" validation message');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.validationMessage.messageFlashbox))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(message));
    }

    static async verifyAddNewUIwithTargetOption(stepLogger: StepLogger) {
        stepLogger.step('Verify the name');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.name))
            .toBe(true,
                 ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.name));
        stepLogger.step('Verify the metric type');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.metricType))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.metricType));
        stepLogger.step('Verify the target value');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.targetValue))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.targetValue));
        stepLogger.step('Verify the warmup period value');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.warmUpPeriod))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.warmUpPeriod));
    }

    static async verifyAddNewUIwithSimpleOption(stepLogger: StepLogger) {
        stepLogger.step('Verify the Aggregation');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.aggregation))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.aggregation));
        stepLogger.step('Verify the Metric');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.metric))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.metric));
        stepLogger.step('Verify the Operand');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.operand))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.operand));
        stepLogger.step('Verify the Trigger Value');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.triggerValue))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.triggerValue));
        stepLogger.step('Verify the Number of Periods');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.noOfPeriods))
                .toBe(true,
                    ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.noOfPeriods));
        stepLogger.step('Verify the Period Length');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.periodOfLength))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.periodLength));
        stepLogger.step('Verify the Action');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.action))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.action));
        stepLogger.step('Verify the Action Unit');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.actionUnit))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.actionunit));
        stepLogger.step('Verify the Action Value');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.actionValue))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.actionValue));
        stepLogger.step('Verify the cooldown');
        await expect(await PageHelper.isElementDisplayed(EnvironmentPage.policySelectors.coolDown))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(EnvironmentPageConstants.policyText.coolDown));
    }

    static async enterTriggerValue(stepLogger: StepLogger, text: string) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Enter trigger value');
        await TextboxHelper.sendKeys(EnvironmentPage.policySelectors.triggerValueName, text);
    }

    static async enterActionValue(stepLogger: StepLogger, text: string) {
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Enter action value');
        await TextboxHelper.sendKeys(EnvironmentPage.policySelectors.actionValueName, text);
    }

    static async verifyScalingLinks(stepLogger: StepLogger, elem: ElementFinder, name: string) {
        stepLogger.verification(`verify the ${name} link`);
        await expect(await PageHelper.isElementDisplayed(elem)).toBe(true,
                ValidationsHelper.getDisplayedValidation(name));
    }

    static async verifyScalingLinksByText(stepLogger: StepLogger) {
        await EnvironmentPageHelper.verifyScalingLinks(stepLogger, EnvironmentPage.policySelectors.policyName,
            EnvironmentPageConstants.policyText.simplePolicyName);
        await EnvironmentPageHelper.verifyScalingLinks(stepLogger, EnvironmentPage.policySelectors.editLink,
            EnvironmentPageConstants.policyText.editText);
        await EnvironmentPageHelper.verifyScalingLinks(stepLogger, EnvironmentPage.policySelectors.deleteLink,
            EnvironmentPageConstants.policyText.deleteText);
    }

    static async verifyValueSetInNameTextBox(stepLogger: StepLogger, value: string) {
        stepLogger.verification('verify the values set in textbox-name');
        const attributevalue = await EnvironmentPage.policySelectors.nameTextBox.getAttribute(
            HtmlHelper.additionalAttributes.value);
        await expect(attributevalue).toContain(value, ValidationsHelper.getFieldDisplayedValidation(value));
    }

    static async verifyValueSetInTriggerValueTextBox(stepLogger: StepLogger, value: string) {
        stepLogger.verification('verify the values set in textbox-Trigger value');
        const attributevalue = await EnvironmentPage.policySelectors.triggerValueTextBox.getAttribute(
            HtmlHelper.additionalAttributes.value);
        await expect(attributevalue).toContain(value, ValidationsHelper.getFieldDisplayedValidation(value));
    }

    static async clickOnCancelButton(stepLogger: StepLogger) {
        // *Step* - Wait for page to load
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on the Cancel Button');
        await ElementHelper.click(EnvironmentPage.policySelectors.cancelButton);
    }

    static async verifyPolicyFieldsNotDisplayed(stepLogger: StepLogger) {
        stepLogger.step('Click on the Cancel Button');
        await expect(await PageHelper.isElementHidden(EnvironmentPage.policySelectors.alarmSectionContainingFields))
            .toBe(true,
                 ValidationsHelper.getNotDisplayedValidation(EnvironmentPageConstants.policyText.alarm));
    }

    static async scrollToEnvLink(stepLogger: StepLogger) {
        stepLogger.postCondition('Terminate the created data.');
        stepLogger.step('Scroll to the environment link');
        await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(environmentNameTer));
    }

    static async clickOnEnvLink(stepLogger: StepLogger) {
        stepLogger.step('Click on the envrionment link');
        await PageHelper.click(CommonPage.getAnchorContainsText(environmentNameTer));
    }

    static async clickOnTerminateButton(stepLogger: StepLogger) {
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on the terminate button');
        await PageHelper.click(CommonPage.getAnchorContainsText(ConfigurationPageConstants.linkText.terminate));
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.xs);
    }

    static async verifyTerminateAlertMessage(stepLogger: StepLogger) {
        stepLogger.step('Verify the Terminate alert message box');
        await expect(await PageHelper.getAlertText()).toContain(ConfigurationPageConstants.alertMessage.alertText,
            ValidationsHelper.getDisplayedValidation(ConfigurationPageConstants.alertMessage.alertText));
    }

    static async acceptTerminateAlert(stepLogger: StepLogger) {
        stepLogger.step('Click "OK"on the alert message box');
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.xs);
        await PageHelper.closeAlertIfPresent();
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
        await PageHelper.refreshPage();
        await PageHelper.refreshPage();
        stepLogger.step('Wait for the termination to complete');
        await browser.sleep(PageHelper.timeout.xxxl);
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
    }

    static async gotoToolsSnapshots(stepLogger: StepLogger) {
        stepLogger.step('Goto Tools > Snapshots');
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.snapshots, stepLogger);
        stepLogger.step('Wait for the termination to complete');
        await browser.sleep(PageHelper.timeout.xl);
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
    }

    static async gotoToolsDashboard(stepLogger: StepLogger) {
        stepLogger.step('Goto Tools > Dashboard');
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);
        stepLogger.verification('Search for the environment terminated');
        await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(environmentNameTer));
        await PageHelper.click(CommonPage.getAnchorContainsText(environmentNameTer));
        stepLogger.step('Wait for the termination to complete');
        await browser.sleep(PageHelper.timeout.s);
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
    }

    static async searchForEnvToBeTerminated(stepLogger: StepLogger) {
        stepLogger.postCondition('Deleting the environment created');
        stepLogger.verification('Search for the environment to be terminated');
        await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(environmentNameTer));
        await PageHelper.click(CommonPage.getAnchorContainsText(environmentNameTer));
    }

    static async clickOnDeleteButtonForEnvDeletion(stepLogger: StepLogger) {
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Click on the Delete button');
        await PageHelper.click(CommonPage.getAnchorContainsText(CommonPageConstants.labelTexts.deleteLabel));
        stepLogger.step('Verify the alert message box');
        await expect(await PageHelper.getAlertText()).toContain(ConfigurationPageConstants.alertMessage.alertTextDelete,
            ValidationsHelper.getDisplayedValidation(ConfigurationPageConstants.alertMessage.alertTextDelete));
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.xs);
    }

    static async acceptDeleteAlert(stepLogger: StepLogger) {
        stepLogger.step('Click "OK"on the alert message box');
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.xs);
        await PageHelper.closeAlertIfPresent();
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
        stepLogger.verification('Verify the Delete Env message');
        await expect(await PageHelper.isElementDisplayed(ConfigurationPage.confEnvDeleteMsg.msg)).toBe(
            true, ValidationsHelper.getDisplayedValidation(ConfigurationPageConstants.verifyMessage.deleteEnvMsg));
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
    }

    static async confEnvDeleted(stepLogger: StepLogger) {
        stepLogger.verification('Confirm env deleted');
        await browser.sleep(PageHelper.timeout.s);
        stepLogger.step('Goto Tools > Dashboard');
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);
        stepLogger.verification('Search for the environment terminated');
        await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(environmentNameTer));
        await PageHelper.click(CommonPage.getAnchorContainsText(environmentNameTer));
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
        // Wait for the delete operation take effect
        await browser.sleep(PageHelper.timeout.l);
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
    }

    static async searchAppicationToDelete(stepLogger: StepLogger) {
        stepLogger.postCondition('Deleting the application created');
        stepLogger.verification('Search for the application to be terminated');
        await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(applicationNameTer));
        await PageHelper.click(CommonPage.getAnchorContainsText(applicationNameTer));
    }

    static async clickOnDeleteButtonForAppDeletion(stepLogger: StepLogger, letDeleted = false) {
        while (await PageHelper.isElementPresent(CommonPage.getAnchorContainsText(applicationNameTer))) {
            stepLogger.step('Goto Tools > Dashboard');
            await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);
            stepLogger.verification('Search for the environment terminated');
            await PageHelper.scrollToElement(CommonPage.getAnchorContainsText(applicationNameTer));
            await PageHelper.click(CommonPage.getAnchorContainsText(applicationNameTer));
            // Required to handle alert
            await browser.sleep(PageHelper.timeout.xs);
            stepLogger.step('Click on the Delete button');
            await PageHelper.click(CommonPage.getButtonContainsText(CommonPageConstants.labelTexts.deleteLabel));
            stepLogger.step('Verify the alert message box');
            await expect(await PageHelper.getAlertText()).toContain(ConfigurationPageConstants.alertMessage.alertTextAppDelete,
                ValidationsHelper.getDisplayedValidation(ConfigurationPageConstants.alertMessage.alertTextAppDelete));
            // Required to handle alert
            await browser.sleep(PageHelper.timeout.xs);
            await this.acceptDeleteAlertForAppDeletion(stepLogger);
            letDeleted = true;
        }

        if (letDeleted) {
            // Do nothing
        }
    }

    static async acceptDeleteAlertForAppDeletion(stepLogger: StepLogger) {
        stepLogger.step('Click "OK"on the alert message box');
        // Required to handle alert
        await browser.sleep(PageHelper.timeout.xs);
        await PageHelper.closeAlertIfPresent();
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
        // Required to wait for operation delete app
        await browser.sleep(PageHelper.timeout.l);
        stepLogger.step('Refreshing the page');
        await PageHelper.refreshPage();
    }

    static async verifyAppDeleted(stepLogger: StepLogger) {
        stepLogger.verification('Verify the application deleted');
        await expect(await PageHelper.isElementHidden(CommonPage.getAnchorContainsText(applicationNameTer))).toBe(
            true, ValidationsHelper.getNotDisplayedValidation(ConfigurationPageConstants.automationPrefix.autoAppPrefixDel));
    }
}
