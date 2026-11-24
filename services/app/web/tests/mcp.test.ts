import { expect, test } from "bun:test";
import { createApp } from "../src/app";

const app = createApp();

test.each([
	["tools/call", null],
	["initialize", []],
	["tools/list", "not an object"],
])("%s rejects non-object params", async (method, params) => {
	const response = await app.request("/mcp", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ jsonrpc: "2.0", id: 7, method, params }),
	});

	expect(response.status).toBe(200);
	expect(await response.json()).toEqual({
		jsonrpc: "2.0",
		id: 7,
		error: { code: -32602, message: "Invalid params" },
	});
});
