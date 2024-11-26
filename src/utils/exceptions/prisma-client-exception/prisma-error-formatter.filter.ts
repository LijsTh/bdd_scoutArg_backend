import { Prisma } from '@prisma/client';

export class PrismaErrorFormatter {
    private exception: Prisma.PrismaClientKnownRequestError;

    constructor(exception: Prisma.PrismaClientKnownRequestError) {
        this.exception = exception;
    }

    getFriendlyMessage(): string {
        switch (this.exception.code) {
            case 'P2001': {
                const { model_name, argument_name, argument_value } = this.exception.meta || {};
                return `The record searched for in the condition (${model_name}.${argument_name} = ${argument_value}) does not exist.`;
            }
            case 'P2002': {
                const constraint = this.exception.meta?.target || 'constraint';
                return `This ${constraint} already exists.`;
            }
            case 'P2003': {
                const field_name = this.exception.meta?.field_name || 'unknown field';
                return `Foreign key constraint failed on the field: ${field_name}.`;
            }
            case 'P2004': {
                const database_error = this.exception.meta?.database_error || 'unknown database error';
                return `A constraint failed on the database: ${database_error}.`;
            }
            case 'P2005': {
                const { field_value, field_name } = this.exception.meta || {};
                return `The value '${field_value}' stored in the database for the field '${field_name}' is invalid for its type.`;
            }
            case 'P2006': {
                const { field_value, model_name, field_name } = this.exception.meta || {};
                return `The provided value '${field_value}' for ${model_name} field '${field_name}' is not valid.`;
            }
            case 'P2007': {
                const database_error = this.exception.meta?.database_error || 'data validation error';
                return `Data validation error: ${database_error}.`;
            }
            case 'P2008': {
                const { query_parsing_error, query_position } = this.exception.meta || {};
                return `Failed to parse the query: ${query_parsing_error} at position ${query_position}.`;
            }
            case 'P2009': {
                const { query_validation_error, query_position } = this.exception.meta || {};
                return `Failed to validate the query: ${query_validation_error} at position ${query_position}.`;
            }
            case 'P2010': {
                const { code, message } = this.exception.meta || {};
                return `Raw query failed. Code: ${code}. Message: ${message}.`;
            }
            case 'P2011': {
                const constraint = this.exception.meta?.constraint || 'unknown constraint';
                return `Null constraint violation on the ${constraint}.`;
            }
            case 'P2012': {
                const path = this.exception.meta?.path || 'unknown path';
                return `Missing a required value at ${path}.`;
            }
            case 'P2013': {
                const { argument_name, field_name, object_name } = this.exception.meta || {};
                return `Missing the required argument '${argument_name}' for field '${field_name}' on '${object_name}'.`;
            }
            case 'P2014': {
                const { relation_name, model_a_name, model_b_name } = this.exception.meta || {};
                return `The change violates the required relation '${relation_name}' between the '${model_a_name}' and '${model_b_name}' models.`;
            }
            case 'P2015': {
                const details = this.exception.meta?.details || 'unknown details';
                return `A related record could not be found. ${details}`;
            }
            case 'P2016': {
                const details = this.exception.meta?.details || 'query interpretation error';
                return `Query interpretation error. ${details}`;
            }
            case 'P2017': {
                const relation_name = this.exception.meta?.relation_name || 'unknown relation';
                return `The records for relation '${relation_name}' are not connected.`;
            }
            case 'P2018': {
                const details = this.exception.meta?.details || 'required connected records not found';
                return `The required connected records were not found. ${details}`;
            }
            case 'P2019': {
                const details = this.exception.meta?.details || 'input error';
                return `Input error. ${details}`;
            }
            case 'P2020': {
                const details = this.exception.meta?.details || 'value out of range';
                return `Value out of range for the type. ${details}`;
            }
            case 'P2021': {
                const table = this.exception.meta?.table || 'unknown table';
                return `The table '${table}' does not exist in the current database.`;
            }
            case 'P2022': {
                const column = this.exception.meta?.column || 'unknown column';
                return `The column '${column}' does not exist in the current database.`;
            }
            case 'P2023': {
                const message = this.exception.meta?.message || 'inconsistent column data';
                return `Inconsistent column data: ${message}`;
            }
            case 'P2024': {
                const { timeout, connection_limit } = this.exception.meta || {};
                return `Timed out fetching a new connection from the connection pool. Timeout: ${timeout}, Connection Limit: ${connection_limit}.`;
            }
            case 'P2025': {
                const cause = this.exception.meta?.cause || 'record not found';
                const model_name = this.exception.meta?.modelName || 'unknown model';
                console.log(this.exception.meta);
                return `Record: ${model_name} not found. ${cause}`;
            }
            case 'P2026': {
                const feature = this.exception.meta?.feature || 'unsupported feature';
                return `The current database provider doesn't support this feature: ${feature}.`;
            }
            case 'P2027': {
                const errors = this.exception.meta?.errors || 'multiple errors';
                return `Multiple errors occurred on the database during query execution: ${errors}.`;
            }
            case 'P2028': {
                const error = this.exception.meta?.error || 'transaction API error';
                return `Transaction API error: ${error}`;
            }
            case 'P2029': {
                const message = this.exception.meta?.message || 'query parameter limit exceeded';
                return `Query parameter limit exceeded: ${message}`;
            }
            case 'P2030': {
                return `Cannot find a fulltext index for the search. Try adding a @@fulltext([Fields...]) to your schema.`;
            }
            case 'P2031': {
                return `Prisma needs MongoDB to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set`;
            }
            case 'P2033': {
                return `A number in the query does not fit into a 64-bit signed integer. Consider using BigInt for large integers.`;
            }
            case 'P2034': {
                return `Transaction failed due to a write conflict or deadlock. Please retry your transaction.`;
            }
            case 'P2035': {
                const database_error = this.exception.meta?.database_error || 'assertion violation';
                return `Assertion violation on the database: ${database_error}.`;
            }
            case 'P2036': {
                const id = this.exception.meta?.id || 'unknown external connector';
                return `Error in external connector (id: ${id}).`;
            }
            case 'P2037': {
                const message = this.exception.meta?.message || 'too many connections';
                return `Too many database connections opened: ${message}.`;
            }
            default: {
                return 'An unexpected error occurred.';
            }
        }
    }

