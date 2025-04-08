"use client";
import { useEffect, useRef, useState } from "react";
import "../_css/shopping-list.css";

const getItems = async (prefix: string): Promise<string[] | undefined> => {
  try {
    const result = await fetch(
      `https://api.frontendeval.com/fake/food/${prefix}`
    );

    if (!result.ok || result.status !== 200) return;
    const json = (await result.json().catch(() => [])) as string[];

    return json;
  } catch (error) {
    console.log(error);
    return;
  }
};

interface ShoppingListItemT {
  item: string;
  onClick?: () => void;
  onX?: () => void;
}
const ShoppingListItem = ({ item, onX }: ShoppingListItemT) => {
  const [checkedState, setCheckedState] = useState<boolean>(false);
  return (
    <div className={`shopping-list-item ${checkedState ? "checked" : ""}`}>
      <span className="item-checkbox">
        <input
          type="checkbox"
          onChange={(e) => {
            setCheckedState(e.target.checked);
          }}
        />
        <span className="item-value">{item}</span>
      </span>
      <button onClick={onX} className="x">
        X
      </button>
    </div>
  );
};

export default function ShoppingList() {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inputState, setInputState] = useState<string>("");
  const [searchItemsState, setSearchItemsState] = useState<string[]>([]);
  const [shoppingItemsState, setShoppingItemsState] = useState<string[]>([]);
  const [displaySearchState, setDisplaySearchState] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inputState.length === 0) {
      setSearchItemsState([]);
      setDisplaySearchState(false);
      return;
    }
    setDisplaySearchState(true);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(async () => {
      const items = await getItems(inputState);
      if (!items) return;

      setSearchItemsState(items);
    }, 500);
  }, [inputState]);

  const updateShoppingList = (ind: number) => () => {
    setShoppingItemsState((prev) => [
      ...prev.slice(0, ind),
      ...prev.slice(ind + 1),
    ]);
  };

  return (
    <div className="shopping-main">
      <div
        tabIndex={0}
        onFocus={() => {
          setDisplaySearchState(true);
        }}
        onBlur={() => {
          setDisplaySearchState(false);
        }}
        ref={searchRef}
        className="shopping-search"
      >
        <input
          className="search-input"
          type="text"
          onChange={(e) => {
            setInputState(e.target.value);
          }}
        />
        <div
          className={`search-list-main ${!displaySearchState ? "hide" : ""}`}
        >
          {searchItemsState.map((s, ind) => (
            <div
              className="search-list-item"
              key={ind}
              onClick={() => {
                setShoppingItemsState((prev) => [...prev, s]);
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="shopping-list">
        {shoppingItemsState.map((s, ind) => (
          <ShoppingListItem
            key={`shop-${ind}`}
            item={s}
            onX={updateShoppingList(ind)}
          />
        ))}
      </div>
    </div>
  );
}
