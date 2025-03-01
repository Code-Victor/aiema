import React from "react";
import { StackProps, XStack, YStack } from "./stacks";
export function Grid<T>({
  data,
  renderItem,
  keyExtractor,
  cols = 2,
  gapX = "4",
  gapY = "6",
  expanded = false,
}: {
  data: T[];
  renderItem: (item: T, i: number) => React.ReactNode;
  keyExtractor?: (item: T, def: string) => string;
  cols?: number;
  gapX?: StackProps["gap"];
  gapY?: StackProps["gap"];
  expanded?: boolean;
}) {
  const rows = Math.ceil(data.length / cols);

  return (
    <YStack
      gap={gapY}
      f={expanded ? "1" : undefined}
      style={{
        width: "100%",
      }}
    >
      {[...Array(rows)].map((_, i) => (
        <XStack
          gap={gapX}
          key={i}
          f={expanded ? "1" : undefined}
          style={{
            flex: 1,
          }}
        >
          {data.slice(i * cols, (i + 1) * cols).map((item, j) => (
            <React.Fragment
              key={keyExtractor ? keyExtractor(item, `${i}-${j}`) : `${i}-${j}`}
            >
              {renderItem(item, i * cols + j)}
            </React.Fragment>
          ))}
        </XStack>
      ))}
    </YStack>
  );
}
