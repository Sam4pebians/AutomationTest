// tslint:disable-next-line:max-line-length
import {TextBoxComponentSelectorsFactory, ModelComponentSelectorsFactory} from '@aurea/protractor-automation-helper';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {ComponentHelpers} from '../../component-helpers/component-helpers';
import {ModalComponentSelectors} from '../modal-component/model-component-selectors';
import {BaseComponentHelper} from '../../../html/component-helpers/base-component-helper';
import {element, By} from 'protractor';

export class TextComponentSelectors extends TextBoxComponentSelectorsFactory {
    public static getSpanByTextXpath(
        text: string,
        textIsContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getTextXpath(
                HtmlHelper.tags.span,
                text,
                textIsContains,
                insidePopup
            );
    }

    public static getLabelByTextXpath(
        text: string,
        textIsContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getTextXpath(
                HtmlHelper.tags.label,
                text,
                textIsContains,
                insidePopup
            );
    }

    public static getAnchorByTextXpath(
        text: string,
        textIsContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getTextXpath(
                HtmlHelper.tags.a,
                text,
                textIsContains,
                insidePopup
            );
    }

    public static getTdByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
      ) {
        return BaseComponentHelper.getTextXpath(
            HtmlHelper.tags.td,
            text,
            isContains,
            insidePopup
        );
    }

    public static getDivByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getTextXpath(
                HtmlHelper.tags.div,
                text,
                isContains,
                insidePopup
            );
    }

    public static getHeaderOneByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getTextXpath(
                HtmlHelper.tags.h1,
                text,
                isContains,
                insidePopup
        );
    }

    public static getHeaderThreeByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getTextXpath(
                HtmlHelper.tags.h3,
                text,
                isContains,
                insidePopup
        );
    }

    public static getHeaderSixByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getTextXpath(
                HtmlHelper.tags.h6,
                text,
                isContains,
                insidePopup
            );
    }

    public static getHeaderTextInsideDivByClassXpath(
        text: string,
        className: string,
        isContains = false,
        insidePopup = false
        ) {
            return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${HtmlHelper.tags.div}[${ComponentHelpers.getXPathFunctionForClass(className, isContains)}]
                ${this.getHeaderSixByTextXpath(text)}`;
    }

    public static getTextByClassXpath(
        tag: string,
        className: string,
        isContains = false,
        insidePopup = false
        ) {
            return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${tag}[${ComponentHelpers.getXPathFunctionForClass(className, isContains)}]`;
    }

    public static getDivTextByClassXpath(
        className: string,
        classIsContains = false,
        insidePopup = false
        ) {
            return this.getTextByClassXpath(
                HtmlHelper.tags.div,
                className,
                classIsContains,
                insidePopup
            );
        }

    public static getTextInsideDivByClassAndNotDotXpath(
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false,
        insidePopup = false
        ) {
            return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                ${ComponentHelpers.getXpathFunctionClassComparisonAndNotDot(
                  HtmlHelper.tags.div,
                  classAttributeValue,
                  textAttributeValue,
                  classIsContains,
                  textIsContains
                )}`;
    }

    public static getTooltipForDivByClass(
        classAttributeValue: string,
        toolTipAttributeValue: string,
        isContains = false,
        insidePopup = false
        ) {
            return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
            ${this.getTextByClassXpath(
                HtmlHelper.tags.div,
                classAttributeValue,
                isContains
            )}[${ComponentHelpers.getXPathFunctionForTooltip(toolTipAttributeValue, true)}]`;
    }

    public static getTextInsideDivByClassAndTextXpath(
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false,
        insidePopup = false
        )   {
            return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
            ${ComponentHelpers.getXpathFunctionClassAndText(
                HtmlHelper.tags.div,
                classAttributeValue,
                textAttributeValue,
                classIsContains,
                textIsContains
            )}`;
      }

    public static getSpanByClassXpath(
        classAttributeValue: string,
        isContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getClassXpath(
                HtmlHelper.tags.span,
                classAttributeValue,
                isContains, insidePopup
        );
    }

    public static getHeaderFiveByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getTextXpath(
                HtmlHelper.tags.h5, text, isContains, insidePopup
            );
    }

    public static getDivByClassXpath(
        classAttributeValue: string,
        classIsContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getClassXpath(
                HtmlHelper.tags.div,
                classAttributeValue,
                classIsContains, insidePopup
            );
    }

    public static getIcontagByClassXpath(
        iAttributeValue: string,
        classIsContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getClassXpath(
                HtmlHelper.tags.i,
                iAttributeValue,
                classIsContains,
                insidePopup
            );
    }

    public static getTextareaByIdXpath(
        idAttributeValue: string,
        idIsContains = false,
        insidePopup = false
        ) {
            return BaseComponentHelper.getIdXpath(
                HtmlHelper.tags.textArea,
                idAttributeValue,
                idIsContains,
                insidePopup
            );
    }

    public static getHeaderFiveByClassXpath(
           text: string,
           classIsContains = false,
           insidePopup = false
           ) {
               return BaseComponentHelper.getClassXpath(
                   HtmlHelper.tags.h5,
                   text,
                   classIsContains,
                   insidePopup
            );
    }

    public static getParagraphByTextXpath(
        text: string,
        contains = false,
        insidePopup = false
        ) {
            return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}//${
                HtmlHelper.tags.p}[${ComponentHelpers.getXPathFunctionForText(
                text,
                contains)}]`;
    }

    public static getTextInsideDivAndListByClassXpath(
        textValue: string,
        className: string,
        containsText = false,
        containsClass = false,
        insidePopup = false
        ) {
            return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${HtmlHelper.tags.div}[${ComponentHelpers.getXPathFunctionForText(textValue,
                containsText)}]//parent::${HtmlHelper.tags.li}//${HtmlHelper.tags.div}[${
                ComponentHelpers.getXPathFunctionForClass(className, containsClass)}]`;
    }

    public static getSpanByTextAndAreaExpandedXpath(
        textValue: string,
        areaExpandedAttributeVal: string,
        containsText = false,
        areaExpandedContains = false,
        insidePopup = false
        ) {
            return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${HtmlHelper.tags.span}[${ComponentHelpers.getXPathFunctionForText(textValue,
                    containsText)}]//parent::${HtmlHelper.tags.a}[${
                      ComponentHelpers.getXPathFunctionForAreaExpanded(areaExpandedAttributeVal,
                        areaExpandedContains)}]`;
    }

    public static getTextInsideDivAndIconByClassXpath(
        textValue: string,
        className: string,
        containsText = false,
        containsClass = false,
        insidePopup = false
        ) {
        return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${HtmlHelper.tags.div}[${ComponentHelpers.getXPathFunctionForText(textValue,
                    containsText)}]//parent::${HtmlHelper.tags.li}//${HtmlHelper.tags.i}[${
                      ComponentHelpers.getXPathFunctionForClass(className, containsClass)}]`;
    }

    public static getDivByClassInsideListByClassXpath(
        listAttributeValue: string,
        divAttributeValue: string,
        classContains = false,
        insidePopup = false
        ) {
            return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}${BaseComponentHelper.getClassXpath
                (HtmlHelper.tags.li, listAttributeValue, classContains, insidePopup)}${BaseComponentHelper.getClassXpath
                    (HtmlHelper.tags.div, divAttributeValue, classContains, insidePopup)}`;
    }

    public static getTextInsideSpanByClassAndTextXpath(
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false,
        insidePopup = false
        ) {
            return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                ${ComponentHelpers.getXpathFunctionClassAndText(
                    HtmlHelper.tags.span,
                    classAttributeValue,
                    textAttributeValue,
                    classIsContains,
                    textIsContains
                )}`;
    }

    public static getAnchorByNgHrefXpath(
        ngHrefAttributeVal: string,
        containsValue = false,
        insidePopup = false
        ) {
            return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${HtmlHelper.tags.a}[${ComponentHelpers.getXPathFunctionForNgHref(ngHrefAttributeVal, containsValue)}]`;
    }

    public static getSpanTextBytDivIdXpath(
        parentDivId: string,
        isContainsId = false,
        spanText: string,
        isContainsText = false,
        insidePopup = false
    ) {
        return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${HtmlHelper.tags.div}[${ComponentHelpers.getXPathFunctionForId(parentDivId, isContainsId)}]//${HtmlHelper.tags.span}
                [${ComponentHelpers.getXPathFunctionForText(spanText, isContainsText)}]`;
    }

    public static getHeaderFourByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
    ) {
        return BaseComponentHelper.getTextXpath(
            HtmlHelper.tags.h4,
            text,
            isContains,
            insidePopup
        );
    }

    public static getHeaderTwoByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
    ) {
        return BaseComponentHelper.getTextXpath(
            HtmlHelper.tags.h2,
            text,
            isContains,
            insidePopup
        );
    }

    public static getSpanInsideTableUsingTextXpath(
        tableElementText: string,
        isTableElementTextContains = false,
        spanText: string,
        isSpanTextContains = false,
        insidePopup = false
    ) {
        return `${BaseComponentHelper.getTextXpath(
            HtmlHelper.tags.td, tableElementText, isTableElementTextContains, insidePopup)}//parent::${HtmlHelper.tags.tr}
            ${BaseComponentHelper.getTextXpath(HtmlHelper.tags.span, spanText, isSpanTextContains, insidePopup)}`;
    }

    static getLabelByTextUsingDivByClass(attributeValue: string, text: string, isContains = true) {
        const divXpath = `//${HtmlHelper.tags.div}`;
        const classXpath = `[${ComponentHelpers.getXPathFunctionForClass(attributeValue, isContains)}]`;
        const labelXpath = `${HtmlHelper.tags.label}`;
        const textXpath = `[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`;
        const xpath = `${divXpath}${classXpath}//following::${labelXpath}${textXpath}`;
        return element(By.xpath(xpath));
    }

    static getTextUsingInputAndSpan(text: string, isContains = false) {
        const inputXpath = `//${HtmlHelper.tags.input}`;
        const textXpath = `[${ComponentHelpers.getXPathFunctionForValue(text, isContains)}]`;
        const spanXpath = `${HtmlHelper.tags.span}`;
        const xpath = `${inputXpath}${textXpath}//following::${spanXpath}[1]`;
        return element(By.xpath(xpath));
    }
}
