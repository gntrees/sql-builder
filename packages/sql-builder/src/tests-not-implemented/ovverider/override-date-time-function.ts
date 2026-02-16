import { BaseQueryBuilder } from "../../generated/base-query-builder";
import type { Statement } from "../../types";

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
            unit,
            source);
    }

    datePart(field?: Statement, source?: Statement) {
        return this.pushFunction("DATE_PART",
            field,
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
                : this.resolveStatement(field);
            if (resolvedField.length > 0) {
                this.query.sql.push(...resolvedField);
            }
        }
        this.query.sql.push("FROM");
        const resolvedSource = this.resolveStatement(source);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource);
        }
        this.query.sql.push(")");
        return this;
    }

    toChar(value?: Statement, format?: Statement) {
        return this.pushFunction("TO_CHAR",
            value,
            format);
    }

    toDate(value?: Statement, format?: Statement) {
        return this.pushFunction("TO_DATE",
            value,
            format);
    }

    toNumber(value?: Statement, format?: Statement) {
        return this.pushFunction("TO_NUMBER",
            value,
            format);
    }

    toTimestamp(value?: Statement, format?: Statement) {
        return this.pushFunction("TO_TIMESTAMP",
            value,
            format);
    }

    timezone(zone?: Statement, source?: Statement) {
        return this.pushFunction("TIMEZONE",
            zone,
            source);
    }

    atTimeZone(source: Statement, zone: Statement) {
        const resolvedSource = this.resolveStatement(source);
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
        const resolvedSource = this.resolveIdentifierStatement(source);
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
        const resolvedSource = this.resolveStatement(source);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource, "AT", "LOCAL");
        }
        return this;
    }

    atLocalIdentifier(source: Statement) {
        const resolvedSource = this.resolveIdentifierStatement(source);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource, "AT", "LOCAL");
        }
        return this;
    }

    makeDate(year?: Statement, month?: Statement, day?: Statement) {
        return this.pushFunction("MAKE_DATE",
            year,
            month,
            day);
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
            years,
            months,
            weeks,
            days,
            hours,
            mins,
            secs);
    }

    makeTime(hours?: Statement, minutes?: Statement, seconds?: Statement) {
        return this.pushFunction("MAKE_TIME",
            hours,
            minutes,
            seconds);
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
            year,
            month,
            day,
            hours,
            minutes,
            seconds);
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
            year,
            month,
            day,
            hours,
            minutes,
            seconds);
    }

    pgSleep(seconds?: Statement) {
        return this.pushFunction("PG_SLEEP",
            seconds);
    }

    pgSleepFor(interval?: Statement) {
        return this.pushFunction("PG_SLEEP_FOR",
            interval);
    }

    pgSleepUntil(timestamp?: Statement) {
        return this.pushFunction("PG_SLEEP_UNTIL", timestamp);
    }

    override currentTime(precision?: Statement) {
        if (precision === undefined || precision === null) {
            return super.currentTime();
        }
        return this.pushFunction("CURRENT_TIME",
            precision);
    }

    override currentTimestamp(precision?: Statement) {
        if (precision === undefined || precision === null) {
            return super.currentTimestamp();
        }
        return this.pushFunction("CURRENT_TIMESTAMP",
            precision);
    }

    override localtime(precision?: Statement) {
        if (precision === undefined || precision === null) {
            return super.localtime();
        }
        return this.pushFunction("LOCALTIME",
            precision);
    }

    override localtimestamp(precision?: Statement) {
        if (precision === undefined || precision === null) {
            return super.localtimestamp();
        }
        return this.pushFunction("LOCALTIMESTAMP",
            precision);
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
