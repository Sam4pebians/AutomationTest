import {TextBoxComponentSelectorsFactory} from '@aurea/protractor-automation-helper';
import {ModalComponentSelectors} from '../../../html/component-types/modal-component/modal-component-selectors';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {ComponentHelpers} from '../../component-helpers/component-helpers';
import {BaseComponentHelper} from '../../../html/component-helpers/base-component-helper';
import {element, By} from 'protractor';

export class TextBoxComponentSelectors extends TextBoxComponentSelectorsFactory {
    public static getTextBoxByClass(
      classAttributeValue: string,
      isContains = false,
      insidePopup = false
      ) {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
          //${HtmlHelper.tags.input}[${ComponentHelpers.getXPathFunctionForClass(
            classAttributeValue,
            isContains
          )}]`;
    }

    public static getTextBoxByClassAndPlaceholder(
      classAttributeValue: string,
      placeholderAttributeValue: string,
      classIsContains = false,
      placeholderIsContains = false,
      insidePopup = false
      ) {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
        ${this.getTextBoxByClass(
          classAttributeValue,
          classIsContains)}[${ComponentHelpers.getXPathFunctionForPlaceholder(
            placeholderAttributeValue, placeholderIsContains)}]`;
    }

    public static getInputByClassXpath(
      classAttributeValue: string,
      classIsContains = false,
      insidePopup = false
      ) {
        return BaseComponentHelper.getClassXpath(
          HtmlHelper.tags.input,
          classAttributeValue,
          classIsContains,
          insidePopup
    );
  }

  public static getTextBoxInsideDivByClass(
    classAttributeValue: string,
    contains = false,
    insidePopup = false
  ) {
    return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
    //${HtmlHelper.tags.div}[${ComponentHelpers.getXPathFunctionForClass(
      classAttributeValue,
      contains
    )}]//${HtmlHelper.tags.input}`;
  }

  static getInputUsingValueXpath(text: string, isContains = false) {
    const inputXpath = `//${HtmlHelper.tags.input}`;
    const valueXpath = `[${ComponentHelpers.getXPathFunctionForValue(text, isContains)}]`;
    const xpath = `${inputXpath}${valueXpath}`;
    return element(By.xpath(xpath));
}
}
