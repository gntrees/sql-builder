import { CoreQueryBuilder } from "./core-query-builder";
import { BaseQueryBuilder } from "./generated/base-query-builder";
import { EnumFunctionBuilder } from "./override-enum-functions";
import type { Statement } from "./types";
import { ParameterType } from "./base-raw-query-builder";

export class DateTimeFunctionBuilder extends BaseQueryBuilder {
    age(...args: Statement[]) {
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

    dateTrunc(unit?: Statement, source?: Statement) {
        return this.pushFunction("DATE_TRUNC",
            unit === undefined ? undefined : this.toLiteral(unit),
            source);
    }

    datePart(field?: Statement, source?: Statement) {
        return this.pushFunction("DATE_PART",
            field === undefined ? undefined : this.toLiteral(field),
            source);
    }

    dateBin(stride?: Statement, source?: Statement, origin?: Statement) {
        return this.pushFunction("DATE_BIN", stride, source, origin);
    }

    dateAdd(timestamp?: Statement, interval?: Statement, timezone?: Statement) {
        return this.pushFunction("DATE_ADD", timestamp, interval, timezone);
    }

    dateSubtract(timestamp?: Statement, interval?: Statement, timezone?: Statement) {
        return this.pushFunction("DATE_SUBTRACT", timestamp, interval, timezone);
    }

    override extract(field?: Statement | string, source?: Statement) {
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

    toChar(value?: Statement, format?: Statement) {
        return this.pushFunction("TO_CHAR",
            value,
            format === undefined ? undefined : this.toLiteral(format));
    }

    toDate(value?: Statement, format?: Statement) {
        return this.pushFunction("TO_DATE",
            value,
            format === undefined ? undefined : this.toLiteral(format));
    }

    toNumber(value?: Statement, format?: Statement) {
        return this.pushFunction("TO_NUMBER",
            value,
            format === undefined ? undefined : this.toLiteral(format));
    }

    toTimestamp(value?: Statement, format?: Statement) {
        return this.pushFunction("TO_TIMESTAMP",
            value,
            format === undefined ? undefined : this.toLiteral(format));
    }

    timezone(zone?: Statement, source?: Statement) {
        return this.pushFunction("TIMEZONE",
            zone === undefined ? undefined : this.toLiteral(zone),
            source);
    }

    atTimeZone(source: Statement, zone: Statement) {
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

    atTimeZoneIdentifier(source: Statement, zone: Statement) {
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

    atLocal(source: Statement) {
        const resolvedSource = this.resolveStatement(source, 0);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource, "AT", "LOCAL");
        }
        return this;
    }

    atLocalIdentifier(source: Statement) {
        const resolvedSource = this.resolveIdentifierStatement(source, 0);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource, "AT", "LOCAL");
        }
        return this;
    }

    makeDate(year?: Statement, month?: Statement, day?: Statement) {
        return this.pushFunction("MAKE_DATE",
            year === undefined ? undefined : this.toLiteral(year),
            month === undefined ? undefined : this.toLiteral(month),
            day === undefined ? undefined : this.toLiteral(day));
    }

    makeInterval(
        years?: Statement,
        months?: Statement,
        weeks?: Statement,
        days?: Statement,
        hours?: Statement,
        mins?: Statement,
        secs?: Statement,
    ) {
        return this.pushFunction("MAKE_INTERVAL",
            years === undefined ? undefined : this.toLiteral(years),
            months === undefined ? undefined : this.toLiteral(months),
            weeks === undefined ? undefined : this.toLiteral(weeks),
            days === undefined ? undefined : this.toLiteral(days),
            hours === undefined ? undefined : this.toLiteral(hours),
            mins === undefined ? undefined : this.toLiteral(mins),
            secs === undefined ? undefined : this.toLiteral(secs));
    }

    makeTime(hours?: Statement, minutes?: Statement, seconds?: Statement) {
        return this.pushFunction("MAKE_TIME",
            hours === undefined ? undefined : this.toLiteral(hours),
            minutes === undefined ? undefined : this.toLiteral(minutes),
            seconds === undefined ? undefined : this.toLiteral(seconds));
    }

    makeTimestamp(
        year?: Statement,
        month?: Statement,
        day?: Statement,
        hours?: Statement,
        minutes?: Statement,
        seconds?: Statement,
    ) {
        return this.pushFunction("MAKE_TIMESTAMP",
            year === undefined ? undefined : this.toLiteral(year),
            month === undefined ? undefined : this.toLiteral(month),
            day === undefined ? undefined : this.toLiteral(day),
            hours === undefined ? undefined : this.toLiteral(hours),
            minutes === undefined ? undefined : this.toLiteral(minutes),
            seconds === undefined ? undefined : this.toLiteral(seconds));
    }

    makeTimestamptz(
        year?: Statement,
        month?: Statement,
        day?: Statement,
        hours?: Statement,
        minutes?: Statement,
        seconds?: Statement,
    ) {
        return this.pushFunction("MAKE_TIMESTAMPTZ",
            year === undefined ? undefined : this.toLiteral(year),
            month === undefined ? undefined : this.toLiteral(month),
            day === undefined ? undefined : this.toLiteral(day),
            hours === undefined ? undefined : this.toLiteral(hours),
            minutes === undefined ? undefined : this.toLiteral(minutes),
            seconds === undefined ? undefined : this.toLiteral(seconds));
    }

    pgSleep(seconds?: Statement) {
        return this.pushFunction("PG_SLEEP",
            seconds === undefined ? undefined : this.toLiteral(seconds));
    }

    pgSleepFor(interval?: Statement) {
        return this.pushFunction("PG_SLEEP_FOR",
            interval === undefined ? undefined : this.toLiteral(interval));
    }

    pgSleepUntil(timestamp?: Statement) {
        return this.pushFunction("PG_SLEEP_UNTIL", timestamp);
    }

    override currentTime(precision?: Statement) {
        if (precision === undefined || precision === null) {
            return super.currentTime();
        }
        return this.pushFunction("CURRENT_TIME",
            precision === undefined ? undefined : this.toLiteral(precision));
    }

    override currentTimestamp(precision?: Statement) {
        if (precision === undefined || precision === null) {
            return super.currentTimestamp();
        }
        return this.pushFunction("CURRENT_TIMESTAMP",
            precision === undefined ? undefined : this.toLiteral(precision));
    }

    override localtime(precision?: Statement) {
        if (precision === undefined || precision === null) {
            return super.localtime();
        }
        return this.pushFunction("LOCALTIME",
            precision === undefined ? undefined : this.toLiteral(precision));
    }

    override localtimestamp(precision?: Statement) {
        if (precision === undefined || precision === null) {
            return super.localtimestamp();
        }
        return this.pushFunction("LOCALTIMESTAMP",
            precision === undefined ? undefined : this.toLiteral(precision));
    }

    isfinite(value?: Statement) {
        return this.pushFunction("ISFINITE", value);
    }

    justifyDays(value?: Statement) {
        return this.pushFunction("JUSTIFY_DAYS", value);
    }

    justifyHours(value?: Statement) {
        return this.pushFunction("JUSTIFY_HOURS", value);
    }

    justifyInterval(value?: Statement) {
        return this.pushFunction("JUSTIFY_INTERVAL", value);
    }
}
