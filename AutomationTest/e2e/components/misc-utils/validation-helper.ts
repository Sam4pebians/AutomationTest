export class ValidationsHelper {
    static get types(){
        return {
            field:  'Field',
            page:  'Page',
            button:  'Button',
            label:  'Label',
            grid:  'Grid',
            menu: 'Menu',
            message: 'Message',
            link: 'Link',
        };
    }

    static getFieldHasValueValidation(fieldLabel: string, value: string) {
        return `${this.types.field} ${fieldLabel} should have value as ${value}`;
    }

    static getPageDisplayedValidation(name: string) {
        return `${this.types.page} ${this.getDisplayedValidation(name)}`;
    }

    static getFieldDisplayedValidation(name: string) {
        return `${this.types.field} ${this.getDisplayedValidation(name)}`;
    }

    static getButtonDisplayedValidation(name: string) {
        return `${this.types.button} ${this.getDisplayedValidation(name)}`;
    }

    static getMenuDisplayedValidation(name: string) {
        return `${this.types.menu} ${this.getDisplayedValidation(name)}`;
    }

    static getLabelDisplayedValidation(name: string) {
        return `${this.types.label} ${this.getDisplayedValidation(name)}`;
    }

    static getGridDisplayedValidation(name: string) {
        return `${this.types.grid} ${this.getDisplayedValidation(name)}`;
    }

    static getDeletionConfirmationDisplayedValidation(recordText: string) {
        return `Confirmation box for deletion of record which contains ${this.getDisplayedValidation(recordText)}`;
    }

    static getRecordCreatedValidation(recordText: string) {
        return this.getRecordContainsMessage(this.getDisplayedValidation(recordText));
    }

    static getRecordDeletedValidation(recordText: string) {
        return this.getRecordContainsMessage(`${recordText} has been deleted`);
    }

    static getRecordContainsMessage(message: string) {
        return `Record which contains ${message}`;
    }

    static getDisplayedValidation(name: string) {
        return `${name} should be displayed`;
    }

    static getErrorDisplayedValidation(error: string) {
        return `Error ${this.getDisplayedValidation(error)}`;
    }

    static getNotDisplayedValidation(name: string) {
        return `${name} should not be displayed`;
    }

    static getEnabledButtonValidation(name: string) {
        return `${name} should be enabled`;
    }

    static getDisabledButtonValidation(name: string) {
        return `${name} should be disabled`;
    }

    static getMsgDisplayedValidation(msg: string) {
        return `${this.types.message} ${this.getDisplayedValidation(msg)}`;
    }

    static getLinkDisplayedValidation(name: string) {
        return `${this.types.link} ${this.getDisplayedValidation(name)}`;
    }

    static getLinkNotDisplayedValidation(name: string) {
        return `${this.types.link} ${this.getNotDisplayedValidation(name)}`;
    }
}
