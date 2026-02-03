import { CoreQueryBuilder } from "./core-query-builder";
import { BaseQueryBuilder } from "./generated/base-query-builder";
import { EnumFunctionBuilder } from "./override-enum-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";
import { ParameterType } from "./base-raw-query-builder";

export class DateTimeFunctionBuilder extends BaseQueryBuilder {
    age(...args: StatementValueQueryBuilder[]) {
        return this.pushFunction("AGE", ...args);
    }

    clockTimestamp() {
        return this.pushFunction("CLOCK_TIMESTAMP");
    }

    statementTimestamp() {
        return this.pushFunction("STATEMENT_TIMESTAMP");
    }

    transactionTimestamp() {
        return this.pushFunction("TRANSACTION_TIMESTAMP");
    }

    now() {
        return this.pushFunction("NOW");
    }

    timeofday() {
        return this.pushFunction("TIMEOFDAY");
    }

    dateTrunc(unit?: StatementValueLiteral, source?: StatementValueQueryBuilder) {
        return this.pushFunction("DATE_TRUNC",
            unit === undefined ? undefined : this.toLiteralValue(unit),
            source);
    }

    datePart(field?: StatementValueLiteral, source?: StatementValueQueryBuilder) {
        return this.pushFunction("DATE_PART",
            field === undefined ? undefined : this.toLiteralValue(field),
            source);
    }

    dateBin(stride?: StatementValueQueryBuilder, source?: StatementValueQueryBuilder, origin?: StatementValueQueryBuilder) {
        return this.pushFunction("DATE_BIN", stride, source, origin);
    }

    dateAdd(timestamp?: StatementValueQueryBuilder, interval?: StatementValueQueryBuilder, timezone?: StatementValueQueryBuilder) {
        return this.pushFunction("DATE_ADD", timestamp, interval, timezone);
    }

    dateSubtract(timestamp?: StatementValueQueryBuilder, interval?: StatementValueQueryBuilder, timezone?: StatementValueQueryBuilder) {
        return this.pushFunction("DATE_SUBTRACT", timestamp, interval, timezone);
    }

