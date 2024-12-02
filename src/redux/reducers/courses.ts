import { bindActionCreators, createSlice, current } from '@reduxjs/toolkit';

// export interface ICourse {
// 	categories: string[];
// 	createdAt: string;
// 	description: string;
// 	contents?: IContent[];
// 	level: string;
// 	paid: false;
// 	published: boolean;
// 	thumbnail: { id: string; url: string; key: string };
// 	title: string;
// 	updatedAt: string;
// 	[key: string]: any;
// }

interface IState {
	courses: string;
	bookmarkCourses: any[];
}

const initialState: IState = {
	courses: 'Ade',
	bookmarkCourses: [],
};

export const courseSlice = createSlice({
	name: 'courses',

	initialState,

	reducers: {
		// setCourses(state: IState, action) {
		// 	state.courses = [...action.payload];
		// },
		// updateCourses(state, action) {
		// 	const courses = state.courses;

		// 	const courseIndex = courses?.findIndex(
		// 		(course: any) => course.id === action.payload?.courseId
		// 	);

		// 	if (courseIndex > -1) {
		// 		courses[courseIndex].bookmark = action.payload?.bookmark;
		// 	}
		// 	state.bookmarkCourses.filter(
		// 		(course: any) => course.id !== action.payload?.courseId
		// 	);
		// },
		setBookMarkCourses(state, action) {
			state.bookmarkCourses = [...action.payload];
		},
	},

	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		const coursesData = action?.payload?.courses;
	// 		// console.log({coursesData})
	// 		// console.log('ak',current(state),'akin',action.payload.courses.bookmarkCourses)
	// 		if (coursesData?.courses?.length >= 0)
	// 			state.courses = coursesData?.courses;
	// 		if (coursesData?.bookmarkCourses?.length >= 0)
	// 			state.bookmarkCourses = coursesData?.bookmarkCourses;

	// 		// state.courses=action.payload.courses.courses
	// 		return state;
	// 	},
	// },
});

export const { setBookMarkCourses } = courseSlice.actions;
export default courseSlice.reducer;

//N.B Inside hydrate action.payload.['sliceReducerName'] === or represents state(store)
// and the it takes the initialState of SliceReducer, i.e slice by slice  thats the current(state)
//inside HYDRATE or anywhere in redux tool
//cos it uses immer u can just mutate directly without return value or state I THINK
