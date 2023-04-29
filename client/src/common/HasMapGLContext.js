import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const HasMapGLContext = createContext(null);

export function useHasMapGL() {
  return useContext(HasMapGLContext);
}

export function HasMapGLProvider({ children }) {
  const [hasMapGL, setHasMapGL] = useState(false);
  const contextValue = useMemo(
    () => ({ hasMapGL, setHasMapGL }),
    [hasMapGL, setHasMapGL]
  );

  return (
    <HasMapGLContext.Provider value={contextValue}>
      {children}
    </HasMapGLContext.Provider>
  );
}

HasMapGLProvider.propTypes = {
  children: PropTypes.node,
};

HasMapGLProvider.defaultProps = {
  children: null,
};
