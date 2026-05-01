import { describe, it, expect } from "vitest"
import { z } from "zod"

function isValidBranchName(name: string): boolean {
	for (let i = 0; i < name.length; i++) {
		const code = name.charCodeAt(i)
		if (code <= 0x1f || code === 0x7f) return false
	}
	if (/[~^:?*[\]\\;&|`$()]/.test(name)) return false
	return true
}

describe("branch name validation", () => {
	it("accepts valid branch names", () => {
		expect(isValidBranchName("feature/dark-mode")).toBe(true)
		expect(isValidBranchName("bugfix/1234")).toBe(true)
		expect(isValidBranchName("main")).toBe(true)
	})

	it("rejects control characters", () => {
		expect(isValidBranchName("feature\x00test")).toBe(false)
		expect(isValidBranchName("feature\x1ftest")).toBe(false)
		expect(isValidBranchName("feature\x7ftest")).toBe(false)
	})

	it("rejects invalid git ref characters", () => {
		expect(isValidBranchName("feature~")).toBe(false)
		expect(isValidBranchName("feature^")).toBe(false)
		expect(isValidBranchName("feature?")).toBe(false)
		expect(isValidBranchName("feature:")).toBe(false)
		expect(isValidBranchName("feature[")).toBe(false)
	})

	it("rejects shell metacharacters", () => {
		expect(isValidBranchName("feature&test")).toBe(false)
		expect(isValidBranchName("feature|test")).toBe(false)
		expect(isValidBranchName("feature$test")).toBe(false)
		expect(isValidBranchName("feature`test")).toBe(false)
		expect(isValidBranchName("feature()test")).toBe(false)
	})

	it("rejects backslash", () => {
		expect(isValidBranchName("feature\\test")).toBe(false)
	})
})