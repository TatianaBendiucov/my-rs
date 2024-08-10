import { itemReducer, addOrRemove, removeAll } from "../app/store/itemReducer";
import { SearchResult } from "../app/types/SearchTypes";

describe("itemReducer", () => {
  const initialState: { values: SearchResult[] } = {
    values: [],
  };

  const sampleItem: SearchResult = {
    uid: "1",
    name: "Test Item",
    earthAnimal: "true",
  };

  it("should return the initial state", () => {
    expect(itemReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addOrRemove - add item", () => {
    const action = addOrRemove(sampleItem);
    const state = itemReducer(initialState, action);
    expect(state.values).toContainEqual(sampleItem);
  });

  it("should handle addOrRemove - remove item", () => {
    const stateWithItem = { values: [sampleItem] };
    const action = addOrRemove(sampleItem);
    const state = itemReducer(stateWithItem, action);
    expect(state.values).not.toContainEqual(sampleItem);
  });

  it("should handle removeAll", () => {
    const stateWithItems = {
      values: [sampleItem, { ...sampleItem, uid: "2" }],
    };
    const action = removeAll();
    const state = itemReducer(stateWithItems, action);
    expect(state.values).toEqual([]);
  });
});
