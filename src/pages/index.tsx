import styled from "@emotion/styled";
import { useContext } from "react";
import HomeLink from "../components/home-link";
import { GlobalContext } from "../utils/contexts";

const LeftPanel = () => {

    const {shoppingLists, setShowArchived} = useContext(GlobalContext);

    return (
        <Wrapper>
            <Label>
                Přehled všech nákupních seznamů
            </Label>
            <div>
                {shoppingLists.sort((a, b) => {
                                    if(a.archived == b.archived) return 0;
                                    if (a.archived) return 1;
                                    return -1;
                                }).map((shoppingList, i) =>
                    <HomeLink 
                        onClick={shoppingList.archived ? () => setShowArchived(true) : undefined}
                        key={i}
                        href={`/${shoppingList.href}`}
                        label={shoppingList.label}
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

export default LeftPanel;