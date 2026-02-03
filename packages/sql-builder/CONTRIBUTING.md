# Contributing to @gntrees/sql-builder

Thank you for your interest in contributing! This document explains how to contribute effectively.

## Development Setup

### Prerequisites
- Bun runtime (v1.2.20 or later)
- TypeScript

### Installation
```bash
git clone <repo-url>
cd gntrees-sql-builder
cd packages/sql-builder
bun install
```

### Running Tests
```bash
# All tests
bun test src/tests/*.test.ts

# Specific category
bun test src/tests/math-functions.test.ts
```

## Adding New PostgreSQL Functions

### Step-by-Step Guide

1. **Choose the Right Location**
   - Functions belong in category-specific files: `override-{category}-functions.ts`
   - Categories: uuid, textsearch, string, network, math, geometry, enum, date-time, json, xml, sequence

2. **Create the Function Method**
   ```typescript
   // src/override-{category}-functions.ts
   export class {Category}FunctionBuilder extends {ParentBuilder} {
       functionName(arg1?: StatementValue, arg2?: StatementValue) {
           return this.pushFunction("FUNCTION_NAME", [arg1, arg2]);
       }
   }
   ```

3. **Update Generator Configuration**
   - Add to `parentFiles` array in `src/extract.ts`:
   ```typescript
   { file: 'override-{category}-functions.ts', class: '{Category}FunctionBuilder' }
   ```

4. **Regenerate QueryInstance**
   ```bash
   bun run generate
   ```

5. **Write Tests**
   - Create `src/tests/{category}-functions.test.ts`
   - Test both SQL output and parameter handling

6. **Verify**
   ```bash
   bun test src/tests/{category}-functions.test.ts
   ```

### Example: Adding a New Function

Suppose we want to add `array_length` function:

**1. Add to `src/override-math-functions.ts`:**
```typescript
arrayLength(array?: StatementValue, dimension?: StatementValue) {
    return this.pushFunction("ARRAY_LENGTH", [array, dimension]);
}
```

**2. Run generator:**
```bash
bun run generate
```

**3. Add tests to `src/tests/math-functions.test.ts`:**
```typescript
it("builds array_length", () => {
    const builder = q.select(q.arrayLength("my_array", 1));
    expect(builder.getSql()).toBe("SELECT ARRAY_LENGTH($1, $2)");
    expect(builder.getParameters()).toEqual(["my_array", 1]);
});
```

## Inheritance Structure

The query builder uses layered inheritance. Each function builder extends the previous one:

```
CoreQueryBuilder -> BaseRawQueryBuilder -> BaseQueryBuilder (auto-generated)
-> DateTimeFunctionBuilder -> EnumFunctionBuilder -> GeometryFunctionBuilder
-> MathFunctionBuilder -> NetworkFunctionBuilder -> JSONFunctionBuilder
-> XMLFunctionBuilder -> UUIDFunctionBuilder -> TextSearchFunctionBuilder
-> StringFunctionBuilder -> SequenceFunctionBuilder
-> OverrideQueryBuilder -> QueryBuilder
```

When adding a new function category, insert it at the appropriate position in the chain.

## Commit Message Conventions

Use [conventional commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
- `feat(sequence): add nextval and setval functions`
- `fix(json): correct parameter order in jsonb_build_object`
- `docs: update contributing guidelines`
- `test(geometry): add tests for circle functions`

## Pull Request Process

1. **Fork** the repository
2. **Branch** from `main` with descriptive name: `feat/sequence-functions`
3. **Commit** with conventional commit messages
4. **Test** locally: `bun test src/tests/*.test.ts`
5. **Push** to your fork
6. **Create PR** with:
   - Descriptive title following commit convention
   - Description explaining the "why" and "what"
   - Link to related issues
   - Screenshots for UI changes (if applicable)

## PR Review Checklist

Reviewers will check:
- [ ] Tests pass locally
- [ ] New functions have test coverage
- [ ] Documentation updated (CLAUDE.md, README.md if needed)
- [ ] Generated files regenerated (`bun run generate`)
- [ ] Commit messages follow conventions
- [ ] No unnecessary changes (formatting only, etc.)
- [ ] TypeScript strict mode compliance

## Code Style

- 4 spaces for indentation
- Semicolons required
- Use `override` keyword for overridden methods
- Minimal comments (code should be self-documenting)
- ASCII unless file already contains non-ASCII

## Questions?

Open an issue or start a discussion. We're happy to help!
