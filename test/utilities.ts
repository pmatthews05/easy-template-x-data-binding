import * as fs from "fs";
import * as del from "del";
import { XmlNode, XmlUtils, Zip } from "easy-template-x";
import { CustomXmlFiles } from "src/office";

const xmlParser = new XmlUtils();

export async function getCustomXmlFiles(id: string, name: string) {
    const savedBuffer = readOutFile(id, name);
    const savedZip = await Zip.load(savedBuffer);
    return new CustomXmlFiles(savedZip, xmlParser);
}

export function parseXml(xml: string, removeWhiteSpace = true): XmlNode {
    if (removeWhiteSpace) xml = xml.replace(/\s/g, "");
    if (removeWhiteSpace) xml = xml.replace(/\s/g, "");
    return xmlParser.parser.parse(xml);
}

export function readFixture(filename: string): Buffer {
    return fs.readFileSync("./test/fixtures/files/" + filename);
}

export function removeOutFolder(id: string) {
    const folderPath = `./out/${id}`;
    del.deleteSync([folderPath]);
}

export function readOutFile(id: string, filename: string): Buffer {
    return fs.readFileSync(`./out/${id}/${filename}`);
}

export function writeOutFile(
    id: string,
    filename: string,
    file: Buffer
): string {
    fs.existsSync(`./out`) || fs.mkdirSync(`./out`);
    const folderPath = `./out/${id}`;
    fs.existsSync(folderPath) || fs.mkdirSync(folderPath);
    const filePath = `${folderPath}/${filename}`;
    fs.writeFileSync(filePath, file);
    return filePath;
}
