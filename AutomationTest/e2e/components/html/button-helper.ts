import {ButtonHelperFactory} from '@aurea/protractor-automation-helper';
import {HtmlHelper} from '../misc-utils/html-helper';
import {ComponentHelpers} from '../devfactory/component-helpers/component-helpers';
import {element, By} from 'protractor';

export class ButtonHelper extends ButtonHelperFactory {

    static getButtonTextUsingDivClass(attributeValue: string, text: string, isContains= false) {
        const divXpath = `//${HtmlHelper.tags.div}`;
        const classXpath = `[${ComponentHelpers.getXPathFunctionForClass(attributeValue, isContains)}]`;
        const textXpath = `[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`;
        const xpath = `${divXpath}${classXpath}/button${textXpath}`;
        return element(By.xpath(xpath));
    }

    static getButtonUsingHeaderText(text: string, isContains = false) {
        const headerTwoXpath = `//${HtmlHelper.tags.h2}`;
        const textXpath = `[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`;
        const buttonXpath = `${HtmlHelper.tags.button}`;
        const xpath = `${headerTwoXpath}${textXpath}//following::${buttonXpath}`;
        return element.all(By.xpath(xpath)).first();
    }

    static getButtonClassUsingHeaderText(attributeValue: string, text: string, isContains = false) {
        const headerTwoXpath = `//${HtmlHelper.tags.h2}`;
        const textXpath = `[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`;
        const buttonXpath = `[${ComponentHelpers.getXPathFunctionForClass(attributeValue, isContains)}]`;
        const btnXpath = `${HtmlHelper.tags.button}`;
        const xpath = `${headerTwoXpath}${textXpath}//following::${btnXpath}${buttonXpath}`;
        return element.all(By.xpath(xpath)).first();
    }

    static getButtonUsingSpanXpath(attributeValue: string, text: string, isContains = false) {
        const anchorXpath = `//${HtmlHelper.tags.a}`;
        const classXpath = `[${ComponentHelpers.getXPathFunctionForClass(attributeValue, isContains)}]`;
        const spanXpath = `//${HtmlHelper.tags.span}`;
        const textXpath = `[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`;
        const xpath = `${anchorXpath}${classXpath}//${spanXpath}${textXpath}`;
        return element(By.xpath(xpath));
    }

}
