import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '.';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
