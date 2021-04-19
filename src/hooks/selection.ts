import { useCallback, useState } from 'react';

export const useSingleSelection = <T extends any>(
	init?: T
): [T | undefined, (newSelection: T | undefined) => void] => {
	const [selected, setSelected] = useState<T | undefined>(init);

	const updateSelected = (newSelection: T | undefined) => {
		if (selected === newSelection) {
			setSelected(undefined);
		} else {
			setSelected(newSelection);
		}
	};

	return [selected, updateSelected];
};

export const useMultiSelection = <T extends any>(
	init: T[]
): [Set<T>, (newSelection: T) => void, (item: T) => boolean, () => void] => {
	const [selected, setSelected] = useState<Set<T>>(new Set(init));

	const updateSelected = useCallback(
		(newItem: T) => {
			if (selected.has(newItem)) {
				selected.delete(newItem);
				setSelected(new Set(selected));
			} else {
				selected.add(newItem);
				setSelected(new Set(selected));
			}
		},
		[selected]
	);

	const clearSelected = () => {
		setSelected(new Set());
	};

	const isSelected = useCallback((item: T) => selected.has(item), [selected]);

	return [selected, updateSelected, isSelected, clearSelected];
};
