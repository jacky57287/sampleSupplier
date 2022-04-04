import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  ApolloLink
} from "@apollo/client";
import { createHttpLink } from '@apollo/client';
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link';
import resellers from '../content/resellers.json'

const endpoint1 = new HttpLink({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
})
const endpoint2 = new HttpLink({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
})

// const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   cache: new InMemoryCache()
// });

// const client = new ApolloClient({
//   link: ApolloLink.split(
//       operation => operation.getContext().clientName === 'endpoint1',
//       endpoint1,
//       endpoint2
//   ),
//   cache: new InMemoryCache()
// })
// new MultiAPILink({




  const client = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
        endpoints: resellers,
        createHttpLink: () => createHttpLink(),
      }),
  ]),
  cache: new InMemoryCache()
 })


//  const client = new ApolloClient({
//   link: ApolloLink.from([
//     new MultiAPILink({
//         endpoints: {
//             store1: 'https://48p1r2roz4.sse.codesandbox.io',
//             projects: 'https://projects.api'
//         },
//         createHttpLink: () => createHttpLink(),
//       }),
//   ]),
//   cache: new InMemoryCache()
//  })

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
