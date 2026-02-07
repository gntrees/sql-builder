import { UUIDFunctionBuilder } from "./override-uuid-functions";
import type { Statement } from "./types";
import { ParameterType } from "./base-raw-query-builder";

export class XMLFunctionBuilder extends UUIDFunctionBuilder {
    override xmlcomment(text?: Statement) {
        return this.pushFunction("XMLCOMMENT", text);
    }

    override xmlconcat(...xml: Statement[]) {
        const filtered = xml.filter(x => x !== undefined);
        return this.pushFunction("XMLCONCAT", ...filtered);
    }

    override xmlelement(name?: Statement, attributes?: Statement, ...content: Statement[]) {
        this.query.sql.push("XMLELEMENT(NAME");
        const resolvedName = this.resolveStatement(name, 0);
        if (resolvedName.length > 0) {
            this.query.sql.push(...resolvedName);
        }
        if (attributes !== undefined && attributes !== null) {
            this.query.sql.push(",");
            const resolvedAttrs = this.resolveStatement(attributes, 1);
            if (resolvedAttrs.length > 0) {
                this.query.sql.push(...resolvedAttrs);
            }
        }
        content.forEach((item, index) => {
            const resolvedItem = this.resolveStatement(item, index + 2);
            if (resolvedItem.length > 0) {
                this.query.sql.push(",");
                this.query.sql.push(...resolvedItem);
            }
        });
        this.query.sql.push(")");
        return this;
    }

    override xmlattributes(...values: Statement[]) {
        this.query.sql.push("XMLATTRIBUTES(");
        let hasItems = false;
        values.forEach((value) => {
            const resolvedValue = this.resolveStatement(value, 0);
            if (resolvedValue.length > 0) {
                if (hasItems) {
                    this.query.sql.push(",");
                }
                this.query.sql.push(...resolvedValue);
                hasItems = true;
            }
        });
        this.query.sql.push(")");
        return this;
    }

    override xmlforest(...content: Statement[]) {
        const filtered = content.filter(c => c !== undefined);
        return this.pushFunction("XMLFOREST", ...filtered);
    }

    override xmlpi(name?: Statement, content?: Statement) {
        return this.pushFunction("XMLPI", name, content);
    }

    override xmlroot(xml?: Statement, version?: Statement, standalone?: Statement) {
        this.query.sql.push("XMLROOT(");
        const resolvedXml = this.resolveStatement(xml, 0);
        if (resolvedXml.length > 0) {
            this.query.sql.push(...resolvedXml);
        }
        if (version !== undefined && version !== null) {
            this.query.sql.push(",", "VERSION");
            const resolvedVersion = [this.createLiteralParameter(version as string | number | boolean | null)];
            if (resolvedVersion.length > 0) {
                this.query.sql.push(...resolvedVersion);
            }
        }
        if (standalone !== undefined && standalone !== null) {
            this.query.sql.push(",", "STANDALONE");
            const resolvedStandalone = [this.createLiteralParameter(standalone as string | number | boolean | null)];
            if (resolvedStandalone.length > 0) {
                this.query.sql.push(...resolvedStandalone);
            }
        }
        this.query.sql.push(")");
        return this;
    }

    override xmlagg(xml?: Statement) {
        return this.pushFunction("XMLAGG", xml);
    }

    override xmlparse(xml?: Statement) {
        this.query.sql.push("XMLPARSE(DOCUMENT");
        const resolvedXml = this.resolveStatement(xml, 1);
        if (resolvedXml.length > 0) {
            this.query.sql.push(...resolvedXml);
        }
        this.query.sql.push(")");
        return this;
    }

    // === XML PREDICATES (5 functions) ===

    isDocument(xml?: Statement) {
        const resolvedXml = this.resolveStatement(xml, 0);
        if (resolvedXml.length > 0) {
            this.query.sql.push(...resolvedXml, "IS", "DOCUMENT");
        }
        return this;
    }

