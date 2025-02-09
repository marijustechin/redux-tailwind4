import { createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IUser } from '../../../types/UsersType';

const initialState: IUser[] = [{ id: +nanoid(), name: 'Default user' }];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase();
  },
});

export const getAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
