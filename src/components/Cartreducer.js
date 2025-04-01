// import React,{createContext,useContext,useReducer} from 'react';

// const cartStateContext=createContext();
// const cartDispatchContext=createContext();

// const reducer=(state,action)=>{
//      switch(action.type){
//         case "Add":
//            return [...state, { name: action.name, price: action.price, size: action.size, quantity: action.quantity }];
//         default:
//            return state;   

//      }
// }

// export const CartProvider=(({children})=>{
//     const [state,dispatch]=useReducer(reducer,[]);
//     return (
//        <cartDispatchContext.Provider value={dispatch}>
//         <cartStateContext.Provider value={state}>
//             {children}
//         </cartStateContext.Provider>
//        </cartDispatchContext.Provider>
        
//     )
// })
// export const useStateCart = () => useContext(cartStateContext);
// export const useDispatchCart = () => useContext(cartDispatchContext);

import React, { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "Add":
//       return [...state, { id: action.id, name: action.name, price: action.price, size: action.size, quantity: action.quantity }];
//     default:
//       return state;
//   }
// };
const reducer = (state, action) => {
    switch (action.type) {
      case "Add":
        return [...state, { id: action.id, name: action.name, price: action.price, size: action.size, quantity: action.quantity }];
      case "Remove":
        return state.filter((_, index) => index !== action.index);
      case "ClearCart":
        return [];
      default:
        return state;
    }
  };
  

export const CartProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>{children}</cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useStateCart = () => useContext(cartStateContext); 
export const useDispatchCart = () => useContext(cartDispatchContext);