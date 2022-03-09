import { useEffect } from 'react';
import { AuthenticatedTemplate, useMsalAuthentication, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionType, InteractionRequiredAuthError, BrowserAuthError } from '@azure/msal-browser';
import { NavigationBar } from "./NavigationBar";
import { loginRequest } from "../authConfig";

export const PageLayout = (props) => {
    
    const { login, error } = useMsalAuthentication(InteractionType.Silent, loginRequest);
     useEffect(() => {
        localStorage.removeItem('currentClaim');
        if(error && error instanceof InteractionRequiredAuthError){
            login(InteractionType.Popup, loginRequest)
                .catch((err) => {
                     if(err instanceof BrowserAuthError && 
                     (err.errorCode === "popup_window_error" || err.errorCode === "empty_window_error")){
                        login(InteractionType.Redirect, loginRequest)
                    }
                })
        }
        
    }, [error]);

    

    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not. 
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will 
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */

    return (
        <>
            <NavigationBar />
            <br />
            <h5><center>Azure AD Step-up Authentication Demo</center></h5>
            <br />
            {props.children}
            <br />
            <AuthenticatedTemplate>
                <footer>
                    <center>How did we do? 
                        <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUMlRHSkc5U1NLUkxFNEtVN0dEOTFNQkdTWiQlQCN0PWcu" target="_blank"> Share your experience!</a>
                    </center>
                </footer>
            </AuthenticatedTemplate>
        </>
    );
};