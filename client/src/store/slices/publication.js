import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { actionAuthenticateUser } from "./user";

import io from "socket.io-client";
let socket;
socket = io(process.env.REACT_APP_BACKEND_URL);

export const publicationSlice = createSlice({
  name: "publication",
  initialState: {
    allPublications: [],
    filterPublications: [],
    myPublications: [],
    details: {},
    search: "",
    loading: true,
    sort: "",
    currentPage: 1,
    filterRedux: {
      category: "",
      subCategory: "",
      state: "",
      price: { min: "", max: "" },
      search: "",
    },
  },
  reducers: {
    allPublications: (state, action) => {
      state.allPublications = action.payload;
      state.filterPublications = action.payload;
    },
    filterPublications: (state, action) => {
      let temp;
      if (state.sort === "relevance") {
        for (let j = 0; j < action.payload.length - 1; j++) {
          for (let i = j + 1; i < action.payload.length; i++) {
            if (
              action.payload[j].quantitySold < action.payload[i].quantitySold
            ) {
              temp = action.payload[j];
              action.payload[j] = action.payload[i];
              action.payload[i] = temp;
            }
          }
        }
      } else if (state.sort === "higher") {
        for (let j = 0; j < action.payload.length - 1; j++) {
          for (let i = j + 1; i < action.payload.length; i++) {
            if (action.payload[j].price < action.payload[i].price) {
              temp = action.payload[j];
              action.payload[j] = action.payload[i];
              action.payload[i] = temp;
            }
          }
        }
      } else if (state.sort === "lower") {
        for (let j = 0; j < action.payload.length - 1; j++) {
          for (let i = j + 1; i < action.payload.length; i++) {
            if (action.payload[j].price > action.payload[i].price) {
              temp = action.payload[j];
              action.payload[j] = action.payload[i];
              action.payload[i] = temp;
            }
          }
        }
      }
      state.filterPublications = action.payload;
    },
    myPublications: (state, action) => {
      state.myPublications = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    clearDetails: (state) => {
      state.details = {};
    },
    logout: (state) => {
      state.myPublications = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filterRedux = action.payload;
    },
    clearFilter: (state, action) => {
      state.filterRedux = {
        category: "",
        subCategory: "",
        state: "",
        price: { min: "", max: "" },
        search: "",
      };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  allPublications,
  filterPublications,
  myPublications,
  setDetails,
  clearDetails,
  logout,
  setLoading,
  setSearch,
  clearSearch,
  setCurrentPage,
  setFilter,
  clearFilter,
  setSort,
} = publicationSlice.actions;

export default publicationSlice.reducer;

export const actionSetLoading = (value) => {
  return async function (dispatch) {
    dispatch(setLoading(value));
  };
};

export const actionGetAllPublications = () => {
  return async function (dispatch) {
    dispatch(actionSetLoading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(allPublications(data));
      dispatch(actionSetLoading(false));
    } catch (e) {
      console.log(e);
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionSetSearch = (data) => {
  return async function (dispatch) {
    dispatch(setSearch(data.toLowerCase()));
    dispatch(
      actionSetFilter({
        category: "",
        subCategory: "",
        state: "",
        price: { min: "", max: "" },
        search: data.toLowerCase(),
      })
    );
  };
};

export const actionClearSearch = () => {
  return async function (dispatch) {
    dispatch(clearSearch());
  };
};

// export const actionFilterPublications = (filters) => {
//   console.log("a");
//   return async function (dispatch) {
//     dispatch(actionSetLoading(true));
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications`;
//     try {
//       const { data } = await axios.get(URL, config);
//       let arrayFilter = data;
//       if (filters.category !== "")
//         arrayFilter = arrayFilter.filter(
//           (p) => p.category === filters.category
//         );
//       if (filters.subCategory !== "")
//         arrayFilter = arrayFilter.filter(
//           (p) => p.subCategory === filters.subCategory
//         );
//       if (filters.state !== "")
//         arrayFilter = arrayFilter.filter((p) => p.state === filters.state);
//       if (filters.price.min !== "")
//         arrayFilter = arrayFilter.filter((p) => p.price >= filters.price.min);
//       if (filters.price.max !== "")
//         arrayFilter = arrayFilter.filter((p) => p.price <= filters.price.max);
//       if (filters.search !== "") {
//         arrayFilter = arrayFilter.filter((p) =>
//           p.title.toLowerCase().split(" ").includes(filters.search)
//         );
//       }
//       dispatch(filterPublications(arrayFilter));
//       dispatch(actionSetFilter(filters));
//       dispatch(actionSetLoading(false));
//     } catch (e) {
//       console.log(e);
//       // throw { msg: e.response.data.msg };
//     }
//   };
// };

export const actionGetMyPublications = (token, id) => {
  return async function (dispatch) {
    dispatch(actionSetLoading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications/myPublications/${id}`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(myPublications(data));
      dispatch(actionSetLoading(false));
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionCreatePublication = (values, token, id) => {
  const body = {
    title: values.title,
    category: values.category,
    description: values.description,
    image: values.file,
    price: Number(values.price),
    state: values.state,
    stock: Number(values.stock),
    subCategory: values.subCategory,
  };
  const form = new FormData();
  for (let key in body) {
    form.append(key, body[key]);
  }
  return async function (dispatch) {
    dispatch(actionSetLoading(true));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications`;
    try {
      await axios.post(URL, form, config);
      dispatch(actionGetMyPublications(token, id));
      dispatch(actionSetLoading(false));
      socket.emit("renderHome");
      return { msg: "Publication created" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionDeletePublication = (token, user_id, product_id) => {
  return async function (dispatch) {
    dispatch(actionSetLoading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications/delete/${product_id}`;
    try {
      await axios.delete(URL, config);
      dispatch(actionGetMyPublications(token, user_id));
      dispatch(actionSetLoading(false));
      socket.emit("renderHome");
      return { msg: "Publication deleted" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionUpdatePublication = (values, token, id) => {
  const body = {
    title: values.title,
    price: values.price,
    description: values.description,
    state: values.state,
    stock: values.stock,
    category: values.category,
    subCategory: values.subCategory,
    file: values.file,
  };

  const form = new FormData();
  for (let key in body) {
    form.append(key, body[key]);
  }
  return async function (dispatch) {
    dispatch(actionSetLoading(true));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications/update/${values.id}`;
    try {
      await axios.put(URL, body, config);
      dispatch(actionGetMyPublications(token, id));
      dispatch(actionSetLoading(false));
      return { msg: "Publication updated" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionGetDetails = (id) => {
  return async function (dispatch) {
    dispatch(actionSetLoading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications/details/${id}`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(setDetails(data));
      dispatch(actionSetLoading(false));
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionClearDetails = () => {
  return async function (dispatch) {
    dispatch(clearDetails());
  };
};

export const actionClearMyPublications = () => {
  return async function (dispatch) {
    dispatch(logout());
  };
};

export const actionBuy = (token, id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications/buy/${id}`;
    try {
      await axios.get(URL, config);
      dispatch(actionGetAllPublications());
      dispatch(actionAuthenticateUser(token));
      socket.emit("renderHome");
      socket.emit("updatePublications");
      socket.emit("updateTransaction");

      return { msg: "purchased product" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionSetCurrentPage = (value) => {
  return async function (dispatch) {
    dispatch(setCurrentPage(value));
  };
};

// export const actionSetFilter = (values) => {
//   return async function (dispatch) {
//     dispatch(setFilter(values));
//   };
// };

export const actionSetFilter = (filters, currentPage) => {
  return async function (dispatch) {
    dispatch(actionSetLoading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/publications`;
    try {
      const { data } = await axios.get(URL, config);
      let arrayFilter = data;
      if (filters.category !== "")
        arrayFilter = arrayFilter.filter(
          (p) => p.category === filters.category
        );
      if (filters.subCategory !== "")
        arrayFilter = arrayFilter.filter(
          (p) => p.subCategory === filters.subCategory
        );
      if (filters.state !== "")
        arrayFilter = arrayFilter.filter((p) => p.state === filters.state);
      if (!isNaN(filters.price.min) && filters.price.min !== "")
        arrayFilter = arrayFilter.filter(
          (p) => Number(p.price) >= Number(filters.price.min)
        );
      if (!isNaN(filters.price.max) && filters.price.max !== "")
        arrayFilter = arrayFilter.filter(
          (p) => Number(p.price) <= Number(filters.price.max)
        );
      if (filters.search !== "") {
        arrayFilter = arrayFilter.filter((p) =>
          p.title.toLowerCase().split(" ").includes(filters.search)
        );
      }

      dispatch(setCurrentPage(currentPage ? currentPage : 1));
      dispatch(filterPublications(arrayFilter));
      dispatch(setFilter(filters));
      dispatch(actionSetLoading(false));
    } catch (e) {
      console.log(e);
      // throw { msg: e.response.data.msg };
    }
  };
};

export const actionClearFilter = () => {
  return async function (dispatch) {
    dispatch(clearFilter());
    dispatch(setCurrentPage(1));
    dispatch(actionGetAllPublications());
  };
};

export const actionSetSort = (sort) => {
  return async function (dispatch) {
    dispatch(setSort(sort));
  };
};
