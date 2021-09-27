import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, TDispatch } from './store';

export const useAppDispatch = () => useDispatch<TDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;