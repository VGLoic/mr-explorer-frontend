import React from "react";
import { render, waitFor, screen, fireEvent } from "test-utils";
import { MockedProvider } from '@apollo/client/testing';
import * as _ from 'lodash';
import debounce from 'lodash/debounce';


import Header from "../";

import { CURRENT_USER } from "../controllers/currentUser.query";
import { PROJECTS } from "../ProjectSelectionDialog/controllers/projects.query";

jest.mock("lodash/debounce");

describe("<Header />", () => {

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

    describe("User query", () => {
        test("it should render with error", async () => {
            const currentUserMock = {
                request: {
                    query: CURRENT_USER
                },
                error: new Error('aw shucks')
            };
            const { asFragment } = render(
                <MockedProvider mocks={[currentUserMock]} addTypename={false}>
                    <Header className="classNameTest" />
                </MockedProvider>
            );
    
            await waitFor(() => screen.getByTestId("header-error"))
    
            expect(asFragment()).toMatchSnapshot("Header error");
        });
    
    
        test("it should render without error", async () => {
            const { asFragment } = render(
                <MockedProvider mocks={[currentUserMock]} addTypename={false}>
                    <Header className="classNameTest" />
                </MockedProvider>
            );
    
            expect(screen.getByTestId("user-avatar-circular-progress")).toBeInTheDocument();
    
            expect(asFragment()).toMatchSnapshot("Header loading");
    
            await waitFor(() => screen.getByTestId("user-avatar"))
    
            expect(screen.getByAltText("avatar-user")).toHaveAttribute("src", "currentUserAvatarUrl");
    
            expect(asFragment()).toMatchSnapshot("Header loaded without error");
        });
    });

    test("Theme toggle", async () => {

        render(
            <MockedProvider mocks={[currentUserMock]} addTypename={false}>
                <Header className="classNameTest" />
            </MockedProvider>
        );

        await waitFor(() => screen.getByTestId("user-avatar"));

        const themeButton = await screen.findByLabelText("Switch to light mode");

        fireEvent.click(themeButton);

        expect(themeButton).toHaveAttribute("aria-label", "Switch to dark mode");
    });

    // WIP
    // describe("Selection of a project", () => {
    //     test("when there is no error, we should be able to select a project", async () => {
    //         const projectsMock = {
    //             request: {
    //                 query: PROJECTS,
    //                 // notifyOnNetworkStatusChange: true,
    //                 variables: { search: 'project' },
    //             },
    //             result:() => {
    //                 console.log("COUCOU")
    //                 return {
    //                     // networkStatus: 4,
    //                     // called: true,
    //                     data: {
    //                         projects: {
    //                             __typename: "project",
    //                             edges: [
    //                                 // {
    //                                 //     cursor: 1,
    //                                 //     node: {
    //                                 //         id: "1",
    //                                 //         name: "First Project",
    //                                 //         desription: "This is my first project",
    //                                 //         pathWithNamespace: "/first/project"
    //                                 //     }
    //                                 // },
    //                                 // {
    //                                 //     cursor: 2,
    //                                 //     node: {
    //                                 //         id: "2",
    //                                 //         name: "Second Project",
    //                                 //         desription: "This is my second project",
    //                                 //         pathWithNamespace: "/second/project"
    //                                 //     }
    //                                 // },
    //                                 // {
    //                                 //     cursor: 3,
    //                                 //     node: {
    //                                 //         id: "3",
    //                                 //         name: "Third Project",
    //                                 //         desription: "This is my third project",
    //                                 //         pathWithNamespace: "/third/project"
    //                                 //     }
    //                                 // },
    //                                 // {
    //                                 //     cursor: 4,
    //                                 //     node: {
    //                                 //         id: "4",
    //                                 //         name: "Fourth Project",
    //                                 //         desription: "This is my fourth project",
    //                                 //         pathWithNamespace: "/first/project"
    //                                 //     }
    //                                 // },
    //                             ],
    //                             pageInfo: {
    //                                 hasNextPage: true,
    //                                 endCursor: 4
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         };

    //         (debounce as any).mockImplementation(jest.fn(
    //             (fn: any) => {
    //                 return fn as (((...args: any[]) => any) & _.Cancelable);
    //             }
    //         ));

    //         const { asFragment } = render(
    //             <MockedProvider mocks={[currentUserMock, projectsMock, projectsMock]} addTypename={true}>
    //                 <Header className="classNameTest" />
    //             </MockedProvider>
    //         );

    //         await waitFor(() => screen.getByTestId("user-avatar"));

    //         fireEvent.click(screen.getByLabelText("Select a project"));

    //         fireEvent.change(await screen.findByLabelText("Project name"), {
    //             target: { value: "project" }
    //         });
    //         expect(screen.getByTestId("research-loading")).toBeInTheDocument();

    //         expect(asFragment()).toMatchSnapshot("Projects search loading");

    //         await waitFor(() => screen.getByLabelText("Choose project First Project, id 1, path /first/project"), { timeout: 500 });

    //         expect(asFragment()).toMatchSnapshot("Projects search success");
    //     })
    // })
});