    override extract(field?: StatementValueLiteral | string, source?: StatementValueQueryBuilder) {
        if (field === undefined && source === undefined) {
            return super.extract();
        }
        this.query.sql.push("EXTRACT", "(");
        if (field !== undefined && field !== null) {
            const resolvedField = typeof field === "string"
                ? [field.toUpperCase()]
                : this.resolveStatement(field, 0);
            if (resolvedField.length > 0) {
                this.query.sql.push(...resolvedField);
            }
        }
        this.query.sql.push("FROM");
        const resolvedSource = this.resolveStatement(source, 1);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource);
        }
        this.query.sql.push(")");
        return this;
    }

    toChar(value?: StatementValueQueryBuilder, format?: StatementValueLiteral) {
        return this.pushFunction("TO_CHAR",
            value,
            format === undefined ? undefined : this.toLiteralValue(format));
    }

    toDate(value?: StatementValueQueryBuilder, format?: StatementValueLiteral) {
        return this.pushFunction("TO_DATE",
            value,
            format === undefined ? undefined : this.toLiteralValue(format));
    }

    toNumber(value?: StatementValueQueryBuilder, format?: StatementValueLiteral) {
        return this.pushFunction("TO_NUMBER",
            value,
            format === undefined ? undefined : this.toLiteralValue(format));
    }

    toTimestamp(value?: StatementValueQueryBuilder, format?: StatementValueLiteral) {
        return this.pushFunction("TO_TIMESTAMP",
            value,
            format === undefined ? undefined : this.toLiteralValue(format));
    }

    timezone(zone?: StatementValueLiteral, source?: StatementValueQueryBuilder) {
        return this.pushFunction("TIMEZONE",
            zone === undefined ? undefined : this.toLiteralValue(zone),
            source);
    }

    atTimeZone(source: StatementValueQueryBuilder, zone: StatementValueLiteral) {
        const resolvedSource = this.resolveStatement(source, 0);
        const resolvedZone = zone === undefined ? [] : [this.createLiteralParameter(zone as string | number | boolean | null)];
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource);
        }
        if (resolvedSource.length > 0 && resolvedZone.length > 0) {
            this.query.sql.push("AT", "TIME", "ZONE");
        }
        if (resolvedZone.length > 0) {
            this.query.sql.push(...resolvedZone);
        }
        return this;
    }

    atTimeZoneIdentifier(source: StatementValueQueryBuilder, zone: StatementValueLiteral) {
        const resolvedSource = this.resolveIdentifierStatement(source, 0);
        const resolvedZone = zone === undefined ? [] : [this.createLiteralParameter(zone as string | number | boolean | null)];
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource);
        }
        if (resolvedSource.length > 0 && resolvedZone.length > 0) {
            this.query.sql.push("AT", "TIME", "ZONE");
        }
        if (resolvedZone.length > 0) {
            this.query.sql.push(...resolvedZone);
        }
        return this;
    }

    atLocal(source: StatementValueQueryBuilder) {
        const resolvedSource = this.resolveStatement(source, 0);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource, "AT", "LOCAL");
        }
        return this;
    }

    atLocalIdentifier(source: StatementValueQueryBuilder) {
        const resolvedSource = this.resolveIdentifierStatement(source, 0);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource, "AT", "LOCAL");
        }
        return this;
    }

    makeDate(year?: StatementValueLiteral, month?: StatementValueLiteral, day?: StatementValueLiteral) {
        return this.pushFunction("MAKE_DATE",
            year === undefined ? undefined : this.toLiteralValue(year),
            month === undefined ? undefined : this.toLiteralValue(month),
            day === undefined ? undefined : this.toLiteralValue(day));
    }

    makeInterval(
        years?: StatementValueLiteral,
        months?: StatementValueLiteral,
        weeks?: StatementValueLiteral,
        days?: StatementValueLiteral,
        hours?: StatementValueLiteral,
        mins?: StatementValueLiteral,
        secs?: StatementValueLiteral,
    ) {
        return this.pushFunction("MAKE_INTERVAL",
            years === undefined ? undefined : this.toLiteralValue(years),
            months === undefined ? undefined : this.toLiteralValue(months),
            weeks === undefined ? undefined : this.toLiteralValue(weeks),
            days === undefined ? undefined : this.toLiteralValue(days),
            hours === undefined ? undefined : this.toLiteralValue(hours),
            mins === undefined ? undefined : this.toLiteralValue(mins),
            secs === undefined ? undefined : this.toLiteralValue(secs));
    }

    makeTime(hours?: StatementValueLiteral, minutes?: StatementValueLiteral, seconds?: StatementValueLiteral) {
        return this.pushFunction("MAKE_TIME",
            hours === undefined ? undefined : this.toLiteralValue(hours),
            minutes === undefined ? undefined : this.toLiteralValue(minutes),
            seconds === undefined ? undefined : this.toLiteralValue(seconds));
    }

    makeTimestamp(
        year?: StatementValueLiteral,
        month?: StatementValueLiteral,
        day?: StatementValueLiteral,
        hours?: StatementValueLiteral,
        minutes?: StatementValueLiteral,
        seconds?: StatementValueLiteral,
    ) {
        return this.pushFunction("MAKE_TIMESTAMP",
            year === undefined ? undefined : this.toLiteralValue(year),
            month === undefined ? undefined : this.toLiteralValue(month),
            day === undefined ? undefined : this.toLiteralValue(day),
            hours === undefined ? undefined : this.toLiteralValue(hours),
            minutes === undefined ? undefined : this.toLiteralValue(minutes),
            seconds === undefined ? undefined : this.toLiteralValue(seconds));
    }

    makeTimestamptz(
        year?: StatementValueLiteral,
        month?: StatementValueLiteral,
        day?: StatementValueLiteral,
        hours?: StatementValueLiteral,
        minutes?: StatementValueLiteral,
        seconds?: StatementValueLiteral,
    ) {
        return this.pushFunction("MAKE_TIMESTAMPTZ",
            year === undefined ? undefined : this.toLiteralValue(year),
            month === undefined ? undefined : this.toLiteralValue(month),
            day === undefined ? undefined : this.toLiteralValue(day),
            hours === undefined ? undefined : this.toLiteralValue(hours),
            minutes === undefined ? undefined : this.toLiteralValue(minutes),
            seconds === undefined ? undefined : this.toLiteralValue(seconds));
    }

    pgSleep(seconds?: StatementValueLiteral) {
        return this.pushFunction("PG_SLEEP",
            seconds === undefined ? undefined : this.toLiteralValue(seconds));
    }

    pgSleepFor(interval?: StatementValueLiteral) {
        return this.pushFunction("PG_SLEEP_FOR",
            interval === undefined ? undefined : this.toLiteralValue(interval));
    }

    pgSleepUntil(timestamp?: StatementValueQueryBuilder) {
        return this.pushFunction("PG_SLEEP_UNTIL", timestamp);
    }

    override currentTime(precision?: StatementValueLiteral) {
        if (precision === undefined || precision === null) {
            return super.currentTime();
        }
        return this.pushFunction("CURRENT_TIME",
            precision === undefined ? undefined : this.toLiteralValue(precision));
    }

    override currentTimestamp(precision?: StatementValueLiteral) {
        if (precision === undefined || precision === null) {
            return super.currentTimestamp();
        }
        return this.pushFunction("CURRENT_TIMESTAMP",
            precision === undefined ? undefined : this.toLiteralValue(precision));
    }

    override localtime(precision?: StatementValueLiteral) {
        if (precision === undefined || precision === null) {
            return super.localtime();
        }
        return this.pushFunction("LOCALTIME",
            precision === undefined ? undefined : this.toLiteralValue(precision));
    }

    override localtimestamp(precision?: StatementValueLiteral) {
        if (precision === undefined || precision === null) {
            return super.localtimestamp();
        }
        return this.pushFunction("LOCALTIMESTAMP",
            precision === undefined ? undefined : this.toLiteralValue(precision));
    }

    isfinite(value?: StatementValueQueryBuilder) {
        return this.pushFunction("ISFINITE", value);
    }

    justifyDays(value?: StatementValueQueryBuilder) {
        return this.pushFunction("JUSTIFY_DAYS", value);
    }

    justifyHours(value?: StatementValueQueryBuilder) {
        return this.pushFunction("JUSTIFY_HOURS", value);
    }

    justifyInterval(value?: StatementValueQueryBuilder) {
        return this.pushFunction("JUSTIFY_INTERVAL", value);
    }
}
