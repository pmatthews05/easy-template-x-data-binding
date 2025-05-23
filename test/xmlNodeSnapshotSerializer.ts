import { XmlNodeType, xml, XmlNode } from "easy-template-x";

// add XmlNode snapshot serializer
// (otherwise simple image markup snapshot takes more than 100MB!)
const serializer: jest.SnapshotSerializerPlugin = {
    test(value) {
        // check that 'value' is an XmlNode
        return (
            value &&
            value.nodeName &&
            value.nodeType &&
            (value.nodeType === XmlNodeType.General ||
                value.nodeType === XmlNodeType.Text)
        );
    },

    print(value) {
        return xml.parser.serializeNode(value as XmlNode);
    }
};

module.exports = serializer;
