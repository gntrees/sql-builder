"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFunctionBuilder = void 0;
const base_query_builder_1 = require("./generated/base-query-builder");
class DateTimeFunctionBuilder extends base_query_builder_1.BaseQueryBuilder {
    age(...args) {
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
    dateTrunc(unit, source) {
        return this.pushFunction("DATE_TRUNC", unit === undefined ? undefined : this.toLiteralValue(unit), source);
    }
    datePart(field, source) {
        return this.pushFunction("DATE_PART", field === undefined ? undefined : this.toLiteralValue(field), source);
    }
    dateBin(stride, source, origin) {
        return this.pushFunction("DATE_BIN", stride, source, origin);
    }
    dateAdd(timestamp, interval, timezone) {
        return this.pushFunction("DATE_ADD", timestamp, interval, timezone);
    }
    dateSubtract(timestamp, interval, timezone) {
        return this.pushFunction("DATE_SUBTRACT", timestamp, interval, timezone);
    }
    extract(field, source) {
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
    toChar(value, format) {
        return this.pushFunction("TO_CHAR", value, format === undefined ? undefined : this.toLiteralValue(format));
    }
    toDate(value, format) {
        return this.pushFunction("TO_DATE", value, format === undefined ? undefined : this.toLiteralValue(format));
    }
    toNumber(value, format) {
        return this.pushFunction("TO_NUMBER", value, format === undefined ? undefined : this.toLiteralValue(format));
    }
    toTimestamp(value, format) {
        return this.pushFunction("TO_TIMESTAMP", value, format === undefined ? undefined : this.toLiteralValue(format));
    }
    timezone(zone, source) {
        return this.pushFunction("TIMEZONE", zone === undefined ? undefined : this.toLiteralValue(zone), source);
    }
    atTimeZone(source, zone) {
        const resolvedSource = this.resolveStatement(source, 0);
        const resolvedZone = zone === undefined ? [] : [this.createLiteralParameter(zone)];
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
    atTimeZoneIdentifier(source, zone) {
        const resolvedSource = this.resolveIdentifierStatement(source, 0);
        const resolvedZone = zone === undefined ? [] : [this.createLiteralParameter(zone)];
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
    atLocal(source) {
        const resolvedSource = this.resolveStatement(source, 0);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource, "AT", "LOCAL");
        }
        return this;
    }
    atLocalIdentifier(source) {
        const resolvedSource = this.resolveIdentifierStatement(source, 0);
        if (resolvedSource.length > 0) {
            this.query.sql.push(...resolvedSource, "AT", "LOCAL");
        }
        return this;
    }
    makeDate(year, month, day) {
        return this.pushFunction("MAKE_DATE", year === undefined ? undefined : this.toLiteralValue(year), month === undefined ? undefined : this.toLiteralValue(month), day === undefined ? undefined : this.toLiteralValue(day));
    }
    makeInterval(years, months, weeks, days, hours, mins, secs) {
        return this.pushFunction("MAKE_INTERVAL", years === undefined ? undefined : this.toLiteralValue(years), months === undefined ? undefined : this.toLiteralValue(months), weeks === undefined ? undefined : this.toLiteralValue(weeks), days === undefined ? undefined : this.toLiteralValue(days), hours === undefined ? undefined : this.toLiteralValue(hours), mins === undefined ? undefined : this.toLiteralValue(mins), secs === undefined ? undefined : this.toLiteralValue(secs));
    }
    makeTime(hours, minutes, seconds) {
        return this.pushFunction("MAKE_TIME", hours === undefined ? undefined : this.toLiteralValue(hours), minutes === undefined ? undefined : this.toLiteralValue(minutes), seconds === undefined ? undefined : this.toLiteralValue(seconds));
    }
    makeTimestamp(year, month, day, hours, minutes, seconds) {
        return this.pushFunction("MAKE_TIMESTAMP", year === undefined ? undefined : this.toLiteralValue(year), month === undefined ? undefined : this.toLiteralValue(month), day === undefined ? undefined : this.toLiteralValue(day), hours === undefined ? undefined : this.toLiteralValue(hours), minutes === undefined ? undefined : this.toLiteralValue(minutes), seconds === undefined ? undefined : this.toLiteralValue(seconds));
    }
    makeTimestamptz(year, month, day, hours, minutes, seconds) {
        return this.pushFunction("MAKE_TIMESTAMPTZ", year === undefined ? undefined : this.toLiteralValue(year), month === undefined ? undefined : this.toLiteralValue(month), day === undefined ? undefined : this.toLiteralValue(day), hours === undefined ? undefined : this.toLiteralValue(hours), minutes === undefined ? undefined : this.toLiteralValue(minutes), seconds === undefined ? undefined : this.toLiteralValue(seconds));
    }
    pgSleep(seconds) {
        return this.pushFunction("PG_SLEEP", seconds === undefined ? undefined : this.toLiteralValue(seconds));
    }
    pgSleepFor(interval) {
        return this.pushFunction("PG_SLEEP_FOR", interval === undefined ? undefined : this.toLiteralValue(interval));
    }
    pgSleepUntil(timestamp) {
        return this.pushFunction("PG_SLEEP_UNTIL", timestamp);
    }
    currentTime(precision) {
        if (precision === undefined || precision === null) {
            return super.currentTime();
        }
        return this.pushFunction("CURRENT_TIME", precision === undefined ? undefined : this.toLiteralValue(precision));
    }
    currentTimestamp(precision) {
        if (precision === undefined || precision === null) {
            return super.currentTimestamp();
        }
        return this.pushFunction("CURRENT_TIMESTAMP", precision === undefined ? undefined : this.toLiteralValue(precision));
    }
    localtime(precision) {
        if (precision === undefined || precision === null) {
            return super.localtime();
        }
        return this.pushFunction("LOCALTIME", precision === undefined ? undefined : this.toLiteralValue(precision));
    }
    localtimestamp(precision) {
        if (precision === undefined || precision === null) {
            return super.localtimestamp();
        }
        return this.pushFunction("LOCALTIMESTAMP", precision === undefined ? undefined : this.toLiteralValue(precision));
    }
    isfinite(value) {
        return this.pushFunction("ISFINITE", value);
    }
    justifyDays(value) {
        return this.pushFunction("JUSTIFY_DAYS", value);
    }
    justifyHours(value) {
        return this.pushFunction("JUSTIFY_HOURS", value);
    }
    justifyInterval(value) {
        return this.pushFunction("JUSTIFY_INTERVAL", value);
    }
}
exports.DateTimeFunctionBuilder = DateTimeFunctionBuilder;
