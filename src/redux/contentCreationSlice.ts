import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentCreationState {
    status: 'initial' | 'loading' | 'editing' | 'approved' | 'posted';
    progress: number;   // Progreso de la creación (0 - 100)
    content: string;    // Contenido generado por el modelo
}

const initialState: ContentCreationState = {
    status: 'initial',
    progress: 0,
    content: '',
};

const contentCreationSlice = createSlice({
    name: 'contentCreation',
    initialState,
    reducers: {
        startCreation: (state) => {
            state.status = 'loading';
            state.progress = 0;
            state.content = '';
        },
        setCreationProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload;
        },
        finishLoading: (state, action: PayloadAction<string>) => {
            // Una vez que el modelo haya terminado de generar el contenido:
            state.status = 'editing';
            state.progress = 100;
            state.content = action.payload;
        },
        updateContent: (state, action: PayloadAction<string>) => {
            // Permite editar el contenido generado, solo si estamos en "editing"
            if (state.status === 'editing') {
                state.content = action.payload;
            }
        },
        approveContent: (state) => {
            // Cambiamos el estado a "approved" para indicar que el contenido está listo para ser publicado
            if (state.status === 'editing') {
                state.status = 'approved';
            }
        },
        postContent: (state) => {
            // Una vez que el contenido esté aprobado, se marca como posteado
            if (state.status === 'approved') {
                state.status = 'posted';
            }
        },
        resetCreation: (state) => {
            // Regresa todo a estado inicial
            state.status = 'initial';
            state.progress = 0;
            state.content = '';
        },
    },
});

export const {
    startCreation,
    setCreationProgress,
    finishLoading,
    updateContent,
    approveContent,
    postContent,
    resetCreation,
} = contentCreationSlice.actions;

export default contentCreationSlice.reducer;


