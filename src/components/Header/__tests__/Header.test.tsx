import React from "react";
import { render, waitFor, screen } from "test-utils";
import { MockedProvider } from '@apollo/client/testing';


import Header from "../";

import { CURRENT_USER } from "../controllers/currentUser.query";

describe("<Header />", () => {

    test("it should render without error", async () => {
        const currentUserMock = {
            request: {
                query: CURRENT_USER
            },
            result: {
                data: {
                    currentUser: {
                        id: "currentUserId",
                        name: "Jack Sparrow",
                        avatarUrl: "currentUserAvatarUrl"
                    }
                }
            }
        };
        const { asFragment } = render(
            <MockedProvider mocks={[currentUserMock]} addTypename={false}>
                <Header className="classNameTest" />
            </MockedProvider>
        );

        expect(screen.getByTestId("nyan-cat-animation")).toBeInTheDocument();
        expect(screen.getByTestId("select-project-button")).toBeInTheDocument();
        expect(screen.getByTestId("toggle-mode-button")).toBeInTheDocument();

        expect(screen.getByTestId("user-avatar-circular-progress")).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot("Header loading");

        await waitFor(() => screen.getByTestId("user-avatar"))

        expect(screen.getByAltText("avatar-user")).toHaveAttribute("src", "currentUserAvatarUrl");

        expect(asFragment()).toMatchSnapshot("Header loaded without error");
    })
})