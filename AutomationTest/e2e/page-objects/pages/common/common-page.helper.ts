import {browser, ElementArrayFinder, ElementFinder} from 'protractor';
import {JsHelper} from '../../../components/misc-utils/js-helper';
import {PageHelper} from '../../../components/html/page-helper';
import {CommonPage} from './common.po';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {CommonLabel} from '../../../components/misc-utils/common-label';
import {CommonPageConstants} from './common-page.constants';
import {CommonPageValidations} from '../common/common-page.validations';
import {StepLogger} from '../../../../core/logger/step-logger';

const shortId = require('../../../components/misc-utils/shortid');

export class CommonPageHelper {
    static get userEmail(): string {
        return browser.params.login.user.userEmail;
    }

    static get userPassword(): string {
        return browser.params.login.user.password;
    }

    static get invalidUserName(): string {
        return browser.params.login.invalidUser.userEmail;
    }

    static get InvalidPassword(): string {
        return browser.params.login.invalidUser.password;
    }

    static getUniqueId(): string {
        // noinspection reason: Giving error for unknown character function
        // noinspection Annotator
        shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
        return shortId.generate();
    }

    static getUniqueIntId(size = 6): string {
        // Giving error for unknown character function
        // noinspection Annotator
        shortId.characters('0123456789');
        const newId: string = shortId.generate();
        return newId.substring(0, size);
    }

    static async getColumnIndexByText(tableNameClassOrId: string, columnName: string) {
        const columns: any = await PageHelper.getAllTexts(
            CommonPage.getAllTableColumnHeaders(tableNameClassOrId));
        const columnsArray = columns as string[];
        JsHelper.trimArray(columnsArray);
        return columnsArray.lastIndexOf(columnName); // Real columns index for xPaths
    }

    static async getColumnIndexByColumnName(tableColumns: ElementArrayFinder, columnName: string) {
        const columns: any = await PageHelper.getAllTexts(tableColumns);
        const columnsArray = columns as string[];
        JsHelper.trimArray(columnsArray);
        return columnsArray.lastIndexOf(columnName); // Real columns index for xPaths
    }

    static async verifyColumnDataBasedOnAnotherColumnData(
        tableNameClassOrId: string, columnName: string, referenceColumnValue: string, expectedColumnValue: string) {
        const columnIndex = await this.getColumnIndexByText(tableNameClassOrId, columnName);
        const columnData = await PageHelper.getText(
        CommonPage.getColumnBasedOnAnotherColumn(tableNameClassOrId, referenceColumnValue, columnIndex));
        await expect(columnData).toEqual(expectedColumnValue, ValidationsHelper.getDisplayedValidation(expectedColumnValue));
    }

    static get buttons() {
        return {
            hide: CommonPage.getButtonByText(CommonLabel.hideLabel),
            cancel: CommonPage.getAnchorByText(CommonLabel.cancelLabel),
            boot : CommonPage.getAnchorByText(CommonLabel.bootlLabel),
            deleteButton : CommonPage.getAnchorByText(CommonLabel.deleteLabel)
        };
    }

    static get pageHeaders() {
        return {
            configuration: CommonPage.getHeaderOneContainingText(CommonPageConstants.pageHeaders.configuration),
            createNewEnvironment: CommonPage.getHeaderOneContainingText(
                CommonPageConstants.pageHeaders.createNewEnvironment),
            environment: CommonPage.getHeaderTwoByText(CommonPageConstants.pageHeaders.environment)
        };
    }

    static async validateFieldIsDisplayed(targetElement: ElementFinder, validationMessage: string, expectedCondition = true) {
        await expect(await PageHelper.isElementDisplayed(targetElement)).toBe(expectedCondition
        , CommonPageValidations.getUserDisplayedValidation(validationMessage));
    }

    static async verifyDisplayedElement(stepLogger: StepLogger, element: ElementFinder, message: string) {
        stepLogger.verification('Verify the message displayed on top of the page.');
        await expect(await PageHelper.isElementDisplayed(element))
        .toBe(true,
             ValidationsHelper.getDisplayedValidation(message));

    }
}
