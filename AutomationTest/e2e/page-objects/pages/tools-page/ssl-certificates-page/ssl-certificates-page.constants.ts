export class SslCertificatesPageConstants {
    static readonly certificateCreatedMessage = 'Currently provisioning the SSL certificates below.' +
        '  They will appear on this page when provisioning is complete.';
    static readonly certificateDeletedMessage = 'Currently deprovisioning the SSL certificates below.' +
        '  They will disappear when deprovisioning is complete.';

    static get buttons() {
        return {
            addSslCertificate: 'Add SSL Certificate',
            addCertificate: 'Add Certificate'
        };
    }

    static get headers() {
        return {
            createNewSslCertificate: 'Create New SSL Certificate'
        };
    }

    static get textBoxes() {
        return {
            certificateNameId: 'ssl_certificate_name'
        };
    }
}
