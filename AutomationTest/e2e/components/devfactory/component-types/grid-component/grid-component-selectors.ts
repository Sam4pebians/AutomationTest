// tslint:disable-next-line:max-line-length

import {GridComponentSelectorsFactory} from '@aurea/protractor-automation-helper';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {BaseComponentHelper} from '../../../html/component-helpers/base-component-helper';
import {ComponentHelpers} from '../../component-helpers/component-helpers';

export class GridComponentSelectors extends GridComponentSelectorsFactory {

    public static getCellById(
        idAttributeValue: string,
        isContains = false
      ) {
        return BaseComponentHelper.getIdXpath(
          HtmlHelper.tags.td,
          idAttributeValue,
          isContains
        );
      }

      public static getCellByClassXpath(
        classAttributeValue: string,
        classIsContains = false,
        insidePopup = false
      ) {
        return BaseComponentHelper.getClassXpath(
          HtmlHelper.tags.td,
          classAttributeValue,
          classIsContains, insidePopup
        );
      }

      public static getRowByClassXpath(
        classAttributeValue: string,
        classIsContains = false,
        insidePopup = false
      ) {
        return BaseComponentHelper.getClassXpath(
          HtmlHelper.tags.tr,
          classAttributeValue,
          classIsContains, insidePopup
        );
      }

    public static getFollowingSiblingOfTableElementByTextXpath(tableElementText: string,
                                                               isTableElementTextContains = false,
                                                               siblingText: string,
                                                               isSiblingTextContains = false,
                                                               insidePopup = false) {
        return `${BaseComponentHelper.getTextXpath(HtmlHelper.tags.td, tableElementText, isTableElementTextContains, insidePopup)}
        /parent::tr//*[${ComponentHelpers.getXPathFunctionForText(siblingText, isSiblingTextContains)}]`;
    }

    public static getFollowingSiblingOfTableElementByClassXpath(tableElementText: string,
                                                                isTableElementTextContains = false,
                                                                className: string,
                                                                isContainsClass = false,
                                                                insidePopup = false) {
        return `${BaseComponentHelper.getTextXpath(HtmlHelper.tags.td, tableElementText, isTableElementTextContains, insidePopup)}
        /parent::tr//*[${ComponentHelpers.getXPathFunctionForClass(className, isContainsClass)}]`;
    }
}
