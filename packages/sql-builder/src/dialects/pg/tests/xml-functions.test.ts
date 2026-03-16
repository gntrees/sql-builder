import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("XML functions", () => {
    // === PRODUCING XML CONTENT ===

    it("builds xmlcomment", () => {
        const builder = q.select(q.xmlcomment(q.l("hello")));
        expectQuery(builder, "xml", "xmlcomment");
    });

    it("builds xmlconcat", () => {
        const builder = q.select(q.xmlconcat(q.l("<abc/>"), q.l("<bar>foo</bar>")));
        expectQuery(builder, "xml", "xmlconcat");
    });

    it("builds xmlelement", () => {
        const builder = q.select(q.xmlelement(q.r`NAME ${"foo"}`, undefined, q.l("content")));
        expectQuery(builder, "xml", "xmlelement");
    });

    it("builds xmlelement with attributes", () => {
        const builder = q.select(q.xmlelement(q.r`NAME ${"foo"}`, q.xmlattributes(q.c("bar").as(q.c("xyz"))), q.l("content")));
        expectQuery(builder, "xml", "xmlelement with attributes");
    });

    it("builds xmlelement with multiple content", () => {
        const builder = q.select(q.xmlelement(q.r`NAME ${"foo"}`, undefined, q.l("content1"), q.l("content2"), q.l("content3")));
        expectQuery(builder, "xml", "xmlelement with multiple content");
    });

    it("builds xmlattributes", () => {
        const builder = q.select(q.xmlattributes(q.c("a"), q.c("b").as(q.c("c"))));
        expectQuery(builder, "xml", "xmlattributes");
    });

    it("builds xmlforest", () => {
        const builder = q.select(q.xmlforest(q.c("abc").as(q.c("foo")), q.c("123").as(q.c("bar"))));
        expectQuery(builder, "xml", "xmlforest");
    });

    it("builds xmlpi", () => {
        const builder = q.select(q.xmlpi(q.l("php"), q.l('echo "hello world";')));
        expectQuery(builder, "xml", "xmlpi");
    });

    it("builds xmlroot", () => {
        const builder = q.select(q.xmlroot(q.xmlparse(q.r`DOCUMENT ${'<content>abc</content>'}`),q.r`VERSION ${'1.0'}`, q.r`STANDALONE ${'yes'}`));
        expectQuery(builder, "xml", "xmlroot");
    });

    it("builds xmlroot without standalone", () => {
        const builder = q.select(q.xmlroot(q.xmlparse(q.r`DOCUMENT ${'<content>abc</content>'}`),q.r`VERSION ${'1.0'}`));
        expectQuery(builder, "xml", "xmlroot without standalone");
    });

    it("builds xmlagg", () => {
        const builder = q.select(q.xmlagg(q.c("xml_column")));
        expectQuery(builder, "xml", "xmlagg");
    });

    // === XML PREDICATES ===

    it("builds xmlExists", () => {
        const builder = q.select(q.xmlexists(q.r`${"//town[text() = 'Toronto']"} PASSING BY REF xml_data`));
        expectQuery(builder, "xml", "xmlExists");
    });

    it("builds xmlIsWellFormed", () => {
        const builder = q.select(q.xmlIsWellFormed(q.l("<test>content</test>")));
        expectQuery(builder, "xml", "xmlIsWellFormed");
    });

    it("builds xmlIsWellFormedDocument", () => {
        const builder = q.select(q.xmlIsWellFormedDocument(q.l("<root>content</root>")));
        expectQuery(builder, "xml", "xmlIsWellFormedDocument");
    });

    it("builds xmlIsWellFormedContent", () => {
        const builder = q.select(q.xmlIsWellFormedContent(q.l("<fragment>content</fragment>")));
        expectQuery(builder, "xml", "xmlIsWellFormedContent");
    });

    // === PROCESSING XML ===

    it("builds xpath", () => {
        const builder = q.select(q.xpath(q.l("/my:a/text()"), q.c("xml_col"), q.l("[['my', 'http://example.com']]")));
        expectQuery(builder, "xml", "xpath");
    });

    it("builds xpathExists", () => {
        const builder = q.select(q.xpathExists(q.l("/my:a/text()"), q.c("xml_col"), q.l("[['my', 'http://example.com']]")));
        expectQuery(builder, "xml", "xpathExists");
    });

    // === MAPPING TABLES TO XML ===

    it("builds tableToXml", () => {
        const builder = q.select(q.tableToXml(q.l("my_table"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "tableToXml");
    });

    it("builds queryToXml", () => {
        const builder = q.select(q.queryToXml(q.l("SELECT * FROM my_table"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "queryToXml");
    });

    it("builds cursorToXml", () => {
        const builder = q.select(q.cursorToXml(q.l("my_cursor"), q.l(10), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "cursorToXml");
    });

    it("builds tableToXmlschema", () => {
        const builder = q.select(q.tableToXmlschema(q.l("my_table"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "tableToXmlschema");
    });

    it("builds queryToXmlschema", () => {
        const builder = q.select(q.queryToXmlschema(q.l("SELECT * FROM my_table"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "queryToXmlschema");
    });

    it("builds cursorToXmlschema", () => {
        const builder = q.select(q.cursorToXmlschema(q.l("my_cursor"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "cursorToXmlschema");
    });

    it("builds tableToXmlAndXmlschema", () => {
        const builder = q.select(q.tableToXmlAndXmlschema(q.l("my_table"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "tableToXmlAndXmlschema");
    });

    it("builds queryToXmlAndXmlschema", () => {
        const builder = q.select(q.queryToXmlAndXmlschema(q.l("SELECT * FROM my_table"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "queryToXmlAndXmlschema");
    });

    it("builds schemaToXml", () => {
        const builder = q.select(q.schemaToXml(q.l("public"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "schemaToXml");
    });

    it("builds schemaToXmlschema", () => {
        const builder = q.select(q.schemaToXmlschema(q.l("public"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "schemaToXmlschema");
    });

    it("builds schemaToXmlAndXmlschema", () => {
        const builder = q.select(q.schemaToXmlAndXmlschema(q.l("public"), q.l(true), q.l(false)));
        expectQuery(builder, "xml", "schemaToXmlAndXmlschema");
    });

    it("builds databaseToXml", () => {
        const builder = q.select(q.databaseToXml(q.l(true), q.l(false)));
        expectQuery(builder, "xml", "databaseToXml");
    });

    it("builds databaseToXmlschema", () => {
        const builder = q.select(q.databaseToXmlschema(q.l(true), q.l(false)));
        expectQuery(builder, "xml", "databaseToXmlschema");
    });

    it("builds databaseToXmlAndXmlschema", () => {
        const builder = q.select(q.databaseToXmlAndXmlschema(q.l(true), q.l(false)));
        expectQuery(builder, "xml", "databaseToXmlAndXmlschema");
    });
});
