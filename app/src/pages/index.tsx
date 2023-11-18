import styled from "@emotion/styled";
import { useContext } from "react";
import HomeLink from "../components/home-link";
import { GlobalContext, ShoppingListType } from "../utils/contexts";
import ErrorPage from "./error-page";
import useSWR from "swr";

const HomePage = () => {
    const { setShowArchived } = useContext(GlobalContext);

    const { data, error, mutate } = useSWR<ShoppingListType[]>("shopping-list");

    if (error) return <ErrorPage/>;

    if (!data) return <>Načítání...</>;

    return (
        <Wrapper>
            <Label>
                Přehled všech nákupních seznamů
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
    }
`;


const Label = styled("h2")`
    ${p => p.theme.fontStyles.h2};
    margin-bottom: 60px;
`;

export default HomePage;