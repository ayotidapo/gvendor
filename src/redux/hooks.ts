import {
	useDispatch as useAppDispatch,
	useSelector as useAppSelector,
	useStore,
} from 'react-redux';
import type { RootState, AppDispatch, AppStore } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = useAppDispatch.withTypes<AppDispatch>();
export const useSelector = useAppSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
