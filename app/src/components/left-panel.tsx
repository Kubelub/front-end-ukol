import styled from "@emotion/styled";
import { useContext, useRef, useState, useEffect } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { GlobalContext, Languague, ShoppingListType, User, getLabelFromLanguage, getTextAfterLanguage } from "../utils/contexts";
import Button, { ButtonType } from "./button";
import { ModalAddShoppingList } from "./left-panel-actions";
import LeftPanelLink from "./left-panel-link";
import useSWR, { mutate } from "swr";
import ErrorPage from "../pages/error-page";
import { css } from "@emotion/react";

const LeftPanel = () => {
    const { showContextMenu, activeUserToken, setActiveUserToken, showArchived, setShowArchived, activeLanguage, setActiveLanguage } = useContext(GlobalContext);
    const { data: shoppingLists, error: shoppingListsError, mutate } = useSWR<ShoppingListType[]>("shopping-list");
    const { data: users, error: usersError } = useSWR<User[]>("user");

    const [_, setLocation] = useLocation();
    const [homeActive] = useRoute("");

    const [modalAddShoppingList, setModalAddShoppingList] = useState(false);

    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    const [darkModeActive, setDarkModeActive] = useState(false);

    const userRef = useRef(null);
    const buttonHref = useRef(null);  

    useEffect(() => {mutate()}, [activeUserToken]);

    useEffect(() => {
        if (darkModeActive) {
            document.body.classList.add("dark-mode");
            return;
        } 
        document.body.classList.remove("dark-mode");
    }, [darkModeActive]);

    if (shoppingListsError || usersError) return <ErrorPage />;

    if (!shoppingLists || !users) return <>{getTextAfterLanguage("Náčítání...", "Loading...", activeLanguage)}...</>;

    return (
        <>
            {modalAddShoppingList &&
                <ModalAddShoppingList hide={async (refetch: boolean) => {
                    if (refetch) await mutate();
                    setModalAddShoppingList(false);
                }} />
            }
            <MobileHeader className="primary-background hide-on-desktop">
                <Link href="/">
                    <Button buttonType={ButtonType.SECONDARY}>
                        <p className="white-text">
                            <i className="fa fa-cart-shopping" />
                            {getTextAfterLanguage("Domů", "Home", activeLanguage)}
                        </p>
                    </Button>
                </Link>
                <Button className="white-text" buttonType={ButtonType.SECONDARY} onClick={() => setMobileMenuOpened(p => !p)}>
                    {getTextAfterLanguage(mobileMenuOpened ? "Zavřít menu" : "Menu", mobileMenuOpened ? "Close menu" : "Menu", activeLanguage)}
                </Button>
            </MobileHeader>

            <Wrapper className="tertiary-background" show={mobileMenuOpened}>
                <UserDiv className="hover-active" onClick={() =>
                    showContextMenu(
                        users.map(user => ({
                            label: user.name,
                            action: () => {
                                setActiveUserToken(user.token);
                                setLocation("/");
                            }
                        })),
                        userRef.current,
                    )
                }>
                    <p className="white-text" ref={userRef}>
                        {users.filter(user => user.token == activeUserToken)[0].name}
                    </p>
                </UserDiv>
                <Link href="/">
                    <Home className={homeActive ? "isActive blue-background" : ""}>
                        <i className="fa fa-home" />
                        <p className="white-text">{getTextAfterLanguage("Domů", "Home", activeLanguage)}</p>
                    </Home>
                </Link>
                <div>
                    {shoppingLists.filter((shoppingList) => showArchived ? true : !shoppingList.archived).sort((a, b) => {
                        if (a.archived == b.archived) return 0;
                        if (a.archived) return 1;
                        return -1;
                    }).map((shoppingList, i) =>
                        <LeftPanelLink
                            key={i}
                            href={`/${shoppingList.slug}`}
                            label={shoppingList.name}
                            trailing={shoppingList.archived ? <i className="fa fa-box-archive" /> : undefined}
                        />
                    )}
                </div>
                <div>
                    <Button 
                        ref={buttonHref}
                        onClick={() =>
                            showContextMenu(
                                (Object.keys(Languague) as Array<Languague>).map((key) => ({
                                    label: getLabelFromLanguage(key, activeLanguage), 
                                    action: () => setActiveLanguage(key)})),
                                buttonHref.current,
                            )
                        } 
                    >
                        <p className="white-text">
                            {getLabelFromLanguage(activeLanguage, activeLanguage)}
                        </p>
                    </Button>
                    <Button 
                        onClick={() => setDarkModeActive(p => !p)} 
                    >   
                    <p className="white-text">
                        {darkModeActive ? "Light mode" : "Dark mode"}
                    </p>
                    </Button>

                    <Button
                        onClick={() => setShowArchived(!showArchived)} buttonType={showArchived ? ButtonType.SECONDARY : ButtonType.PRIMARY}
                    >
                        {showArchived ? getTextAfterLanguage("Skrýt archivované", "Hide archived", activeLanguage) : getTextAfterLanguage("Zobrazit archivované", "Show archived", activeLanguage)}
                    </Button>

                    <Button buttonType={ButtonType.PRIMARY} onClick={() => setModalAddShoppingList(true)}>
                        <>
                            {getTextAfterLanguage("Přidat nový nákupní seznam", "Add new shopping list", activeLanguage)}
                            <i className="fa fa-plus" />
                        </>
                    </Button>
                </div>
            </Wrapper>
        </>
    );
}

const MobileHeader = styled("header")`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    padding: 0px 10px;
    height: 55px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 4;
    border-bottom: 1px solid ${p => p.theme.inverse.content.primary};

    > button > p > i {
        margin-right: 5px;
    }
`;

const Wrapper = styled("header")<{show: boolean}>`
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: flex-start;

    @media screen and (max-width: ${p => p.theme.breakPoints.mobile}px) {
        transform: translateY(-100%);
        width: 100%;
        min-height: calc(100vh - 55px);
        max-height: calc(100vh - 55px);
        transition: transform 0.5s;
        ${p => p.show && css`
            transform: translateY(55px);
        `}
    }

    > div:nth-of-type(3) {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid ${p => p.theme.background.secondary};
    }

    > div:last-of-type {
        display: flex;
        padding: 20px 40px;
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

const UserDiv = styled("div")`
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
    }

    > p {
        padding: 20px 0px;
        margin-left: 10px;
    }
`;

export default LeftPanel;