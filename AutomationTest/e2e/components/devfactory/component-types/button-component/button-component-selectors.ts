// tslint:disable-next-line:max-line-length
import {ButtonComponentSelectorsFactory, ModelComponentSelectorsFactory, ComponentHelpersFactory} from '@aurea/protractor-automation-helper';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {BaseComponentHelper} from '../../../html/component-helpers/base-component-helper';

export class ButtonComponentSelectors extends ButtonComponentSelectorsFactory {

    public static getButtonByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
    )   {
        return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${
                  this.selectorTag
                }[${ComponentHelpersFactory.getXPathFunctionForDot(
          text,
          isContains
        )}]`;
    }

    public static getButtonDisabledXpath(
    disableAttributeValue: string,
    isContains = false,
    insidePopup = false

  ) {
    return BaseComponentHelper.getSpecificTagByDisabledAttributeXpath(
      HtmlHelper.tags.button,
      disableAttributeValue,
      isContains, insidePopup
    );
  }

  public static getButtonByIdXpath(
    idAttributeValue: string,
    isContains = false,
    insidePopup = false

  ) {
    return BaseComponentHelper.getIdXpath(
      HtmlHelper.tags.button,
      idAttributeValue,
      isContains, insidePopup
    );
  }

  public static getButtonByFormIdAndInputNameXpath(
    idAttributeValue: string,
    nameAttributeValue: string,
    idContains = false,
    nameContains = false,
    insidePopup = false

  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}${BaseComponentHelper.getIdXpath(
      HtmlHelper.tags.form, idAttributeValue, idContains, insidePopup)}
      ${BaseComponentHelper.getNameXpath(HtmlHelper.tags.input, nameAttributeValue, nameContains, insidePopup)}`;
  }

    public static getButtonInsideTableUsingTextXpath(tableElementText: string,
                                                     isTableElementTextContains = false,
                                                     buttonName: string,
                                                     isButtonNameContains = false,
                                                     insidePopup = false) {
        return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}${BaseComponentHelper.getTextXpath(
            HtmlHelper.tags.a, tableElementText, isTableElementTextContains, insidePopup)}//parent::${HtmlHelper.tags.th}
            //parent::${HtmlHelper.tags.tr}
            ${BaseComponentHelper.getTextXpath(HtmlHelper.tags.button, buttonName, isButtonNameContains, insidePopup)}`;
    }
}
