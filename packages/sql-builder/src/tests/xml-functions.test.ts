import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("XML functions", () => {
    // === PRODUCING XML CONTENT ===

    it("builds xmlcomment", () => {
        const builder = q.select(q.xmlcomment(q.l("hello")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLCOMMENT($1)");
        expect(parameters).toEqual(["hello"]);
    });

    it("builds xmlconcat", () => {
        const builder = q.select(q.xmlconcat(q.l("<abc/>"), q.l("<bar>foo</bar>")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLCONCAT($1, $2)");
        expect(parameters).toEqual(["<abc/>", "<bar>foo</bar>"]);
    });

    it("builds xmlelement", () => {
        const builder = q.select(q.xmlelement(q.r`NAME ${"foo"}`, undefined, q.l("content")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLELEMENT(NAME $1, $2)");
        expect(parameters).toEqual(["foo","content"]);
    });

    it("builds xmlelement with attributes", () => {
        const builder = q.select(q.xmlelement(q.r`NAME ${"foo"}`, q.xmlattributes(q.c("bar").as("xyz")), q.l("content")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLELEMENT(NAME $1, XMLATTRIBUTES(bar AS xyz), $2)");
        expect(parameters).toEqual([
            "foo",
            "content"
        ]);
    });

    it("builds xmlelement with multiple content", () => {
        const builder = q.select(q.xmlelement(q.r`NAME ${"foo"}`, undefined, q.l("content1"), q.l("content2"), q.l("content3")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLELEMENT(NAME $1, $2, $3, $4)");
        expect(parameters).toEqual(["foo","content1", "content2", "content3"]);
    });

    it("builds xmlattributes", () => {
        const builder = q.select(q.xmlattributes(q.c("a"), q.c("b").as("c")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLATTRIBUTES(a, b AS c)");
        expect(parameters).toEqual([]);
    });

    it("builds xmlforest", () => {
        const builder = q.select(q.xmlforest(q.c("abc").as("foo"), q.c("123").as("bar")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLFOREST(abc AS foo, \"123\" AS bar)");
        expect(parameters).toEqual([]);
    });

    it("builds xmlpi", () => {
        const builder = q.select(q.xmlpi(q.l("php"), q.l('echo "hello world";')));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLPI($1, $2)");
        expect(parameters).toEqual(["php", 'echo "hello world";']);
    });

    it("builds xmlroot", () => {
        const builder = q.select(q.xmlroot(q.xmlparse(q.r`DOCUMENT ${'<content>abc</content>'}`),q.r`VERSION ${'1.0'}`, q.r`STANDALONE ${'yes'}`));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLROOT(XMLPARSE(DOCUMENT $1), VERSION $2, STANDALONE $3)");
        expect(parameters).toEqual(["<content>abc</content>", "1.0", "yes"]);
    });

    it("builds xmlroot without standalone", () => {
        const builder = q.select(q.xmlroot(q.xmlparse(q.r`DOCUMENT ${'<content>abc</content>'}`),q.r`VERSION ${'1.0'}`));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLROOT(XMLPARSE(DOCUMENT $1), VERSION $2)");
        expect(parameters).toEqual(["<content>abc</content>", "1.0"]);
    });

    it("builds xmlagg", () => {
        const builder = q.select(q.xmlagg(q.c("xml_column")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLAGG(xml_column)");
        expect(parameters).toEqual([]);
    });

    // === XML PREDICATES ===

    it("builds xmlExists", () => {
        const builder = q.select(q.xmlexists(q.r`${"//town[text() = 'Toronto']"} PASSING BY REF xml_data`));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLEXISTS($1 PASSING BY REF xml_data)");
        expect(parameters).toEqual(["//town[text() = 'Toronto']"]);
    });

    it("builds xmlIsWellFormed", () => {
        const builder = q.select(q.xmlIsWellFormed(q.l("<test>content</test>")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XML_IS_WELL_FORMED($1)");
        expect(parameters).toEqual(["<test>content</test>"]);
    });

    it("builds xmlIsWellFormedDocument", () => {
        const builder = q.select(q.xmlIsWellFormedDocument(q.l("<root>content</root>")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XML_IS_WELL_FORMED_DOCUMENT($1)");
        expect(parameters).toEqual(["<root>content</root>"]);
    });

    it("builds xmlIsWellFormedContent", () => {
        const builder = q.select(q.xmlIsWellFormedContent(q.l("<fragment>content</fragment>")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XML_IS_WELL_FORMED_CONTENT($1)");
        expect(parameters).toEqual(["<fragment>content</fragment>"]);
    });

    // === PROCESSING XML ===

    it("builds xpath", () => {
        const builder = q.select(q.xpath(q.l("/my:a/text()"), q.c("xml_col"), q.l("[['my', 'http://example.com']]")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XPATH($1, xml_col, $2)");
        expect(parameters).toEqual(["/my:a/text()", "[['my', 'http://example.com']]"]);
    });

    it("builds xpathExists", () => {
        const builder = q.select(q.xpathExists(q.l("/my:a/text()"), q.c("xml_col"), q.l("[['my', 'http://example.com']]")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XPATH_EXISTS($1, xml_col, $2)");
        expect(parameters).toEqual(["/my:a/text()", "[['my', 'http://example.com']]"]);
    });

    // === MAPPING TABLES TO XML ===

    it("builds tableToXml", () => {
        const builder = q.select(q.tableToXml(q.l("my_table"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT TABLE_TO_XML($1, $2, $3)");
        expect(parameters).toEqual(["my_table", true, false]);
    });

    it("builds queryToXml", () => {
        const builder = q.select(q.queryToXml(q.l("SELECT * FROM my_table"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT QUERY_TO_XML($1, $2, $3)");
        expect(parameters).toEqual(["SELECT * FROM my_table", true, false]);
    });

    it("builds cursorToXml", () => {
        const builder = q.select(q.cursorToXml(q.l("my_cursor"), q.l(10), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CURSOR_TO_XML($1, $2, $3, $4)");
        expect(parameters).toEqual(["my_cursor", 10, true, false]);
    });

    it("builds tableToXmlschema", () => {
        const builder = q.select(q.tableToXmlschema(q.l("my_table"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT TABLE_TO_XMLSCHEMA($1, $2, $3)");
        expect(parameters).toEqual(["my_table", true, false]);
    });

    it("builds queryToXmlschema", () => {
        const builder = q.select(q.queryToXmlschema(q.l("SELECT * FROM my_table"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT QUERY_TO_XMLSCHEMA($1, $2, $3)");
        expect(parameters).toEqual(["SELECT * FROM my_table", true, false]);
    });

    it("builds cursorToXmlschema", () => {
        const builder = q.select(q.cursorToXmlschema(q.l("my_cursor"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CURSOR_TO_XMLSCHEMA($1, $2, $3)");
        expect(parameters).toEqual(["my_cursor", true, false]);
    });

    it("builds tableToXmlAndXmlschema", () => {
        const builder = q.select(q.tableToXmlAndXmlschema(q.l("my_table"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT TABLE_TO_XML_AND_XMLSCHEMA($1, $2, $3)");
        expect(parameters).toEqual(["my_table", true, false]);
    });

    it("builds queryToXmlAndXmlschema", () => {
        const builder = q.select(q.queryToXmlAndXmlschema(q.l("SELECT * FROM my_table"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT QUERY_TO_XML_AND_XMLSCHEMA($1, $2, $3)");
        expect(parameters).toEqual(["SELECT * FROM my_table", true, false]);
    });

    it("builds schemaToXml", () => {
        const builder = q.select(q.schemaToXml(q.l("public"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT SCHEMA_TO_XML($1, $2, $3)");
        expect(parameters).toEqual(["public", true, false]);
    });

    it("builds schemaToXmlschema", () => {
        const builder = q.select(q.schemaToXmlschema(q.l("public"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT SCHEMA_TO_XMLSCHEMA($1, $2, $3)");
        expect(parameters).toEqual(["public", true, false]);
    });

    it("builds schemaToXmlAndXmlschema", () => {
        const builder = q.select(q.schemaToXmlAndXmlschema(q.l("public"), q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT SCHEMA_TO_XML_AND_XMLSCHEMA($1, $2, $3)");
        expect(parameters).toEqual(["public", true, false]);
    });

    it("builds databaseToXml", () => {
        const builder = q.select(q.databaseToXml(q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT DATABASE_TO_XML($1, $2)");
        expect(parameters).toEqual([true, false]);
    });

    it("builds databaseToXmlschema", () => {
        const builder = q.select(q.databaseToXmlschema(q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT DATABASE_TO_XMLSCHEMA($1, $2)");
        expect(parameters).toEqual([true, false]);
    });

    it("builds databaseToXmlAndXmlschema", () => {
        const builder = q.select(q.databaseToXmlAndXmlschema(q.l(true), q.l(false)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT DATABASE_TO_XML_AND_XMLSCHEMA($1, $2)");
        expect(parameters).toEqual([true, false]);
    });
});
