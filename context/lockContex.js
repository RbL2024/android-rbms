import React, { createContext, useContext, useState } from 'react';

const LockContext = createContext();

export const LockProvider = ({ children }) => {
    const [isLock, setIsLock] = useState(true);
    return (
        <LockContext.Provider value={{ isLock, setIsLock }}>
            {children}
        </LockContext.Provider>
    );
};

export const useLock = () => useContext(LockContext);