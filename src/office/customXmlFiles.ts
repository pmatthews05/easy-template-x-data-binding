import { Path,  XmlNode, Zip, XmlUtils } from "easy-template-x";

/**
 * http://officeopenxml.com/anatomyofOOXML.php
 */
export class CustomXmlFiles {
    private static readonly itemFileRegEx: RegExp = /customXml\/item(\d+)\.xml/;

    private loaded: boolean = false;
    private readonly files: Map<string, XmlNode> = new Map<string, XmlNode>();

    constructor(
        private readonly zip: Zip,
        private readonly xmlParser: XmlUtils
    ) {}

    public async save() {
        if (!this.loaded) {
            // Never loaded the custom XML Files so they cannot have been changed
            return;
        }

        this.files.forEach((value, key) => {
            this.zip.setFile(key, this.xmlParser.parser.serializeNode(value));
        });
    }

    public async load(): Promise<Map<string, XmlNode>> {
        if (this.loaded) {
            return this.files;
        }

        for (const path of this.zip.listFiles()) {
            if (!path.match(CustomXmlFiles.itemFileRegEx)) continue;

            const filename = Path.getFilename(path);
            if (!filename) continue;

            const fileData: string = await this.zip
                .getFile(path)
                .getContentText();
            const node: XmlNode = this.xmlParser.parser.parse(fileData);
            this.files.set(path, node);
        }

        this.loaded = true;

        return this.files;
    }
}
