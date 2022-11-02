// import Link from '@/components/Link'
// import { PageSEO } from '@/components/SEO'
// import Tag from '@/components/Tag'
// import siteMetadata from '@/data/siteMetadata'
// import { getAllFilesFrontMatter } from '@/lib/mdx'
// import formatDate from '@/lib/utils/formatDate'
// import NewsletterForm from '@/components/NewsletterForm'
// import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client'
// import { setContext } from '@apollo/client/link/context'

// const MAX_DISPLAY = 5

// export async function getStaticProps() {
//   const httpLink = createHttpLink({
//     uri: 'https://api.github.com/graphql',
//   })

//   const authLink = setContext((_, { headers }) => {
//     return {
//       headers: {
//         ...headers,
//         authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
//       },
//     }
//   })

//   const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//   })

//   const posts = await getAllFilesFrontMatter('blog')

//   return { props: { posts } }
// }

// export default function Home({ posts }) {
//   return (
//     <>
//       <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
//       <div className="divide-y divide-gray-200 dark:divide-gray-700">
//         <div className="space-y-2 pt-6 pb-8 md:space-y-5">
//           <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
//             Latest
//           </h1>
//           <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
//             {siteMetadata.description}
//           </p>
//         </div>
//         <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//           {!posts.length && 'No posts found.'}
//           {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
//             const { slug, date, title, summary, tags } = frontMatter
//             return (
//               <li key={slug} className="py-12">
//                 <article>
//                   <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
//                     <dl>
//                       <dt className="sr-only">Published on</dt>
//                       <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
//                         <time dateTime={date}>{formatDate(date)}</time>
//                       </dd>
//                     </dl>
//                     <div className="space-y-5 xl:col-span-3">
//                       <div className="space-y-6">
//                         <div>
//                           <h2 className="text-2xl font-bold leading-8 tracking-tight">
//                             <Link
//                               href={`/blog/${slug}`}
//                               className="text-gray-900 dark:text-gray-100"
//                             >
//                               {title}
//                             </Link>
//                           </h2>
//                           <div className="flex flex-wrap">
//                             {tags.map((tag) => (
//                               <Tag key={tag} text={tag} />
//                             ))}
//                           </div>
//                         </div>
//                         <div className="prose max-w-none text-gray-500 dark:text-gray-400">
//                           {summary}
//                         </div>
//                       </div>
//                       <div className="text-base font-medium leading-6">
//                         <Link
//                           href={`/blog/${slug}`}
//                           className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
//                           aria-label={`Read "${title}"`}
//                         >
//                           Read more &rarr;
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//       {posts.length > MAX_DISPLAY && (
//         <div className="flex justify-end text-base font-medium leading-6">
//           <Link
//             href="/blog"
//             className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
//             aria-label="all posts"
//           >
//             All Posts &rarr;
//           </Link>
//         </div>
//       )}
//       {siteMetadata.newsletter.provider !== '' && (
//         <div className="flex items-center justify-center pt-4">
//           <NewsletterForm />
//         </div>
//       )}
//     </>
//   )
// }
import Head from 'next/head'
import Image from 'next/image'
import { ApolloClient, createHttpLink, InMemoryCache, gql } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import styles from '../styles/Home.module.css'

export default function Home({ pinnedItems }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {pinnedItems.map(item => {
            return (
              <a key={item.id} href={item.url} className={styles.card}>
                <h2>{ item.name }</h2>
                <p>⭐ {item.stargazers.totalCount }</p>
              </a>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      {
        user(login: "w4rf0t") {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            totalCount
            edges {
              node {
                ... on Repository {
                  name
                  id
                  url
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    `
  });

  const { user } = data;
  const pinnedItems = user.pinnedItems.edges.map(edge => edge.node);

  return {
    props: {
      pinnedItems
    }
  }
}