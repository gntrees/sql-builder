import { UUIDFunctionBuilder } from "./override-uuid-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";
import { ParameterType } from "./base-raw-query-builder";

export class XMLFunctionBuilder extends UUIDFunctionBuilder {
    override xmlcomment(text?: StatementValueQueryBuilder) {
        return this.pushFunction("XMLCOMMENT", text);
    }

    override xmlconcat(...xml: StatementValueQueryBuilder[]) {
        const filtered = xml.filter(x => x !== undefined);
        return this.pushFunction("XMLCONCAT", ...filtered);
    }

    override xmlelement(name?: StatementValueQueryBuilder, attributes?: StatementValueQueryBuilder, ...content: StatementValueQueryBuilder[]) {
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

    override xmlattributes(...values: StatementValueQueryBuilder[]) {
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

    override xmlforest(...content: StatementValueQueryBuilder[]) {
        const filtered = content.filter(c => c !== undefined);
        return this.pushFunction("XMLFOREST", ...filtered);
    }

    override xmlpi(name?: StatementValueQueryBuilder, content?: StatementValueQueryBuilder) {
        return this.pushFunction("XMLPI", name, content);
    }

    override xmlroot(xml?: StatementValueQueryBuilder, version?: StatementValueLiteral, standalone?: StatementValueLiteral) {
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

    override xmlagg(xml?: StatementValueQueryBuilder) {
        return this.pushFunction("XMLAGG", xml);
    }

    override xmlparse(xml?: StatementValueQueryBuilder) {
        this.query.sql.push("XMLPARSE(DOCUMENT");
        const resolvedXml = this.resolveStatement(xml, 1);
        if (resolvedXml.length > 0) {
            this.query.sql.push(...resolvedXml);
        }
        this.query.sql.push(")");
        return this;
    }

    // === XML PREDICATES (5 functions) ===

    isDocument(xml?: StatementValueQueryBuilder) {
        const resolvedXml = this.resolveStatement(xml, 0);
        if (resolvedXml.length > 0) {
            this.query.sql.push(...resolvedXml, "IS", "DOCUMENT");
        }
        return this;
    }

    xmlExists(xpath?: StatementValueLiteral, xml?: StatementValueQueryBuilder) {
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

    xmlIsWellFormed(text?: StatementValueLiteral) {
        return this.pushFunction("XML_IS_WELL_FORMED",
            text === undefined ? undefined : this.toLiteralValue(text));
    }

    xmlIsWellFormedDocument(text?: StatementValueLiteral) {
        return this.pushFunction("XML_IS_WELL_FORMED_DOCUMENT",
            text === undefined ? undefined : this.toLiteralValue(text));
    }

    xmlIsWellFormedContent(text?: StatementValueLiteral) {
        return this.pushFunction("XML_IS_WELL_FORMED_CONTENT",
            text === undefined ? undefined : this.toLiteralValue(text));
    }

    // === PROCESSING XML (2 functions) ===

    xpath(xpath?: StatementValueLiteral, xml?: StatementValueQueryBuilder, args?: StatementValueLiteral) {
        return this.pushFunction("XPATH",
            xpath === undefined ? undefined : this.toLiteralValue(xpath),
            xml,
            args === undefined ? undefined : this.toLiteralValue(args));
    }

    xpathExists(xpath?: StatementValueLiteral, xml?: StatementValueQueryBuilder, args?: StatementValueLiteral) {
        return this.pushFunction("XPATH_EXISTS",
            xpath === undefined ? undefined : this.toLiteralValue(xpath),
            xml,
            args === undefined ? undefined : this.toLiteralValue(args));
    }

    // === MAPPING TABLES TO XML (16 functions) ===
    // Boolean flags (nulls, tableforest) use StatementValueLiteral

    tableToXml(tbl?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("TABLE_TO_XML",
            tbl === undefined ? undefined : this.toLiteralValue(tbl),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    queryToXml(query?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("QUERY_TO_XML",
            query === undefined ? undefined : this.toLiteralValue(query),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    cursorToXml(cursor?: StatementValueLiteral, count?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("CURSOR_TO_XML",
            cursor === undefined ? undefined : this.toLiteralValue(cursor),
            count === undefined ? undefined : this.toLiteralValue(count),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    tableToXmlschema(tbl?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("TABLE_TO_XMLSCHEMA",
            tbl === undefined ? undefined : this.toLiteralValue(tbl),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    queryToXmlschema(query?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("QUERY_TO_XMLSCHEMA",
            query === undefined ? undefined : this.toLiteralValue(query),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    cursorToXmlschema(cursor?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("CURSOR_TO_XMLSCHEMA",
            cursor === undefined ? undefined : this.toLiteralValue(cursor),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    tableToXmlAndXmlschema(tbl?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("TABLE_TO_XML_AND_XMLSCHEMA",
            tbl === undefined ? undefined : this.toLiteralValue(tbl),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    queryToXmlAndXmlschema(query?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("QUERY_TO_XML_AND_XMLSCHEMA",
            query === undefined ? undefined : this.toLiteralValue(query),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    schemaToXml(schema?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("SCHEMA_TO_XML",
            schema === undefined ? undefined : this.toLiteralValue(schema),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    schemaToXmlschema(schema?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("SCHEMA_TO_XMLSCHEMA",
            schema === undefined ? undefined : this.toLiteralValue(schema),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    schemaToXmlAndXmlschema(schema?: StatementValueLiteral, nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("SCHEMA_TO_XML_AND_XMLSCHEMA",
            schema === undefined ? undefined : this.toLiteralValue(schema),
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    databaseToXml(nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("DATABASE_TO_XML",
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    databaseToXmlschema(nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("DATABASE_TO_XMLSCHEMA",
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }

    databaseToXmlAndXmlschema(nulls?: StatementValueLiteral, tableforest?: StatementValueLiteral, targetns?: StatementValueLiteral) {
        return this.pushFunction("DATABASE_TO_XML_AND_XMLSCHEMA",
            nulls === undefined ? undefined : this.toLiteralValue(nulls),
            tableforest === undefined ? undefined : this.toLiteralValue(tableforest),
            targetns === undefined ? undefined : this.toLiteralValue(targetns));
    }
}
