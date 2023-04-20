// Main file for api calls
// https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//  fetchBaseQuery is a factory function that generates a data fetching
// method compatible with RTK Query's "baseQuery" configuration option.
// It takes all standard options from fetch's RequestInit interface, as well as "baseUrl", a "prepareHeaders" function, an optional "fetch" function, a "paramsSerializer" function, and a "timeout".

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi', // <--

  baseQuery: fetchBaseQuery({
    // base url that will have different endpoints,
    // Set the baseUrl for every endpoint below
    baseUrl: process.env.RAPID_API_BASE_URL, //  <-most likely always specify baseUrl
    // prepareHeaders (optional)
    // Allows you to inject headers on every request. You can specify headers at the endpoint level, but you'll typically want to set common headers like authorization here
    // Additionally, it provides access to extra, endpoint, type, and forced to unlock more granular conditional behaviors.
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', process.env.RAPID_API_KEY);
      // returning headers after setting a specific property
      return headers;
    },
  }),
  // below the basequer add the endpoints, we get 'builder'(object we're passing) bexause we are building
  // all the endpoints of the API we want to call..
  // Redux toolkit allows us to call the endpoints as hooks(aka getTopCharts), based on query, they most get exported below
  endpoints: (builder) => ({
    // redux toolkit allows us to call this as a hook,
    // Will make a request like https://shazam-core.p.rapidapi.com/v1/charts/world
    getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
    getSongsByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
    getSongDetails: builder.query({ query: ({ songid }) => `v1/tracks/details?track_id=${songid}` }),
    getSongRelated: builder.query({ query: ({ songid }) => `v1/tracks/related?track_id=${songid}` }),
    // dont need to destructure parameter because it's going to be passed automatically..
    getArtistDetails: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}` }),
    // this country code comes from geoapify
    getSongsByCountry: builder.query({ query: (countryCode) => `v1/charts/country?country_code=${countryCode}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
