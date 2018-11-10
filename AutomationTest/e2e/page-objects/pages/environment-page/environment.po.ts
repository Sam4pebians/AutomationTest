import {BasePage} from '../base-page';
import {By, element} from 'protractor';
import {EnvironmentPageConstants} from './environment-page.constants';
import {CommonPage} from '../common/common.po';
import {DropDownHelper} from '../../../components/html/dropdown-helper';
import {ApplicationPageConstants} from '../application-page/application-page.constants';
import {CommonPageConstants} from '../common/common-page.constants';
import {TextComponentSelectors} from '../../../components/devfactory/component-types/text-component/text-component-selectors';

export class EnvironmentPage extends BasePage {
    static get createEnvironmentTextBoxes() {
        return {
            environmentName: element(By.id(EnvironmentPageConstants.createEnvironmentTextBoxesIds.environmentNameId))
        };
    }

    static get createEnvironmentDropDowns() {
        return {
            railsEnvironment: element(By.id(EnvironmentPageConstants.createEnvironmentDropDownsIds.railsEnvironmentId)),
            railEnvironment: element(By.id(EnvironmentPageConstants.createEnvironmentDropDownsIds.railEnvironmentId)),
            runtime: element(By.id(EnvironmentPageConstants.createEnvironmentDropDownsIds.runtimeEnvironmentId)),
            rubyGems: element(By.id(EnvironmentPageConstants.createEnvironmentDropDownsIds.rubyGemsId)),
            policyType: element(By.id('new_policy_type'))

        };
    }

    static get createEnvironmentButtons() {
        return {
            createEnvironment: element(By.id(EnvironmentPageConstants.createEnvironmentButtonsIds.createEnvironmentId)),
            nextButton: CommonPage.getButtonContainsText(CommonPageConstants.buttonLabels.next),
            previousButton: CommonPage.getButtonContainsText(CommonPageConstants.buttonLabels.previous),
            createApplicationButton: CommonPage.getButtonContainsText(CommonPageConstants.buttonLabels.createApplication)
        };
    }

    static get showBoxHelper() {
        return {
            showBoxHelperCheckBox: CommonPage.getDivContainsClass(EnvironmentPageConstants.verifyHelpboxSelector.showHelperBoxClass),
            showBoxHelperMessage: CommonPage.getAllHeaderThreeByText(EnvironmentPageConstants.verifyBoxesMessage.showHelperBoxMsg),
            showBoxHelperMessageForGit: CommonPage.getDivContainsText(EnvironmentPageConstants.verifyBoxesMessage.showHelperBoxMsgForGit),
            showBoxHelperMessageForAppName: CommonPage.getDivContainsText(EnvironmentPageConstants.verifyBoxesMessage.showHelperBoxAppName),
        };
    }

    static get messageDisplayed() {
        return {
            messageFormSubmission: CommonPage.getAllHeaderFourByText(EnvironmentPageConstants.verifyMessages.messageFormSubmission),
        };
    }

    static get messageDisplayedSelector() {
        return {
            messageDisplayedClass: CommonPage.getDivContainsClass(EnvironmentPageConstants.verifyHelpboxSelector.messageAttentionClass),
            errorMessageDisplayedClass: CommonPage.getDivContainsClass(EnvironmentPageConstants.verifyHelpboxSelector.messageErrorClass)
        };
    }

    static get defaultSelectedOptionValue() {
        return {
            defaultValueSelected: DropDownHelper.getDefaultSelectedOption(
                ApplicationPageConstants.createApplicationSectionDropDownsIds.applicationLanguageId ,
                ApplicationPageConstants.languageDropDownValues.ruby, true),
        };
    }

    static get getCheckBox() {
        return {
            dataVersion: element(By.id('uniform-environment_lock_db_version'))
        };
    }

    static get getDropdown() {
        return {
            dataProvider: element(By.id('db_provider_name')),
            policyType: element(By.id('new_policy_type'))
        };
    }

