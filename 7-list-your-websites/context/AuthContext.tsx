import { createContext, ReactNode, useContext, useState } from "react";
import { Auth } from "firebase/auth";

interface Props {
    children: ReactNode;
}

interface Types {
    setUser: React.Dispatch<React.SetStateAction<Auth | null>>;
    user: Auth | null;
}

export const AuthContext = createContext<Types>({
    setUser: () => {},
    user: null,
});

function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<Auth | null>(null);

    const values = {
        setUser,
        user,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}

export default AuthContextProvider;

export function useAuth() {
    const AuthCtx = useContext(AuthContext);

    if (AuthCtx === undefined)
        throw new Error("Context is used out of scope of the component.");

    return AuthCtx;
}