    xmlExists(xpath?: Statement, xml?: Statement) {
        this.query.sql.push("XMLEXISTS(");
        const resolvedXpath = xpath === undefined ? [] : [this.createLiteralParameter(xpath as string | number | boolean | null)];
        if (resolvedXpath.length > 0) {
            this.query.sql.push(...resolvedXpath);
        }
        this.query.sql.push("PASSING", "BY", "REF");
        const resolvedXml = this.resolveStatement(xml, 1);
        if (resolvedXml.length > 0) {
            this.query.sql.push(...resolvedXml);
        }
        this.query.sql.push(")");
        return this;
    }

    xmlIsWellFormed(text?: Statement) {
        return this.pushFunction("XML_IS_WELL_FORMED",
            text === undefined ? undefined : this.toLiteral(text));
    }

    xmlIsWellFormedDocument(text?: Statement) {
        return this.pushFunction("XML_IS_WELL_FORMED_DOCUMENT",
            text === undefined ? undefined : this.toLiteral(text));
    }

    xmlIsWellFormedContent(text?: Statement) {
        return this.pushFunction("XML_IS_WELL_FORMED_CONTENT",
            text === undefined ? undefined : this.toLiteral(text));
    }

    // === PROCESSING XML (2 functions) ===

    xpath(xpath?: Statement, xml?: Statement, args?: Statement) {
        return this.pushFunction("XPATH",
            xpath === undefined ? undefined : this.toLiteral(xpath),
            xml,
            args === undefined ? undefined : this.toLiteral(args));
    }

    xpathExists(xpath?: Statement, xml?: Statement, args?: Statement) {
        return this.pushFunction("XPATH_EXISTS",
            xpath === undefined ? undefined : this.toLiteral(xpath),
            xml,
            args === undefined ? undefined : this.toLiteral(args));
    }

    // === MAPPING TABLES TO XML (16 functions) ===
    // Boolean flags (nulls, tableforest) use Statement

    tableToXml(tbl?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("TABLE_TO_XML",
            tbl === undefined ? undefined : this.toLiteral(tbl),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    queryToXml(query?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("QUERY_TO_XML",
            query === undefined ? undefined : this.toLiteral(query),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    cursorToXml(cursor?: Statement, count?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("CURSOR_TO_XML",
            cursor === undefined ? undefined : this.toLiteral(cursor),
            count === undefined ? undefined : this.toLiteral(count),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    tableToXmlschema(tbl?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("TABLE_TO_XMLSCHEMA",
            tbl === undefined ? undefined : this.toLiteral(tbl),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    queryToXmlschema(query?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("QUERY_TO_XMLSCHEMA",
            query === undefined ? undefined : this.toLiteral(query),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    cursorToXmlschema(cursor?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("CURSOR_TO_XMLSCHEMA",
            cursor === undefined ? undefined : this.toLiteral(cursor),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    tableToXmlAndXmlschema(tbl?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("TABLE_TO_XML_AND_XMLSCHEMA",
            tbl === undefined ? undefined : this.toLiteral(tbl),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    queryToXmlAndXmlschema(query?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("QUERY_TO_XML_AND_XMLSCHEMA",
            query === undefined ? undefined : this.toLiteral(query),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    schemaToXml(schema?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("SCHEMA_TO_XML",
            schema === undefined ? undefined : this.toLiteral(schema),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    schemaToXmlschema(schema?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("SCHEMA_TO_XMLSCHEMA",
            schema === undefined ? undefined : this.toLiteral(schema),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    schemaToXmlAndXmlschema(schema?: Statement, nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("SCHEMA_TO_XML_AND_XMLSCHEMA",
            schema === undefined ? undefined : this.toLiteral(schema),
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    databaseToXml(nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("DATABASE_TO_XML",
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    databaseToXmlschema(nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("DATABASE_TO_XMLSCHEMA",
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }

    databaseToXmlAndXmlschema(nulls?: Statement, tableforest?: Statement, targetns?: Statement) {
        return this.pushFunction("DATABASE_TO_XML_AND_XMLSCHEMA",
            nulls === undefined ? undefined : this.toLiteral(nulls),
            tableforest === undefined ? undefined : this.toLiteral(tableforest),
            targetns === undefined ? undefined : this.toLiteral(targetns));
    }
}