    static get policySelectors() {
        const classText = EnvironmentPageConstants.policyText.classText;
        const aggregationText = EnvironmentPageConstants.policyText.aggregation;
        const metricText = EnvironmentPageConstants.policyText.metric;
        const operandText = EnvironmentPageConstants.policyText.operand;
        const triggerValueText = EnvironmentPageConstants.policyText.triggerValue;
        const noOfPeriodsText = EnvironmentPageConstants.policyText.noOfPeriods;
        const periodLengthText = EnvironmentPageConstants.policyText.periodLength;
        const actionText = EnvironmentPageConstants.policyText.action;
        const actionUnitText = EnvironmentPageConstants.policyText.actionunit;
        const actionValueText = EnvironmentPageConstants.policyText.actionValue;
        const coolDownText = EnvironmentPageConstants.policyText.coolDown;
        return {
            name: element(By.id('new_policy_name')),
            nameTextBox: element(By.name('auto_scaling_policies[][name]')),
            metricType: element(By.name('auto_scaling_policies[][metric_type]')),
            targetValue: element(By.name('auto_scaling_policies[][target_value]')),
            warmUpPeriod: element(By.name('auto_scaling_policies[][estimated_warmup]')),
            createButton: element(By.buttonText('Create')),
            cancelButton: element(By.buttonText('Cancel')),
            minimumValueTextBox: element(By.id('auto_scaling_group_minimum_size')),
            maximumValueTextBox: element(By.id('auto_scaling_group_maximum_size')),
            aggregation: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, aggregationText, true),
            metric: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, metricText, true),
            operand: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, operandText, true),
            triggerValue: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, triggerValueText, true),
            triggerValueTextBox: element(By.name('auto_scaling_policies[][alarm][trigger_value]')),
            noOfPeriods: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, noOfPeriodsText, true),
            periodOfLength: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, periodLengthText, true),
            action: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, actionText, true),
            actionUnit: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, actionUnitText, true),
            actionValue: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, actionValueText, true),
            coolDown: TextComponentSelectors.getLabelByTextUsingDivByClass(classText, coolDownText, true),
            actionValueName: element(By.name('auto_scaling_policies[][action_value]')),
            triggerValueName: element(By.name('auto_scaling_policies[][alarm][trigger_value]')),
            policyName: CommonPage.getSpanContainsText(EnvironmentPageConstants.policyText.simplePolicyText),
            editLink: CommonPage.getAnchorContainsClass(EnvironmentPageConstants.policyText.edit),
            deleteLink: CommonPage.getAnchorContainsClass(EnvironmentPageConstants.policyText.delete),
            alarmSectionContainingFields: CommonPage.getHeaderThreeContainsText(EnvironmentPageConstants.policyText.alarm)
        };
    }

    static get autoScalingGroupdetextBoxElements() {
        return{
            minimumSize: element(By.id('auto_scaling_group_minimum_size')),
            maximumSize: element(By.id('auto_scaling_group_maximum_size')),
            healthCheckGracePeriod: element(By.id('auto_scaling_group_grace_period')),
            defaultCooldown: element(By.id('auto_scaling_group_default_cooldown')),
            dynamicScalingPolicies: element(By.id('policies-container')),
        };
    }

    static get autoScalingGroupdetails() {
        return{
            minimumSize: element(By.css('input#auto_scaling_group_minimum_size')),
            maximumSize: element(By.css('input#auto_scaling_group_maximum_size')),
            healthCheckGracePeriod: element(By.css('input#auto_scaling_group_grace_period')),
            defaultCooldown: element(By.css('input#auto_scaling_group_default_cooldown')),
            dynamicScalingPolicies: element(By.css('input#policies-container')),
        };
    }

    static get environmentBreadCrumbs() {
        return {
           breadCrumbApplication: CommonPage.getAnchorContainsText(EnvironmentPageConstants.breadCrumbText.breadCrumbApplication),
           breadCrumbOrgEnvironment: CommonPage.getAnchorContainsText(EnvironmentPageConstants.breadCrumbText.breadCrumbOrgEnvironment),
        };
   }

    static get environmentButtons() {
        return {
            createAutoScalingGroup: element(By.buttonText('Create Auto Scaling Group')),
        };
    }

    static get environmentLinks() {
        return {
            environmentName: element(By.cssContainingText('.environment-name', 'SaiStgEnv')),
            autoScaling: element(By.linkText('Auto Scaling')),
            addNewPolicies: element(By.linkText('Add New')),
            awsDocumentation: element(By.partialLinkText('AWS documentation'))
        };
    }

    static get validationMessage() {
        return {
            messageFlashbox: CommonPage.getDivContainsClass(EnvironmentPageConstants.verifyHelpboxSelector.messageErrorClass),
        };
    }

    static get toolTip() {
        return {
            healthCheckGracePeriod: 'Please select a valid value.The two nearest valid values are 500 and 501.',
            defaultCooldown: 'Please enter a number.',
        };
    }

    static get pageHeader(){
        return {
            aws: element(By.id('service-name')),
        };
    }
}
