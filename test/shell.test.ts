import { describe, it, expect } from "vitest"
import { escapeBash, escapeBatch, escapeAppleScript, assertShellSafe } from "../src/plugin/kdco-primitives/shell"

describe("shell escaping", () => {
	describe("assertShellSafe", () => {
		it("rejects null bytes", () => {
			expect(() => assertShellSafe("hello\x00world", "test")).toThrow("null bytes")
		})

		it("accepts normal strings", () => {
			expect(() => assertShellSafe("hello world", "test")).not.toThrow()
		})
	})

	describe("escapeBash", () => {
		it("escapes backslash", () => {
			expect(escapeBash("a\\b")).toBe("a\\\\b")
		})

		it("escapes double quotes", () => {
			expect(escapeBash('a"b')).toBe('a\\"b')
		})

		it("escapes dollar sign", () => {
			expect(escapeBash("$HOME")).toBe("\\$HOME")
		})

		it("escapes backticks", () => {
			expect(escapeBash("`cmd`")).toBe("\\`cmd\\`")
		})

		it("escapes exclamation mark", () => {
			expect(escapeBash("hello!")).toBe("hello\\!")
		})

		it("replaces newlines with spaces", () => {
			expect(escapeBash("hello\nworld")).toBe("hello world")
		})

		it("replaces carriage returns with spaces", () => {
			expect(escapeBash("hello\rworld")).toBe("hello world")
		})

		it("throws on null bytes", () => {
			expect(() => escapeBash("hello\x00world")).toThrow()
		})
	})

	describe("escapeAppleScript", () => {
		it("escapes backslash", () => {
			expect(escapeAppleScript("a\\b")).toBe("a\\\\b")
		})

		it("escapes double quotes", () => {
			expect(escapeAppleScript('a"b')).toBe('a\\"b')
		})

		it("replaces newlines with spaces", () => {
			expect(escapeAppleScript("hello\nworld")).toBe("hello world")
		})
	})

	describe("escapeBatch", () => {
		it("doubles percent signs", () => {
			expect(escapeBatch("100%")).toBe("100%%")
		})

		it("escapes carets", () => {
			expect(escapeBatch("a^b")).toBe("a^^b")
		})

		it("escapes ampersands", () => {
			expect(escapeBatch("a&b")).toBe("a^&b")
		})

		it("escapes less than", () => {
			expect(escapeBatch("a<b")).toBe("a^<b")
		})

		it("escapes greater than", () => {
			expect(escapeBatch("a>b")).toBe("a^>b")
		})

		it("escapes pipes", () => {
			expect(escapeBatch("a|b")).toBe("a^|b")
		})
	})
})