'use client';

import Dropdown, { DropdownProps } from '@/components/dropdown';
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const dropdownProps: { [key: string]: DropdownProps } = {
  roastLevel: {
    options: [
      { label: '全部烘焙度', value: 'all' },
      { label: '淺焙', value: 'light' },
      { label: '中焙', value: 'medium' },
      { label: '中深焙', value: 'medium-dark' },
      { label: '深焙', value: 'dark' },
    ],
    variant: 'outline',
    type: 'click',
    style: {
      width: 'min-w-[134px]',
    },
  },
  origin: {
    options: [
      { label: '全部產地', value: 'all' },
      { label: '混合', value: 'blend' },
      { label: '單一品種', value: 'single-origin' },
    ],
    variant: 'outline',
    type: 'click',
    style: {
      width: 'min-w-[118px]',
    },
  },
  sortBy: {
    options: [
      { label: '按字母, A-Z', value: 'alphabetical-a-z' },
      { label: '按字母, Z-A', value: 'alphabetical-z-a' },
      { label: '價格, 從低至高', value: 'price-lowest-to-highest' },
      { label: '價格, 從高至低', value: 'price-highest-to-lowest' },
      { label: '日期, 從舊至新', value: 'date-oldest-to-newest' },
      { label: '日期, 從新至舊', value: 'date-newest-to-oldest' },
    ],
    variant: 'outline',
    type: 'click',
    style: {
      width: 'min-w-[159px]',
    },
  },
};

interface BeansFormInput {
  roastLevel: string;
  origin: string;
  sortBy: string;
}

export const ProductSearch = () => {
  const { control, watch } = useForm<BeansFormInput>({
    defaultValues: {
      roastLevel: 'all',
      origin: 'all',
      sortBy: 'alphabetical-a-z',
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log('beans subscription', value),
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form
      className="mb-8 flex w-full items-center justify-between"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex w-full items-center gap-3">
        <div className="flex min-w-[60px] items-center gap-1">
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
          <span className="min-w-[35px]">選擇:</span>
        </div>
        <Controller
          control={control}
          name="roastLevel"
          render={({ field: { value, onChange } }) => (
            <Dropdown
              {...dropdownProps['roastLevel']}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="origin"
          render={({ field: { value, onChange } }) => (
            <Dropdown
              {...dropdownProps['origin']}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        <div className="flex min-w-[60px] items-center gap-1">
          <Bars3BottomLeftIcon className="h-6 w-6" />
          <span className="min-w-[40px]">排序:</span>
        </div>
        <Controller
          control={control}
          name="sortBy"
          render={({ field: { value, onChange } }) => (
            <Dropdown
              {...dropdownProps['sortBy']}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
    </form>
  );
};
