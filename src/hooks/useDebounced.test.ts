import { act, renderHook } from "@testing-library/react";
import { useDebounced } from "./useDebounced";

import { expect, test, vi } from "vitest";

vi.useFakeTimers();

test("useDebounced", async () => {
  const { result, rerender } = renderHook((props) => useDebounced(props, 10), {
    initialProps: "test",
  });

  act(() => rerender("test1"));
  act(() => rerender("test12"));

  expect(result.current).toBe("test");

  await act(async () => await vi.advanceTimersByTimeAsync(15));

  expect(result.current).toBe("test12");
});
