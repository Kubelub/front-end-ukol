import styled from "@emotion/styled";
import { forwardRef, ComponentProps } from "react";
import ProgressSpinner from "./progress-spinner";


export enum ButtonType {
    PRIMARY = "primary-type",
    SECONDARY = "secondary-type",
    TERTIARY = "tertiary-type",
}

interface ButtonProps extends ComponentProps<"button"> {
    children: JSX.Element | string
    buttonType?: ButtonType
    loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, loading, onClick, buttonType, ...props}, ref) => (
    <Wrapper onClick={onClick} ref={ref} className={buttonType ?? "secondary-type"} {...props}>
        {loading ? <ProgressSpinner/> : children}
    </Wrapper>
    )
);

const Wrapper = styled("button")`
    cursor: pointer;
    padding: 7px 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background-color: transparent;
    border-radius: 4px;
    width: fit-content;
    font: ${p => p.theme.fontStyles.b2};

    &.${ButtonType.PRIMARY} {
        background-color: ${p => p.theme.primitives.blue};
        color: ${p => p.theme.inverse.content.primary};
        
        &:hover {
            opacity: 0.8;
        }

        &:active {
            opacity: 0.6;
        }
    }

    &.${ButtonType.SECONDARY} {
        background-color: transparent;
        color: ${p => p.theme.content.primary};

        &:hover {
            background-color: ${p => p.theme.content.tertiary};
            opacity: 0.8;
        }

        &:active {
            background-color: ${p => p.theme.content.secondary};
            opacity: 0.8;
        }
    }

    &.${ButtonType.TERTIARY} {
        background-color: ${p => p.theme.primitives.error};
        color: ${p => p.theme.inverse.content.primary};
        
        &:hover {
            opacity: 0.8;
        }

        &:active {
            opacity: 0.6;
        }
    }
`;

export default Button;