    getFriendlyTitle(): string {
        const titleMap: Record<string, string> = {
            P2001: 'Record not found in condition',
            P2002: 'Unique constraint violation',
            P2003: 'Foreign key constraint violation',
            P2004: 'Database constraint violation',
            P2005: 'Invalid field value in database',
            P2006: 'Invalid field value provided',
            P2007: 'Data validation error',
            P2008: 'Query parsing error',
            P2009: 'Query validation error',
            P2010: 'Raw query execution error',
            P2011: 'Null constraint violation',
            P2012: 'Missing required value',
            P2013: 'Missing required argument',
            P2014: 'Relation constraint violation',
            P2015: 'Related record not found',
            P2016: 'Query interpretation error',
            P2017: 'Relation connection error',
            P2018: 'Required connected records not found',
            P2019: 'Input error',
            P2020: 'Value out of range',
            P2021: 'Table does not exist',
            P2022: 'Column does not exist',
            P2023: 'Inconsistent column data',
            P2024: 'Connection pool timeout',
            P2025: 'Required records not found',
            P2026: 'Unsupported database feature',
            P2027: 'Multiple database errors',
            P2028: 'Transaction API error',
            P2029: 'Query parameter limit exceeded',
            P2030: 'Missing fulltext index',
            P2031: 'MongoDB replica set required',
            P2033: '64-bit integer overflow',
            P2034: 'Transaction conflict or deadlock',
            P2035: 'Assertion violation',
            P2036: 'External connector error',
            P2037: 'Too many database connections',
        };
        return titleMap[this.exception.code] || 'Unexpected database error';
    }
}
