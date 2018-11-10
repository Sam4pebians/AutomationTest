// tslint:disable-next-line:max-line-length
import { LabelComponentSelectorsFactory, HtmlHelperFactory } from '@aurea/protractor-automation-helper';
import {ModalComponentSelectors} from '../modal-component/model-component-selectors';
import {ComponentHelpers} from '../../component-helpers/component-helpers';
import {HtmlHelper} from '../../../misc-utils/html-helper';

export class LabelComponentSelectors extends LabelComponentSelectorsFactory {
    public static readonly selector = 'label';

    public static getInfoIconXPath(labelName: string) {
        return `//${this.selector}[normalize-space(.)="${labelName}"]/following-sibling::i`;
    }

    public static getInputByLabelXpath(
        labelName: string,
        isContains = false,
        insidePopup = false
    ) {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                //${
                    HtmlHelperFactory.attributes.label
                }[${ComponentHelpers.getXPathFunctionForDot(
            labelName,
            isContains
        )}]//preceding::${HtmlHelper.tags.input}`;
    }

    public static getLabelByClassXpath(
        attributeValue: string,
        isContains = false,
        insidePopup = false
    )   {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
        //${
            HtmlHelperFactory.attributes.label
        }[${ComponentHelpers.getXPathFunctionForClass(
            attributeValue,
            isContains
        )}]`;
    }

    public static getLabelByNotClassXpath(
        classAttributeValue: string,
        classIsContains = false,
        insidePopup = false
    )   {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
        //${HtmlHelper.tags.label}[${ComponentHelpers.getXPathFunctionForNotClass(
            classAttributeValue,
            classIsContains
        )}]`;
    }

    public static getLabelByClassAndTextXpath(
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false,
        insidePopup = false
    )   {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                ${ComponentHelpers.getXpathFunctionClassAndText(
                    HtmlHelper.tags.label,
                    classAttributeValue,
                    textAttributeValue,
                    classIsContains,
                    textIsContains
                )}`;
    }

    public static getLabelByNotClassAndTextXpath(
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false,
        insidePopup = false
    )   {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                //${HtmlHelper.tags.label}[${ComponentHelpers.getXPathFunctionForNotClass(
                    classAttributeValue,
                    classIsContains
                )}][${ComponentHelpers.getXPathFunctionForText(
                    textAttributeValue,
                    textIsContains
                )}]`;
    }
}
