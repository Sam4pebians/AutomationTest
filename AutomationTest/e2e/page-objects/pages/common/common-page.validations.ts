export class CommonPageValidations {

    static getDisplayedValidation(name: string) {
        return `${name} should be displayed`;
    }

    static getUserDisplayedValidation(name: string) {
        return `User ${this.getDisplayedValidation(name)}`;
    }
}
