import styled from "@emotion/styled";
import { FC } from "react";
import CheckBox from "./checkbox";
import Button from "./button";
import { ShoppingItemType } from "../pages/shopping-list";

interface ShoppingItemProps extends ShoppingItemType {
    children: string
    onDoneToogle: () => void
    onDelete: () => void
}

const ShoppingItem: FC<ShoppingItemProps> = ({children, done, count, onDoneToogle, onDelete}) => (
    <Wrapper className={done ? "done primary-background" : "primary-background" }>
        <div>
            <CheckBox
                checked={done}
                onClick={onDoneToogle}
            />

            <p>
                {count}
            </p>
            <p>
                {children}
            </p>
        </div>

        <Button onClick={onDelete}>
            <i className="fa fa-xmark" />
        </Button>
    </Wrapper>
);

const Wrapper = styled("div")`
    padding: 20px 20px 20px 40px;
    width: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${p => p.theme.background.primary};
    border: 2px solid ${p => p.theme.inverse.content.primary};

    > div:first-of-type {
        display: flex;
        align-items: center;
        > p {
            margin-left: 40px;
        }
    }

`;

export default ShoppingItem;