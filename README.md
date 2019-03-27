# Hooks and React's useState

useState provides a hook with a value and a function to set the value, and we want to also have two functions to handle onChange and onSubmit.

Let's define this in `src/hooks/use-comments.js`:

    import { useState } from "react";

    const useComments = () => {
        const [comment, setComment] = useState("");
        const [comments, setComments] = useState([]);

        const onChange = (event) => {
            setComment(event.target.value)
        }

        const onSubmit = (event) => {
            event.preventDefault();

            setComments([...comments, comment]);
            setComment("");
        }

        return {
            comment,
            comments,
            onChange,
            onSubmit
        }
    }

    export default useComments

We can then use this hook directly in the function component:

    import useComments from "../hooks/use-comments"

    const Comments = () => {
      const { comment, comments, onChange, onSubmit } = useComments()

    }

# React's createContext and provide Context.Provider with an Object value

But we want to use this in the Context, so it's shared between different components.

Let's first create a context, create a file in `src/context/comments-context.js`:

    import { createContext } from "react";

    export default createContext();

And create an App Container component as a provider that provides the values using this hook:

    import React from "react";
    import CommentsContext from "../context/comments-context";
    import useComments from "../hooks/use-comments"

    const AppContainer = ({ children }) => {
        const { comment, comments, onChange, onSubmit } = useComments();

        return (
            <CommentsContext.provider value={{ comment, comments, onChange, onSubmit}}>
                {children}
            </CommentsContext.provider>
        )
    }

    export default AppContainer;

## Gatsby Browser to wrap root element with App Container

We want to wrap the root element of every Gatsby page with this new App Container, the way we do this is through the wrapRootElement function:

Modify `gatsby-browswer.js`:
  
 import React from "react";
import AppContainer from "./src/components/app-container.js";
  
 export const wrapRootElement = ({ element }) => (
<AppContainer>{element}</AppContainer>
)

## React's useContext

Now that the context is present on all elements, we can call `useContext` to fetch values from the provider:

    import React, { useContext } from "react";
    import CommentsContext from "../hooks/comments-context.js";

    const Comments = () => {
        const { comment, comments, onChange, onSubmit } = useContext(CommentsContext);

    }

## Gatsby's useStaticQuery

We want to refactor the `SEO.js` with React Hooks, create a new file called `src/hooks/use-site-metadata.js`:

    import { graphql, useStaticQuery } from "gatsby";

    const useSiteMetadata = () => {
        const { site } = useStaticQuery(
            graphql`
              query {
                site {
                  siteMetadata {
                    title
                    description
                    author
                  }
                }
              }
            `
        );

        return site.siteMetadata;
    };

    export default useSiteMetadata;

Then, in `SEO.js` and `layout.js` components, we can remove the render props and get the metadata from this hook:

    import useSiteMetadata from "../hooks/use-site-metadata";

    function SEO({ description, lang, meta, keywords, title }) {
        const metaData = useSiteMetadata();

        const metaDescription = description || metaData.description;

        ...
    }

the same applies for `layout.js`.

That's it for now. Check out [his video](https://www.youtube.com/watch?v=asrdFuAxPaU&list=PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx&index=8)
