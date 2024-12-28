import { createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "../lib/useAppwrite";

import { getCurrentUser } from "../lib/appwrite";


interface User {
    $id: string;
    email: string;
    name: string;
    avatar: () => string;
}


interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams: Record<string, string | number>) => Promise<void>;
}



const GlobalContext = createContext<GlobalContextType | undefined>(
    undefined
);


export const GlobalProvider = ({children}: {children: ReactNode}) => {

    const {
        data: user = null,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,
    });

    const isLoggedIn = !!user;

    // console.log(JSON.stringify(user, null, 2));
     
    return (
        <GlobalContext.Provider  value={{
            isLoggedIn,
            user,
            loading,
            refetch,
        }}>
            {children}
        </GlobalContext.Provider>
    )

};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context)
      throw new Error("useGlobalContext must be used within a GlobalProvider");
  
    return context;
};
  

export default GlobalProvider;


// import { Client, Account, ID } from 'react-native-appwrite';

// const client = new Client()

//     .setProject('676d472e003d2768559a')

//     .setPlatform('com.jsm.restate');