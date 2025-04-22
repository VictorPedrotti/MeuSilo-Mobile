import React, { forwardRef, ReactElement } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance, CarouselRenderItem } from 'react-native-reanimated-carousel';

interface Props<T> {
  data: T[];
  renderItem: CarouselRenderItem<T>;
  width: number;
  height?: number;
}

const CarrosselSilos = forwardRef<ICarouselInstance, Props<any>>(
  ({ data, renderItem, width, height = 200 }, ref) => {
    return (
      <Carousel
        ref={ref}
        loop
        width={width}
        height={height}
        data={data}
        renderItem={renderItem}
      />
    );
  }
);

export default CarrosselSilos;