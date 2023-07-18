import { vi } from "vitest";
import * as M from "../useIntersectedViewport";

const mocked: typeof M.default = () => ({
  hasIntersected: true,
  ref: { current: null },
});

const useIntersectedViewport = vi.fn(mocked);

export default useIntersectedViewport;
