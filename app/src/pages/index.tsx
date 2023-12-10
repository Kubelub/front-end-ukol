import styled from "@emotion/styled";
import { useContext } from "react";
import HomeLink from "../components/home-link";
import { GlobalContext, ShoppingListType, getTextAfterLanguage } from "../utils/contexts";
import ErrorPage from "./error-page";
import useSWR from "swr";

const HomePage = () => {
    const { setShowArchived, activeLanguage } = useContext(GlobalContext);

    const { data, error } = useSWR<ShoppingListType[]>("shopping-list");

    if (error) return <ErrorPage/>;

    if (!data) return <>{getTextAfterLanguage("Náčítání...", "Loading...", activeLanguage)}</>;

    return (
        <Wrapper>
            <Label>
                {getTextAfterLanguage("Přehled všech nákupních seznamů", "All Shopping lists", activeLanguage)}
            </Label>
            <div>
                {data.sort((a, b) => {
                                    if(a.archived == b.archived) return 0;
                                    if (a.archived) return 1;
                                    return -1;
                                }).map((shoppingList, i) =>
                    <HomeLink 
                        onClick={shoppingList.archived ? () => setShowArchived(true) : undefined}
                        key={i}
                        href={`/${shoppingList.slug}`}
                        label={shoppingList.name}
                        trailing={shoppingList.archived ?  <i className="fa fa-box-archive" /> : undefined}
                    />
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled("div")`
    display: flex;
    flex-direction: column;

    > div {
        display: flex;

        gap: 15px;

        @media only screen and (max-width: ${p => p.theme.breakPoints.mobile}px) {
            flex-direction: column;
        }
    }
`;


const Label = styled("h2")`
    ${p => p.theme.fontStyles.h2};
    margin-bottom: 60px;
`;

export default HomePage;