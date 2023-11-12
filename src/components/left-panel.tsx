import styled from "@emotion/styled";
import { useContext, useRef, useState } from "react";
import {Link, useRoute} from "wouter";
import { GlobalContext, UserType, userTypeToLabel } from "../utils/contexts";
import Button, { ButtonType } from "./button";
import LeftPanelLink from "./left-panel-link";
import {ModalAddShoppingList} from "./left-panel-actions";

const LeftPanel = () => {

    const {showArchived, setShowArchived, showContextMenu, activeUser, setActiveUser, shoppingLists} = useContext(GlobalContext);

    const userRef = useRef(null);

    
    const [homeActive] = useRoute("");

    const [modalAddShoppingList, setModalAddShoppingList] = useState(false);

    return (
        <>
            {modalAddShoppingList && 
                <ModalAddShoppingList hide={() => setModalAddShoppingList(false)}/>
            }
             <Wrapper>
                <User className="hover-active" onClick={() =>
                    showContextMenu(
                        [
                            {label: userTypeToLabel(UserType.OWNER), action: () => setActiveUser(UserType.OWNER), trailing: activeUser == UserType.OWNER ? <i style={{"marginLeft": "10px"}} className="fa fa-check" />  : undefined},
                            {label: userTypeToLabel(UserType.USER), action: () => setActiveUser(UserType.USER), trailing: activeUser == UserType.USER ? <i style={{"marginLeft": "10px"}} className="fa fa-check" />  : undefined},
                        ], userRef.current!
                    )
                }>
                    <p ref={userRef}>
                        {userTypeToLabel(activeUser)}
                    </p>
                </User>
                <Link href="/">
                    <Home className={homeActive ? "isActive" : "" }>
                        <i className="fa fa-home" />
                        <p>Domů</p>
                    </Home>
                </Link>
                <div>
                    {shoppingLists.filter((shoppingList) => showArchived ? true : !shoppingList.archived).sort((a, b) => {
                                    if(a.archived == b.archived) return 0;
                                    if (a.archived) return 1;
                                    return -1;
                                }).map((shoppingList, i) =>
                        <LeftPanelLink 
                            key={i}
                            href={`/${shoppingList.href}`}
                            label={shoppingList.label}
                            trailing={shoppingList.archived ?  <i className="fa fa-box-archive" /> : undefined}
                        />
                    )}
                </div>
                <div>
                    <Button 
                        onClick={() => setShowArchived(!showArchived)} buttonType={showArchived ? ButtonType.SECONDARY : ButtonType.PRIMARY} 
                    >
                        {showArchived ? "Skrýt archivované" : "Zobrazit archivované"}
                    </Button>

                    <Button buttonType={ButtonType.PRIMARY} onClick={() => setModalAddShoppingList(true)}>
                        <>
                            Přidat nákupní seznam
                            <i className="fa fa-plus" />
                        </>
                    </Button>
                </div>
            </Wrapper>
        </>
    );
}

const Wrapper = styled("header")`
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: flex-start;

    > div:nth-of-type(3) {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid ${p => p.theme.background.secondary};
    }

    > div:last-of-type {
        display: flex;
        padding: 0px 40px;
        margin-top: 20px;
        align-items: flex-start;
        flex-direction: column;
        gap: 20px;
        justify-content: flex-start;

        > button > i {
            margin-left: 10px;
        }
    }

    width: 350px;
    max-height: 100vh;
    min-height: 100vh;
    background-color: ${p => p.theme.background.primary};
    box-shadow: 0px 0.8px 0.9px ${p => p.theme.background.secondary},0px 1.6px 3.6px ${p => p.theme.background.secondary};
`;

const User = styled("div")`
    display: flex;
    align-items: center; 
    cursor: pointer;
    width: 100%;
    border-bottom: 1px solid ${p => p.theme.background.secondary};

    > p {
        padding: 20px 0px;
        padding-left: 18px;
        margin-left: 18px;
    }
`;

const Home = styled("div")`
    display: flex;
    align-items: center; 
    cursor: pointer;
    width: 100%;
    border-bottom: 1px solid ${p => p.theme.background.secondary};
    padding-left: 40px;

    &.isActive {
        border-left: 3px solid ${p => p.theme.primitives.blue};
        padding-left: 37px;
        background-color: ${p => p.theme.primitives.blueHover};
    }

    > p {
        padding: 20px 0px;
        margin-left: 10px;
    }
`;

export default LeftPanel;