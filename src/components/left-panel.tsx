import styled from "@emotion/styled";
import {useContext, useRef} from "react";
import {GlobalContext, UserType, userTypeToLabel} from "../utils/contexts";
import LeftPanelLink from "./left-panel-link";

const LeftPanel = () => {

    const {showContextMenu, activeUser, setActiveUser, shoppingLists} = useContext(GlobalContext);

    const userRef = useRef(null);

    return (
        <Wrapper>
            <User className="hover-active" onClick={() =>
                showContextMenu(
                    [
                        {label: userTypeToLabel(UserType.OWNER), action: () => setActiveUser(UserType.OWNER)},
                        {label: userTypeToLabel(UserType.USER), action: () => setActiveUser(UserType.USER)},
                    ], userRef.current!
                )
            }>
                <p ref={userRef}>
                    {userTypeToLabel(activeUser)}
                </p>
            </User>
            <div>
                {shoppingLists.map((shoppingList, i) =>
                    <LeftPanelLink 
                        key={i}
                        href={`/${shoppingList.href}`}
                        label={shoppingList.label}
                    />
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled("header")`
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: flex-start;

    > div:last-of-type {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
    }

    width: 350px;
    max-height: 100vh;
    min-height: 100vh;
    background-color: ${p => p.theme.background.primary};
    box-shadow: 0px 0.8px 0.9px ${p => p.theme.background.secondary},0px 1.6px 3.6px ${p => p.theme.background.secondary};
`;

const User = styled("div")`
    display: flex;
    width: 100px;
    align-items: center; 
    cursor: pointer;
    width: 100%;
    margin-bottom: 20px;

    > p {
        padding: 20px 0px;
        padding-left: 18px;
        margin-left: 18px;
    }
`;

export default LeftPanel;