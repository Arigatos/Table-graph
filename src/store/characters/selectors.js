import { createSelector } from "@reduxjs/toolkit";

const selectCharactersData = (state) => state.charactersReducer;

export const selectIsLoading = createSelector(
  selectCharactersData,
  (data) => data.loading
);

export const selectCharacters = createSelector(
  selectCharactersData,
  (characters) => characters.characters
);

export const selectTotalPages = createSelector(
  selectCharactersData,
  (characters) => characters.totalPages
);

export const selectPerPage = createSelector(
  selectCharactersData,
  (characters) => characters.count
);

export const selectNextPage = createSelector(
  selectCharactersData,
  (characters) => characters?.nextPage
);

export const selectPeviousPage = createSelector(
  selectCharactersData,
  (characters) => characters?.previousPage
);

export const selectPieChartData = createSelector(
  selectCharacters,
  (characters) =>
    characters
      ?.map((character) => {
        return {
          name: character?.name,
          y: character?.films?.length || 0,
          films: character?.films?.map((f) => f),
        };
      })
      ?.filter((char) => char.y !== 0)
);
