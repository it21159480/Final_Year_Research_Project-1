// /src/store/actions.ts
export const ADD_IMAGE = 'ADD_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const SET_PEST_MANAGEMENT = 'SET_PEST_MANAGEMENT';

export const addImage = (imageUrl: string) => ({
  type: ADD_IMAGE,
  payload: imageUrl,
});

export const removeImage = (imageUrl: string) => ({
  type: REMOVE_IMAGE,
  payload: imageUrl,
});

export const setPestManagement = (details: {
  pestType: string;
  treatment: string;
  status: string;
}) => ({
  type: SET_PEST_MANAGEMENT,
  payload: details,
});
