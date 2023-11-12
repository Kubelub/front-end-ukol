import styled from "@emotion/styled";
import { useState } from "react";
import { Route, Router, Switch } from "wouter";
import { ContextMenu, ContextMenuItem, ContextMenuRenderer, CursorPosition } from "./components/context-menu";
import LeftPanel from "./components/left-panel";
import Home from "./pages/index";
import ShoppingList from "./pages/shopping-list";
import { GlobalContext, ShoppingListType, UserType } from "./utils/contexts";

function App() {
  const [showArchived, setShowArchived] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [activeUser, setActiveUser] = useState<UserType>(UserType.OWNER);
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([
    {label: "Pondělní večeře", href: "pondelni-vecere", archived: false},
    {label: "Páteční oslava", href: "patecni-oslava", archived: false},
    {label: "Sobotní fotbalový zápas", href: "sobotni-fotbalovy-zapas", archived: true},
  ]);

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
        value={{shoppingLists, showArchived, setShowArchived, setShoppingLists, activeUser, setActiveUser, contextMenu, setContextMenu, showContextMenu, hideContextMenu}}
      >
        <ContextMenuRenderer/>
        <Router>
            <Page>
                <LeftPanel/>
                <div>
                  <Switch>
                    <Route path="/:shoppingListName" component={ShoppingList}/>
                    <Route component={Home} />
                  </Switch>
                </div>
            </Page>
        </Router>
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
