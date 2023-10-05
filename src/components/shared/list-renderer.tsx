import React, { ComponentType, Fragment, ReactNode } from 'react';

interface Props<ItemType> {
  items: ItemType[];
  renderItem: React.ComponentType<{ item: ItemType }>;
  divider: React.ComponentType;
}

export function RenderWithDividers<ItemType>({
  items,
  renderItem: ItemComponent,
  divider: DividerComponent,
}: Props<ItemType>) {
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ItemComponent item={item} />
          {index < items.length - 1 && <DividerComponent />}
        </React.Fragment>
      ))}
    </>
  );
}
