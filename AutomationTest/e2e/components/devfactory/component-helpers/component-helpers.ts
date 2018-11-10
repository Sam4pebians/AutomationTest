import {ComponentHelpersFactory} from '@aurea/protractor-automation-helper';
import {By, element} from 'protractor';
import {HtmlHelper} from '../../misc-utils/html-helper';

export class ComponentHelpers extends ComponentHelpersFactory {
    static getElementByTag(tag: string, text: string, isContains = false) {
        return element(By.xpath(this.getElementByTagXpath(tag, text, isContains)));
    }

    static getElementByTagXpath(tag: string, text: string, isContains = false) {
        return `//${tag}[${ComponentHelpers.getXPathFunctionForDot(text, isContains)}]`;
    }

    public static getXPathFunctionForClass(attributeValue: string, isContains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            `@${HtmlHelper.attributes.class}`,
            isContains
        );
    }

    public static getXPathFunctionForNotClass(attributeValue: string, isContains = false) {
        return ComponentHelpers.getXPathFunctionForNotStringComparison(
            attributeValue,
            `@${HtmlHelper.attributes.class}`,
            isContains
        );
    }

    public static getXPathFunctionForHref(attributeValue: string, isContains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            `@${HtmlHelper.attributes.href}`,
            isContains
        );
    }

    public static getXPathFunctionForNotStringComparison(
        attributeValue: string,
        attributeName: string,
        isContains = false
    )   {
        return `not(${ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            attributeName,
            isContains
        )})`;
    }

    public static getXpathFunctionClassAndText(
        tag: string,
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false
    )   {
        return `//${tag}[${ComponentHelpers.getXPathFunctionForClass(
            classAttributeValue,
            classIsContains
        )}][${ComponentHelpers.getXPathFunctionForText(
            textAttributeValue,
            textIsContains
        )}]`;
    }

    public static getXpathFunctionClassAndDot(
      tag: string,
      classAttributeValue: string,
      textAttributeValue: string,
      classIsContains = false,
      dotIsContains = false
    )   {
        return `//${tag}[${ComponentHelpers.getXPathFunctionForClass(
            classAttributeValue,
            classIsContains
        )}][${ComponentHelpers.getXPathFunctionForDot(
            textAttributeValue,
            dotIsContains
        )}]`;
    }

    public static getXPathFunctionForNotDotComparison(
        attributeValue: string,
        isContains = false
    )   {
        return `not(${ComponentHelpers.getXPathFunctionForDot(
            attributeValue,
            isContains
        )})`;
    }

    public static getXpathFunctionClassComparisonAndNotDot(
        tag: string,
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false
    )   {
        return `//${tag}[${ComponentHelpers.getXPathFunctionForClass(
            classAttributeValue,
            classIsContains
        )}][${ComponentHelpers.getXPathFunctionForNotDotComparison(
            textAttributeValue,
            textIsContains
        )}]`;
    }

    public static getXPathFunctionForPlaceholder(attributeValue: string, isContains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            `@${HtmlHelper.attributes.placeholder}`,
            isContains
        );
    }

    public static getXPathFunctionForId(attributeValue: string, contains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison (
            attributeValue,
            `@${HtmlHelper.attributes.id}`,
            contains
        );
    }

    public static getXPathFunctionForName(attributeValue: string, contains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison (
            attributeValue,
            `@${HtmlHelper.attributes.name}`,
            contains
        );
    }

    public static getXPathFunctionForDisabled(attributeValue: string, contains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            `@${HtmlHelper.attributes.disabled}`,
            contains
        );
    }

    public static getXPathFunctionForNgRepeat(attributeValue: string, contains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            `@${HtmlHelper.additionalAttributes.ngRepeat}`,
            contains
        );
    }

    public static getXPathFunctionForAreaExpanded(attributeValue: string, contains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            `@${HtmlHelper.additionalAttributes.ariaExpanded}`,
            contains
        );
    }

    public static getXPathFunctionForNgHref(attributeValue: string, contains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            `@${HtmlHelper.additionalAttributes.nghref}`,
            contains
        );
    }

    public static getXPathFunctionForTooltip(attributeValue: string, isContains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison(
            attributeValue,
            `@${HtmlHelper.additionalAttributes.uibTooltip}`,
            isContains
        );
    }

    public static getXPathFunctionForValue(attributeValue: string, contains = false) {
        return ComponentHelpers.getXPathFunctionForStringComparison (
            attributeValue,
            `@${HtmlHelper.attributes.value}`,
            contains
        );
    }
}
