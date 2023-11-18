import styled from "@emotion/styled";
import { useState } from "react";
import { SWRConfig } from "swr";
import { Route, Router, Switch } from "wouter";
import { ContextMenu, ContextMenuItem, ContextMenuRenderer, CursorPosition } from "./components/context-menu";
import LeftPanel from "./components/left-panel";
import { getData } from "./network";
import Home from "./pages/index";
import ShoppingList from "./pages/shopping-list";
import { GlobalContext } from "./utils/contexts";

function App() {
  const [showArchived, setShowArchived] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [activeUserToken, setActiveUserToken] = useState("$2a$12$erYefxNdI/Cu1lVRV6za0.KdWVwgoqNZ79grqSkI6rxO9T5BtiNkC");

  function showContextMenu(items: ContextMenuItem[], snapTo?: HTMLElement, coordinates?: CursorPosition, activeItem?: number) {
    setTimeout(() => {
      setContextMenu(null);
      setContextMenu({ items, snapTo, coordinates, activeItem });
    }, 0);
  }

  function hideContextMenu() {
    setContextMenu(null);
  }

  return (
    <>
      <GlobalContext.Provider
        value={{showArchived, setShowArchived, activeUserToken, setActiveUserToken, contextMenu, setContextMenu, showContextMenu, hideContextMenu}}
      >
        <ContextMenuRenderer/>
        <SWRConfig value={{fetcher: (url) => getData(url, activeUserToken)}}>
          <Router>
              <Page>
                  <LeftPanel/>
                  <div>
                    <Switch>
                      <Route path="/:shoppingListSlug" component={ShoppingList}/>
                      <Route component={Home} />
                    </Switch>
                  </div>
              </Page>
          </Router>
        </SWRConfig>
      </GlobalContext.Provider>
    </>
  );
}

const Page = styled("div")`
  display: flex;

  > div:last-of-type {
    width: 100%;
    margin-left: 350px;
    padding: 40px 40px 160px 40px;  
  }
`;

export default App;
