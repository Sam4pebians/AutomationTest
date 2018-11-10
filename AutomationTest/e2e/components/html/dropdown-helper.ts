import {By, ElementFinder, element} from 'protractor';
import {ComponentHelpers} from '../devfactory/component-helpers/component-helpers';
import {HtmlHelper} from '../misc-utils/html-helper';

export class DropDownHelper {
    static selectOptionByVal(locator: ElementFinder, optionVal: string) {
        return locator.element(By.css(this.getCssForOptionValue(optionVal))).click();
    }

    static getXPathForOptionValue(optionVal: string) {
        return `//option[normalize-space(.)="${optionVal}"]`;
    }

    static getCssForOptionValue(optionVal: string) {
        return `option[value="${optionVal}"]`;
    }

    static selectOptionByText(locator: ElementFinder, optionVal: string) {
        return locator.element(By.xpath(this.getXPathForOptionValue(optionVal))).click();
    }

    static getDefaultSelectedOption(id: string, option: string, idIsContains = false) {
        const selectXpath = `//${HtmlHelper.tags.select}`;
        const idXpath = `[${ComponentHelpers.getXPathFunctionForId(id, idIsContains)}]`;
        const xpath = `${selectXpath}${idXpath}//option[@selected='selected'][@value='${option}']`;
        return element(By.xpath(xpath));
    }
}
