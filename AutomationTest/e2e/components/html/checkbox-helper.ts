import {ElementFinder, element, By} from 'protractor';
import {Constants} from '../misc-utils/constants';
import {WaitHelper} from './wait-helper';
import {ComponentHelpers} from '../devfactory/component-helpers/component-helpers';
import {HtmlHelper} from '../misc-utils/html-helper';

export class CheckboxHelper {
    /**
     * Returns
     * input[@type="checkbox" and contains(@name,@param)]
     * or
     * input[@type="checkbox" and normalize-space(@name)=attributeValue] based on the parameter
     * @example
     * // Returns input[@type="checkbox" and contains(@name,@param)]
     * this.getCheckboxXpathByName(text:attributeValue, isContains:true);
     * // Returns input[@type="checkbox" and normalize-space(@name)=attributeValue]
     * this.getCheckboxXpathByName(text:attributeValue, isContains:false);
     * @param {string} name
     * @param {boolean} isContains
     * @returns {string}
     */
    static getCheckboxXpathByName(name: string, isContains = false) {
        const attribute = ComponentHelpers.getXPathFunctionForStringComparison(
                name,
                `@${HtmlHelper.attributes.name}`,
                isContains);
        return `input[@type="checkbox" and ${attribute}]`;
    }

    static async markCheckbox(elementt: ElementFinder, markChecked: boolean) {
        await WaitHelper.getInstance().waitForElementToBeClickable(elementt);
        let attempts = 0;
        // Retry mark checkbox if previous try fails.  This is
        // useful on slow envs like on remote executions.
        while (attempts++ < Constants.MAX_RETRY_ATTEMPTS) {
            const isSelected = await elementt.isSelected();
            if ((isSelected && !markChecked) || (!isSelected && markChecked)) {
                return elementt.click();
            }
        }
        return;
    }

    static async isCheckboxChecked(locator: ElementFinder) {
        // when unchecked the attribute is missing
        const state = await locator.getAttribute('aria-checked');
        return state === 'true';
    }

    static getCheckBoxUsingTD(idText: string, text: string, isContains = false) {
        const inputXpath = `//${HtmlHelper.tags.input}`;
        const nameXpath = `[${ComponentHelpers.getXPathFunctionForId(idText, isContains)}]`;
        const thXpath = `${HtmlHelper.tags.th}`;
        const textXpath = `[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`;
        const tdXpath = `${HtmlHelper.tags.td}`;
        const inputxpath = `${HtmlHelper.tags.input}`;
        const xpath = `${inputXpath}${nameXpath}//preceding::${thXpath}${textXpath}//following::${tdXpath}[1]//${inputxpath}`;
        return element.all(By.xpath(xpath)).first();
    }

    static getCheckBoxDisabled(idText: string, text: string, isContains = false) {
        const inputXpath = `//${HtmlHelper.tags.input}`;
        const nameXpath = `[${ComponentHelpers.getXPathFunctionForId(idText, isContains)}]`;
        const thXpath = `${HtmlHelper.tags.th}`;
        const textXpath = `[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`;
        const tdXpath = `${HtmlHelper.tags.td}`;
        const inputxpath = `${HtmlHelper.tags.input}`;
        const xpath = `${inputXpath}${nameXpath}//preceding::${thXpath}${textXpath}//following::${tdXpath}[1]//${inputxpath}[1]
        [@disabled='disabled']`;
        return element(By.xpath(xpath));
    }
}
