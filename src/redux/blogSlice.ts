// redux/blogSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Article, CategoryType, TagType } from "@/types/Blog";

// Define el tipo para el estado de blog
interface BlogState {
  articles: Article[];
  categories: CategoryType[];
  tags: TagType[]; // Asegúrate de que coincida con el tipo de datos de tu API
  loadingArticles: boolean;
  loadingCategories: boolean;
  loadingTags: boolean;
  errorArticles: string | null;
  errorCategories: string | null;
  errorTags: string | null;
}

// Estado inicial
const initialState: BlogState = {
  articles: [],
  categories: [],
  tags: [], // Agregamos tags
  loadingArticles: false,
  loadingCategories: false,
  loadingTags: false, // Estado de carga para tags
  errorArticles: null,
  errorCategories: null,
  errorTags: null, // Estado de error para tags
};

// Async thunk para obtener artículos
export const fetchArticles = createAsyncThunk<
  Article[],
  void,
  { rejectValue: string }
>("blog/fetchArticles", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://backend-pandorai-960512295965.europe-west6.run.app/articles/articles`
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(
      (err as Error).message || "An error occurred while fetching articles"
    );
  }
});

// Async thunk para obtener categorías
export const fetchCategories = createAsyncThunk<
  CategoryType[],
  void,
  { rejectValue: string }
>("blog/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://backend-pandorai-960512295965.europe-west6.run.app/category/categories`
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(
      (err as Error).message || "An error occurred while fetching categories"
    );
  }
});

export const fetchTags = createAsyncThunk<
  TagType[], // Cambia el tipo según la estructura de los datos de tags
  void,
  { rejectValue: string }
>("blog/fetchTags", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://backend-pandorai-960512295965.europe-west6.run.app/tag/tags`
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(
      (err as Error).message || "An error occurred while fetching tags"
    );
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearArticles(state) {
      state.articles = [];
      state.errorArticles = null;
      state.loadingArticles = false;
    },
    clearCategories(state) {
      state.categories = [];
      state.errorCategories = null;
      state.loadingCategories = false;
    },
    clearTags(state) {
      // Reducer para limpiar tags
      state.tags = [];
      state.errorTags = null;
      state.loadingTags = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers para fetchArticles
      .addCase(fetchArticles.pending, (state) => {
        state.loadingArticles = true;
        state.errorArticles = null;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.loadingArticles = false;
          state.articles = action.payload;
        }
      )
      .addCase(
        fetchArticles.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loadingArticles = false;
          state.errorArticles = action.payload || null;
        }
      )

      // Reducers para fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCategories = true;
        state.errorCategories = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<CategoryType[]>) => {
          state.loadingCategories = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loadingCategories = false;
          state.errorCategories = action.payload || null;
        }
      )
      .addCase(fetchTags.pending, (state) => {
        state.loadingTags = true;
        state.errorTags = null;
      })
      .addCase(
        fetchTags.fulfilled,
        (state, action: PayloadAction<TagType[]>) => {
          state.loadingTags = false;
          state.tags = action.payload;
        }
      )
      .addCase(
        fetchTags.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loadingTags = false;
          state.errorTags = action.payload || null;
        }
      );
  },
});

export const { clearArticles, clearCategories, clearTags } = blogSlice.actions;
export default blogSlice.reducer;
